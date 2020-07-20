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
  meta: {
    request(dictMeta) {
      return Promise // get data from remote server
    },
    responseConverter(response, dictMeta) {
      // you can use "VueDataDict.DictConverter({ ... }, dictMeta)" to convert Object to DictData
      return [] // Array.<DictData>
    }
  }
})
```

### use 

```vue
<template>
  <div>
    <div v-for="item in dict.dict1" :key="item.value">
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
      request(dictMeta) { // get dict2's data
        ...
        return Promise
      },
      responseConverter(response, dictMeta) {
        ...
        return [] // Array.<DictData>
      })
    }]
}
</script>
```