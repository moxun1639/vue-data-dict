function recursive(dst, ...srcs) {
   srcs.forEach(function(src) {
    recursiveMerge(dst, src)
   })
   return dst
}

function recursiveMerge(dst, src) {
  for (let k in src) {
    if (dst[k] === null || dst[k] === undefined) {
      dst[k] = src[k]
    }
    if (Object.prototype.toString.call(dst[k]) === "[object Object]") {
      recursive(dst[k], src[k])
    } else {
      dst[k] = src[k]
    }
  }
  return dst
}

export default {
  recursive,
}
