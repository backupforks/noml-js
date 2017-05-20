object
  = x:expr _ xs:object { return [x, ...xs] }
  / _ { return [] }

expr
  = key:value _ data:expr { return {key, data: [data]} }
  / key:value _ '{' _ data:object _ '}' ';'? _
  	{ return {type: 'object', key, data} }
  / key:value _ ';'? _ { return {type: 'value', key} }

value "value" = word / strQuot / strLiteral
word = $[a-z0-9@#$%!?_.-]i+
strQuot = '"' s:strQuotChar* '"' { return s.join('') }
strQuotChar = [^"\\] / '\\\\' { return '\\' } / '\\"' { return '"' }
strLiteral = "'" s:$[^']* "'" { return s }
_ "whitespace" = [ \t\n\r]*
