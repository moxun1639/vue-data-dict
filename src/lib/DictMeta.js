import DictOptions from './DictOptions'
import merge from './util/merge'

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
    this.request = options.request,
    this.responseConverter = options.responseConverter
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
  const opts = merge.recursive({}, DictOptions.metas['*'])
  if (typeof options === 'string') {
    opts.type = options
    merge.recursive(opts, DictOptions.metas[options])
  } else if (typeof options === 'object') {
    merge.recursive(opts, DictOptions.metas[options.type], options)
  }
  return new DictMeta(opts)
}
