/// A lexical Tree-sitter grammar for Chic.
///
/// This intentionally stays shallow: the Zed extension only needs a stable
/// syntax tree for highlighting, not a second implementation of Chic's parser.
module.exports = grammar({
  name: "chic",

  word: ($) => $.identifier,

  extras: ($) => [/[\s\uFEFF\u2060\u200B]/, $.documentation_comment, $.comment],

  rules: {
    source_file: ($) => repeat($._token),

    _token: ($) =>
      choice(
        $.string_literal,
        $.c_string_literal,
        $.char_literal,
        $.rune_literal,
        $.float_literal,
        $.integer_literal,
        $.boolean_literal,
        $.null_literal,
        $.directive,
        $.annotation,
        $.control_keyword,
        $.declaration_keyword,
        $.storage_keyword,
        $.builtin_keyword,
        $.builtin_type,
        $.type_identifier,
        $.identifier,
        $.operator,
        "(",
        ")",
        "[",
        "]",
        "{",
        "}",
        ",",
        ";",
        ":",
        ".",
        "?"
      ),

    documentation_comment: ($) => token(prec(1, seq("///", /[^\n]*/))),

    comment: ($) =>
      token(
        choice(
          seq("//", /[^\n]*/),
          seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")
        )
      ),

    string_literal: ($) =>
      seq('"', repeat(choice($.escape_sequence, $.string_content)), '"'),

    c_string_literal: ($) =>
      seq('c"', repeat(choice($.escape_sequence, $.string_content)), '"'),

    string_content: ($) => token.immediate(prec(1, /[^"\\\n]+/)),

    escape_sequence: ($) =>
      token.immediate(seq("\\", choice(/[ntrbf0\\"']/, /x[0-9a-fA-F]{2}/, /u[0-9a-fA-F]{4}/))),

    char_literal: ($) => token(seq("'", choice(/[^'\\\n]/, /\\./), "'")),
    rune_literal: ($) =>
      token(
        seq(
          "r'",
          choice(/[^'\\\n]/, /\\u\{[0-9a-fA-F]{1,6}\}/, /\\[ntrbf0\\']/),
          "'"
        )
      ),

    float_literal: ($) =>
      token(
        choice(
          seq(/[0-9][0-9_]*/, ".", /[0-9][0-9_]*/, optional(seq(/[eE]/, optional(/[+-]/), /[0-9][0-9_]*/))),
          seq(/[0-9][0-9_]*/, /[eE]/, optional(/[+-]/), /[0-9][0-9_]*/)
        )
      ),

    integer_literal: ($) =>
      token(
        choice(
          /0[xX][0-9a-fA-F][0-9a-fA-F_]*/,
          /0[bB][01][01_]*/,
          /0[oO][0-7][0-7_]*/,
          /[0-9][0-9_]*/
        )
      ),

    boolean_literal: ($) => choice("true", "false"),
    null_literal: ($) => "null",

    directive: ($) => choice("#if", "#elif", "#else", "#end", "#import_lib", "#package"),

    annotation: ($) => token(/@[a-zA-Z_][a-zA-Z0-9_]*/),

    control_keyword: ($) =>
      choice(
        "if",
        "else",
        "for",
        "in",
        "step",
        "continue",
        "break",
        "return",
        "match",
        "switch",
        "case",
        "default",
        "defer",
        "try",
        "or_else",
        "or_default",
        "or_error"
      ),

    declaration_keyword: ($) =>
      choice("import", "func", "funcptr", "struct", "enum", "union", "raw_union", "alias"),

    storage_keyword: ($) => choice("let", "var", "inline"),

    builtin_keyword: ($) => choice("new", "release", "sizeof", "typeof", "cast"),

    builtin_type: ($) =>
      choice(
        "i8",
        "i16",
        "i32",
        "i64",
        "u8",
        "u16",
        "u32",
        "u64",
        "f32",
        "f64",
        "bool",
        "char",
        "rune",
        "string",
        "cstring",
        "any",
        "void"
      ),

    type_identifier: ($) => /[A-Z][a-zA-Z0-9_]*/,
    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    operator: ($) =>
      token(
        choice(
          "...",
          "..=",
          "..",
          "<<=",
          ">>=",
          "++",
          "--",
          "+=",
          "-=",
          "*=",
          "/=",
          "%=",
          "&=",
          "|=",
          "^=",
          "==",
          "!=",
          "<=",
          ">=",
          "&&",
          "||",
          "<<",
          ">>",
          "**",
          "->",
          "=>",
          ":=",
          "::",
          "+",
          "-",
          "*",
          "/",
          "%",
          "!",
          "&",
          "|",
          "^",
          "~",
          "<",
          ">",
          "="
        )
      ),
  },
});
