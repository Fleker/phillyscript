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
let gRow = 1
let gCol = 1
const grammar = new Lexer((char: string) => {
  throw new Error(`Unexpected character "${char}" at row/col ${gRow}:${gCol}`)
}) as Lex
grammar
  .addRule(/\n/, () => {
    gRow++
    gCol = 1
    return "NEWLINE"
  })
  .addRule(/./, function() {
    this.reject = true
    gCol++
  }, [])
  .addRule(R.classDeclaration, (lexeme: string, ...ops: Op[]) => {
    return ['CLASS', ...ops]
  })
  .addRule(R.classInstantiation, (lexeme: string, ...ops: Op[]) => {
    return ['CLASS_INSTANTIATION', ...ops]
  })
  .addRule(R.closeCurly, () => {
    return 'CLOSE_CURLY'
  }, [])
  .addRule(R.functionNoParam, (lexeme: string, ...ops: Op[]) => {
    return ['FUNCTION_NOPARAM', ...ops]
  })
  .addRule(R.method, (lexeme: string, ...ops: Op[]) => {
    return ['METHOD', ...ops]
  })
  .addRule(R.returnStatement, (lexeme: string, ...ops: Op[]) => {
    return ['RETURN', ...ops]
  })
  .addRule(R.variableDeclaration, (lexeme: string, ...ops: Op[]) => {
    return ['VAR', ...ops]
  })
  .addRule(/\s/, () => {
    return 'SPACE'
  })
  .addRule(R.eof, () => {
    return 'EOF'
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
    EOF: () => {},
    NEWLINE: () => {
      ast.push({
        type: 'NEWLINE',
        val: '\n'
      })
    },
    CLASS: () => {
      ast.push({
        type: 'CLASS',
        val: consume(),
      })
    },
    CLASS_INSTANTIATION: () => {
      ast.push({
        type: 'CLASS_INSTANTIATION',
        var: consume(),
        val: consume(),
      })
    },
    CLOSE_CURLY: () => {
      ast.push({
        type: 'CLOSE_CURLY',
      })
    },
    SPACE: () => {
      ast.push({
        type: 'SPACE'
      })
    },
    FUNCTION_NOPARAM: () => {
      ast.push({
        type: 'FUNCTION_NOPARAM',
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
    RETURN: () => {
      ast.push({
        type: 'RETURN',
        val: consume(),
      })
    },
    VAR: () => {
      ast.push({
        type: 'VAR',
        var: consume(),
        val: consume(),
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
    CLASS: (leaf: AstLeaf) => {
      return `class ${leaf.val} {`
    },
    CLASS_INSTANTIATION: (leaf: AstLeaf) => {
      return `const ${leaf.var} = new ${leaf.val}()`
    },
    CLOSE_CURLY: () => {
      return '}'
    },
    SPACE: () => {
      return ' '
    },
    FUNCTION_NOPARAM: (leaf: AstLeaf) => {
      return `function ${leaf.val}() {`
    },
    METHOD: (leaf: AstLeaf) => {
      return `${leaf.callee}.${leaf.method}(${leaf.params})`
    },
    RETURN: (leaf: AstLeaf) => {
      return `return ${leaf.val}`
    },
    VAR: (leaf: AstLeaf) => {
      return `const ${leaf.var} = ${leaf.val}`
    },
  }
  ast.forEach(leaf => {
    transpilation += transpilers[leaf.type](leaf)
  })
  return transpilation
};
