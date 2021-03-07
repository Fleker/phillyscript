// https://blog.mgechev.com/2017/09/16/developing-simple-interpreter-transpiler-compiler-tutorial/
declare var require: any
const Lexer = require('lex')

import { Lex, Op } from './lex.type'
import * as R from './rules'
import { AstLeaf } from './ast.type';

/**
 * The phase of lexical analysis is responsible for dividing the input string
 * (or stream of characters) of the program into smaller pieces called tokens.
 * The tokens usually carry information about their type (if they are numbers,
 * operators, keywords, identifiers, etc), the substring of the program they
 * represent and their position in the program. The position is usually used for
 * reporting user friendly errors in case of invalid syntactical constructs. 
 */
// let gRow = 1
// let gCol = 1
const grammar = new Lexer as Lex
grammar
  .addRule(/\n/, () => {
    // gRow++
    // gCol = 1
    return "NEWLINE"
  })
  .addRule(/./, function() {
    this.reject = true
    // gCol++
  })
  .addRule(R.variableDeclaration, (lexeme: string, ...ops: Op[]) => {
    return ["VAR", ...ops]
  })
  .addRule(R.log, (lexeme: string, ...ops: Op[]) => {
    return "LOG"
  })
  .addRule(R.eof, function() {
    return "EOF"
  })

const lex = (program: string) => {
  const lexer = grammar.setInput(program)
  const tokens = []
  let token
  while ((token = lexer.lex()) !== undefined) {
    tokens.push(token)
  }
  return tokens
}

/**
 * The syntax analyzer (often known as parser) is the module of a compiler
 * which out of a list (or stream) of tokens produces an Abstract Syntax Tree
 * (or in short an AST). Along the process, the syntax analyzer may also
 * produce syntax errors in case of invalid programs.
 *
 */
const parse = (tokens: Op[]) => {

  let c = 0;

  const peek = () => tokens[c];
  const consume = () => tokens[c++];

  const ast: AstLeaf[] = []

  const parsers: any = {
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

const transpile = (ast: AstLeaf[]) => {
  let transpilation = ''
  const transpilers: any = {
    NEWLINE: () => {
      return '\n'
    },
    VAR: (leaf: AstLeaf) => {
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
