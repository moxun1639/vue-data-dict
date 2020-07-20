var env = process.env

var BANNER = '\x1b[33mThank you for using vue-data-dict (\x1b[32m https://github.com/moxun1639/vue-data-dict \x1b[96m)\n' +
  '\x1b[35mAuthor: Moxun<mxnstrive@gmail.com>\x1b[0m\n'

// eslint-disable-next-line no-console,no-control-regex
console.log(env.npm_config_color ? BANNER : BANNER.replace(/\x1b\[\d+m/g, ''))
