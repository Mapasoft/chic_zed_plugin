# Chic for Zed

Syntax highlighting for the [Chic programming language](https://github.com/Mapasoft/chic) in Zed.

This extension is intentionally small: it provides `.chic` file detection, syntax highlighting, bracket matching, comment toggling, and indentation. It does not include a language server, formatter, debugger, or executable code.

## Development

The extension and its Tree-sitter grammar live in the same repository. Generate and test the parser with:

```sh
cd tree-sitter-chic
npm install
npm run generate
npm test
```

After pushing the repository, replace `rev = "main"` in `extension.toml` with the commit SHA that contains the generated grammar. Zed requires a pinned grammar revision for published extensions.

Install it locally from Zed's command palette with **zed: install dev extension**, then select this repository's root directory. Because Zed fetches grammars through Git, the configured grammar revision must exist in the remote repository first.

## License

MIT
