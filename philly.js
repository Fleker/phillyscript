// https://blog.mgechev.com/2017/09/16/developing-simple-interpreter-transpiler-compiler-tutorial/
const Lexer = require('lex')
/**
 * The phase of lexical analysis is responsible for dividing the input string
 * (or stream of characters) of the program into smaller pieces called tokens.
 * The tokens usually carry information about their type (if they are numbers,
 * operators, keywords, identifiers, etc), the substring of the program they
 * represent and their position in the program. The position is usually used for
 * reporting user friendly errors in case of invalid syntactical constructs. 
 */

const variableDeclaration = new RegExp('jawn ([a-z]) = (.*)')
const log = new RegExp('console\\.log\\(x\\)')
const eof = new RegExp('$')

let gRow = 1
let gCol = 1
const grammar = new Lexer
grammar
  .addRule(/\n/, _ => {
    gRow++
    gCol = 1
    return "NEWLINE"
  })
  .addRule(/./, function() {
    this.reject = true
    gCol++
  })
  .addRule(variableDeclaration, (lexeme, ...ops) => {
    return ["VAR", ...ops]
  })
  .addRule(log, (lexeme, ...ops) => {
    return "LOG"
  })
  .addRule(eof, function() {
    return "EOF"
  })

const lex = program => {
  const lexer = grammar.setInput(program)
  const tokens = []
  let token
  while ((token = lexer.lex()) !== undefined) {
    tokens.push(token)
  }
  return tokens
}

const Op = Symbol("Op")
const Num = Symbol("Num")
const Var = Symbol("Var")

/**
 * The syntax analyzer (often known as parser) is the module of a compiler
 * which out of a list (or stream) of tokens produces an Abstract Syntax Tree
 * (or in short an AST). Along the process, the syntax analyzer may also
 * produce syntax errors in case of invalid programs.
 *
 */
const parse = tokens => {

  let c = 0;

  const peek = () => tokens[c];
  const consume = () => tokens[c++];

  const ast = []

  const parsers = {
    NEWLINE: () => {
      ast.push({
        type: 'NEWLINE',
        val: '\n'
      })
    },
    VAR: () => {
      ast.push({
        type: 'VAR',
        var: consume(),
        val: consume(),
      })
    },
    LOG: () => {
      ast.push({
        type: 'LOG',
        val: '',
      })
    },
  }

  while (peek() !== 'EOF') {
    parsers[consume()]()
  }

  return ast
};

const transpile = ast => {
  let transpilation = ''
  const transpilers = {
    NEWLINE: () => {
      return '\n'
    },
    VAR: (leaf) => {
      return `const ${leaf.var} = ${leaf.val}`
    },
    LOG: () => {
      return `console.log(x)`
    },
  }
  ast.forEach(leaf => {
    transpilation += transpilers[leaf.type](leaf)
  })
  return transpilation
};

const program = `
jawn x = 1
jawn y = 2
console.log(x)
`

// console.log(lex(program))
// console.log(parse(lex(program)))
console.log(transpile(parse(lex(program))))
