; Comments and literals
(comment) @comment
(documentation_comment) @comment.doc
(string_literal) @string
(c_string_literal) @string
(char_literal) @string
(rune_literal) @string
(escape_sequence) @string.escape
(integer_literal) @number
(float_literal) @number
(boolean_literal) @boolean
(null_literal) @constant

; Chic vocabulary
(control_keyword) @keyword
(declaration_keyword) @keyword
(storage_keyword) @keyword
(builtin_keyword) @keyword
(directive) @preproc
(annotation) @attribute
(builtin_type) @type.builtin
(type_identifier) @type
(operator) @operator

; A declaration has the form `name : func`, `Name : struct`, etc.
(source_file
  [
    (identifier)
    (builtin_keyword)
  ] @function
  .
  ":"
  .
  (declaration_keyword) @_kind
  (#eq? @_kind "func"))

(source_file
  [
    (identifier)
    (type_identifier)
  ] @type
  .
  ":"
  .
  (declaration_keyword) @_kind
  (#any-of? @_kind "struct" "enum" "union" "raw_union"))

(source_file
  (declaration_keyword) @_alias
  .
  [
    (identifier)
    (type_identifier)
  ] @type
  (#eq? @_alias "alias"))

; Inferred and explicitly typed bindings.
(source_file
  [
    (identifier)
    (type_identifier)
  ] @constant
  .
  (operator) @_constant
  (#eq? @_constant "::"))

(source_file
  (identifier) @variable
  .
  (operator) @_assign
  (#eq? @_assign ":="))

(source_file
  (storage_keyword) @_binding
  .
  (identifier) @variable
  (#any-of? @_binding "let" "var"))

(source_file
  (identifier) @variable
  .
  ":"
  .
  [
    (builtin_type) @type.builtin
    (type_identifier) @type
    (identifier) @type
  ])

; Calls, member access, and named field initializers.
(source_file
  [
    (identifier)
    (type_identifier)
  ] @function
  .
  "(")

(source_file
  "."
  .
  (identifier) @property)

; Names following import are namespaces/packages.
(source_file
  (declaration_keyword) @_import
  .
  (identifier) @namespace
  (#eq? @_import "import"))
