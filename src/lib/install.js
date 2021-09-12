import Dict from './Dict'
import { mergeOptions } from './DictOptions'

export default function(Vue, options) {
  mergeOptions(options)
  Vue.mixin({
    data() {
      if (this.$options.dicts === undefined || this.$options.dicts === null) {
        return {}
      }
      const dict = new Dict()
      dict.owner = this
      return {
        dict
      }
    },
    created() {
      if (!(this.dict instanceof Dict)) {
        return
      }
      this.dict.init(this.$options.dicts).then(() => {
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
