# data dict for Vue.js

## Installation

```js
npm i vue-data-dict -S
```

## Examples

### install 

```vue
import Vue from 'vue'
import VueDataDict from 'vue-data-dict'

Vue.use(VueDataDict, {
  onCreated(dict) {
    console.log('dict created: %o', dict)
  },
  onReady(dict) {
    console.log('dict ready: %o', dict)
  },
  metas: {
    '*': {
      request(dictMeta) {
        return Promise // get data from remote server
      },
      responseConverter(response, dictMeta) {
        // you can use "VueDataDict.DictConverter({ ... }, dictMeta)" to convert Object to DictData
        return [] // Array.<DictData>
      }
    }
  }
})
```

### use 

```vue
<template>
  <div>
    <div v-for="item in dict.dict.dict1" :key="item.value">
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  dicts: [
    'dict1', // only type name
    { // full dict meta
      type: 'dict2',
      lazy: true, // lazy load
      request(dictMeta) { // get dict2's data
        ...
        return Promise
      },
      responseConverter(response, dictMeta) {
        ...
        return [] // Array.<DictData>
      })
    }],
  methods: {
    onDictReady(dict) {
      // dict ready event
    },
    toLoadDict() {
      this.dict.reloadDict('dict2')
    },
  }
}
</script>
```