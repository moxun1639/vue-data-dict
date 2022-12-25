import Dependency from './Dependency'
import DictMeta from './DictMeta'
import DictData from './DictData'
import merge from './util/merge'

const DEFAULT_DICT_OPTIONS = {
  types: [],
}

/**
 * @classdesc 字典
 * @property {Object} label 标签对象，内部属性名为字典类型名称
 * @property {Array} dict 字段数组，内部属性名为字典类型名称
 * @property {Array.<DictMeta>} _dictMetas 字典元数据数组
 */
export default class Dict {
  constructor() {
    this.label = {}
    this.dict = {}
  }

  init(options) {
    if (options instanceof Array) {
      options = { types: options }
    }
    const opts = merge.recursive({}, DEFAULT_DICT_OPTIONS, options)

    this._dictMetas = []

    const ps = []
    opts.types.forEach(t => {
      ps.push(this.register(t))
    })
    return Promise.all(ps)
  }

  /**
   * 注册字典
   * @param {options} type 字典类型
   */
  register(options) {
    const dictMeta = DictMeta.parse(options)
    this._dictMetas.push(dictMeta)
    const type = dictMeta.type
    Dependency.Vue.set(this.label, type, {})
    Dependency.Vue.set(this.dict, type, [])
    if (dictMeta.lazy) {
      return
    }
    return loadDict(this, dictMeta)
  }

  wait(type) {
    const typeDict = this.dict[type]
    if (!typeDict) {
      return Promise.reject('no such dict: ' + type)
    }
    const loader = typeDict.loader
    if (loader) {
      return loader.then(() => {
        return this.dict[type]
      })
    } else {
      return Promise.resolve(this.dict[type])
    }
  }

  /**
   * 重新加载字典
   * @param {String} type 字典类型
   */
  reload(type) {
    const dictMeta = this._dictMetas.find(e => e.type === type)
    if (dictMeta === undefined) {
      return Promise.reject(`the dict meta of ${type} was not found`)
    }
    return loadDict(this, dictMeta)
  }
}

/**
 * 加载字典
 * @param {Dict} dict 字典
 * @param {DictMeta} dictMeta 字典元数据
 * @returns {Promise}
 */
function loadDict(dict, dictMeta) {
  let dictReq = dictMeta.request(dictMeta)
  if (!(dictReq instanceof Promise)) {
    dictReq = Promise.resolve(dictReq)
  }
  const loader = dictReq.then(response => {
    const type = dictMeta.type
    let dicts = dictMeta.responseConverter(response, dictMeta)
    if (!(dicts instanceof Array)) {
      console.error('the return of responseConverter must be Array.<DictData>')
      dicts = []
    } else if (dicts.filter(d => d instanceof DictData).length !== dicts.length) {
      console.error('the type of elements in dicts must be DictData')
      dicts = []
    }
    dict.dict[type].splice(0, Number.MAX_SAFE_INTEGER, ...dicts)

    const { Vue } = Dependency
    const typeLabel = dict.label[type]
    const keyMap = {}
    for(let k in typeLabel) {
      keyMap[k] = 0
    }
    dicts.forEach(d => {
      Vue.set(typeLabel, d.value, d.label)
      delete keyMap[d.value]
    })
    for(let k in keyMap) {
      Vue.delete(typeLabel, k)
    }
    return dicts
  })
  dict.dict[dictMeta.type].loader = loader
  return loader.finally(function () {
    delete dict.dict[dictMeta.type].loader
  })
}
