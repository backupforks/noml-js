const NOML = require('./noml.js')
const assert = require('assert')

const tests = {
  'simple data': {
    src: 'foo 1; bar 2',
    check(noml) {
      assert.equal(noml.getValue('foo'), '1')
      assert.equal(noml.getValue('bar'), '2')
    },
  },
  'invalid data with duplicate values': {
    src: 'a b; a b',
    fail: true,
  },
}

Object.keys(tests)
  .map(test => [test, tests[test]])
  .forEach(([test, {src, check, fail}]) =>
    (
      fail
        ? assert.throws
        : f => f()
    )(
      () => {
        console.log(`Parsing ${test}...`)
        const noml = NOML.parse(src)
        if (check) check(noml)
      }
    )
  )
