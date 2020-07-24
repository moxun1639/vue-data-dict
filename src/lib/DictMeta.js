import DictOptions from './DictOptions'

/**
 * @classdesc 字典元数据
 * @property {String} type 类型
 * @property {Function} request 请求
 * @property {String} label 标签字段
 * @property {String} value 值字段
 */
export default class DictMeta {
  constructor(options) {
    this.type = options.type
    this.request = options.request || DictOptions.meta.request,
    this.responseConverter = options.mapDict || DictOptions.meta.responseConverter
    this.labelField = options.labelField
    this.valueField = options.valueField
    this.lazy = options.lazy === true
  }
}


/**
 * 解析字典元数据
 * @param {Object} options
 * @returns {DictMeta}
 */
DictMeta.parse= function(options) {
  let dictMeta = null
  if (typeof options === 'string') {
    dictMeta = new DictMeta({
      type: options,
      labelField: 'label',
      valueField: 'value',
    })
  } else if (typeof options === 'object') {
    dictMeta = new DictMeta(options)
  }
  return dictMeta
}
