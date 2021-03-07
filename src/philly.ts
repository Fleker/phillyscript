// https://blog.mgechev.com/2017/09/16/developing-simple-interpreter-transpiler-compiler-tutorial/
declare var require: any
const Lexer = require('lex')

import { Lex, Op, Token } from './lex.type'
import * as R from './rules'
import { AstLeaf, AstType } from './ast.type';

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
  .addRule(R.method, (lexeme: string, ...ops: Op[]) => {
    return ["METHOD", ...ops]
  })
  .addRule(R.eof, function() {
    return "EOF"
  })

export const lex = (program: string) => {
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
type Parsers = Record<Token, () => void>

export const parse = (tokens: Op[]) => {

  let c = 0;

  const peek = () => tokens[c];
  const consume = () => tokens[c++];

  const ast: AstLeaf[] = []

  const parsers: Parsers = {
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
    METHOD: () => {
      ast.push({
        type: 'METHOD',
        callee: consume(),
        method: consume(),
        params: consume(),
      })
    },
  }

  while (peek() !== 'EOF') {
    parsers[consume() as Token]()
  }

  return ast
};

type Transpilers = Record<AstType, (leaf: AstLeaf) => string>

export const transpile = (ast: AstLeaf[]) => {
  let transpilation = ''
  const transpilers: Transpilers = {
    NEWLINE: () => {
      return '\n'
    },
    VAR: (leaf: AstLeaf) => {
      return `const ${leaf.var} = ${leaf.val}`
    },
    METHOD: (leaf: AstLeaf) => {
      return `${leaf.callee}.${leaf.method}(${leaf.params})`
    },
  }
  ast.forEach(leaf => {
    transpilation += transpilers[leaf.type](leaf)
  })
  return transpilation
};
