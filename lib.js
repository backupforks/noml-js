/* global parser */

const T = Symbol()

const esc = (...xs) =>
  xs.map(x =>
    x.match(/\W/) ? JSON.stringify(x) : x
  ).join('.')

const errors = {
  value_value: (p, k) =>
    `Property ${esc(...p)} has a duplicate value: ${esc(k)}`,
  object_object: (p, k) =>
    `Object ${esc(...p, k)} has multiple definitions`,
  object_value: (p, k) =>
    `Empty definition of ${esc(...p, k)} object is redundant`,
  nest_value: (p, k) =>
    `Empty definition of ${esc(...p, k)} value is redundant`,
  nest_object: (p, k) =>
    `Definitions of ${esc(...p, k)} are incompatible`,
}

function merge(obj, {type = 'nest', key, data}, path = []) {
  if (obj[key]) {
    const error = errors[[obj[key][T], type].sort().join('_')]
    if (error) throw Error(error(path, key))
  }
  else obj[key] = {[T]: type}
  if (data) for (const d of data) merge(obj[key], d, [...path, key])
}

export function parse(str) {
  const obj = {}
  const data = parser.parse(str)
  for (const d of data) merge(obj, d)
  return obj
}

class Noml {
  constructor(data, path) {
    this.data = data
    this.path = path || []
  }
  getValue(key, {fallback}) {
    
  }
}
