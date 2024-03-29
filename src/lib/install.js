import Dependency from './Dependency'
import Dict from './Dict'
import { mergeOptions } from './DictOptions'

export default function(Vue, options) {
  Dependency.Vue = Vue
  mergeOptions(options)
  Vue.mixin({
    data() {
      if (!this.$options || this.$options.dicts === undefined || this.$options.dicts === null) {
        return {}
      }
      const dict = new Dict()
      return {
        dict
      }
    },
    created() {
      if (!(this.dict instanceof Dict)) {
        return
      }
      this.dict.owner = this
      options.onCreated && options.onCreated(this.dict)
      this.dict.init(this.$options.dicts).then(() => {
        options.onReady && options.onReady(this.dict)
        this.$nextTick(() => {
          this.$emit('dictReady', this.dict)
          if (this.$options.methods && this.$options.methods.onDictReady instanceof Function) {
            this.$options.methods.onDictReady.call(this, this.dict)
          }
        })
      })
    },
  })
}
