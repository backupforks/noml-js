const peg = require('pegjs')
const babel = require('babel-core')
const fs = require('fs')
const libSrc = fs.readFileSync(`${__dirname}/lib.js`, 'utf8')
const parserPegSrc = fs.readFileSync(`${__dirname}/parser.pegjs`, 'utf8')
const parserSrc = peg.generate(parserPegSrc, {output: 'source'})
const src = `const parser = ${parserSrc};\n${libSrc}`
const code = babel.transform(src, {
  filename: `${__dirname}/NOML.js`, comments: false,
}).code
fs.writeFileSync(`${__dirname}/noml.js`, code)
