// https://blog.mgechev.com/2017/09/16/developing-simple-interpreter-transpiler-compiler-tutorial/
declare var require: any
const Lexer = require('lex')

import { Lex, Op, Token } from './lex.type'
import * as R from './rules'
import { AstLeaf, AstType } from './ast.type';

function nullable(arr: any[]) {
  return arr.map(entry => entry === undefined ? null : entry)
}

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
  .addRule(R.classExtension, (lexeme: string, ...ops: Op[]) => {
    return ['CLASS_EXTENSION', ...ops]
  })
  .addRule(R.classDeclaration, (lexeme: string, ...ops: Op[]) => {
    return ['CLASS', ...ops]
  })
  .addRule(R.classInstantiation, (lexeme: string, ...ops: Op[]) => {
    return ['CLASS_INSTANTIATION', ...ops]
  })
  .addRule(R.closeCurly, () => {
    return 'CLOSE_CURLY'
  }, [])
  .addRule(R.closeParenth, () => {
    return 'CLOSE_PARENTH'
  }, [])
  .addRule(R.functionNoParam, (lexeme: string, ...ops: Op[]) => {
    return ['FUNCTION_NOPARAM', ...nullable(ops)]
  })
  .addRule(R.variableInstanceOf, (lexeme: string, ...ops: Op[]) => {
    return ['INSTANCEOF', ...ops]
  })
  .addRule(R.method, (lexeme: string, ...ops: Op[]) => {
    return ['METHOD', ...nullable(ops)]
  })
  .addRule(R.rangeSyntax, (lexeme: string, ...ops: Op[]) => {
    return ['RANGE', ...ops]
  })
  .addRule(R.returnStatement, (lexeme: string, ...ops: Op[]) => {
    return ['RETURN', ...ops]
  })
  .addRule(R.atomInstantiation, (lexeme: string, ...ops: Op[]) => {
    return ['ATOM_INSTANTIATION', ...ops]
  })
  .addRule(R.variableDeclaration, (lexeme: string, ...ops: Op[]) => {
    return ['VAR', ...nullable(ops)]
  })
  .addRule(R.mutableVariableDeclaration, (lexeme: string, ...ops: Op[]) => {
    return ['VAR_MUT', ...nullable(ops)]
  })
  .addRule(R.variable, (lexeme: string, ...ops: Op[]) => {
    return ['VAR_CALL', ...ops]
  })
  .addRule(R.conditionalInit, (lexeme: string, ...ops: Op[]) => {
    return ['COND_INIT', ...ops]
  })
  .addRule(R.conditionalManyOperators, (lexeme: string, ...ops: Op[]) => {
    return ['COND_MANY_MANY_OPERATOR', ...ops]
  })
  .addRule(R.conditionalManyEquals, (lexeme: string, ...ops: Op[]) => {
    return ['COND_MANY_SINGLE_OPERATOR', ...ops]
  })
  .addRule(R.staticString, (lexeme: string, ...ops: Op[]) => {
    return ['STATIC_STRING', ...ops]
  })
  .addRule(R.atomPrint, (lexeme: string, ...ops: Op[]) => {
    return ['ATOM_PRINT', ...ops]
  })
  .addRule(R.rangeArith, (lexeme: string, ...ops: Op[]) => {
    return ['ARRAY_ARITHMETIC', ...ops]
  })
  .addRule(R.nequals, (lexeme: string, ...ops: Op[]) => {
    return 'NEQUAL'
  })
  .addRule(R.estimateOperator, (lexeme: string, ...ops: Op[]) => {
    return ['ESTIMATE', ...ops]
  })
  .addRule(R.estimateOperator2, (lexeme: string, ...ops: Op[]) => {
    return ['ESTIMATE_PRECISE', ...ops]
  })
  .addRule(R.remainderDivision, (lexeme: string, ...ops: Op[]) => {
    return ['DIV_REMAIN', ...ops]
  })
  .addRule(R.factorial, (lexeme: string, ...ops: Op[]) => {
    return ['FACTORIAL', ...ops]
  })
  .addRule(R.maybe, () => {
    return 'MAYBE'
  })
  .addRule(R.maybeWeighted, (lexeme: string, ...ops: Op[]) => {
    return ['MAYBE_WEIGHTED', ...ops]
  })
  .addRule(R.magnitude, (lexeme: string, ...ops: Op[]) => {
    return ['MAGNITUDE', ...ops]
  })
  .addRule(R.magnitude2, (lexeme: string, ...ops: Op[]) => {
    return ['MAGNITUDE_PRECISE', ...ops]
  })
  .addRule(R.bitshift, (lexeme: string, ...ops: Op[]) => {
    return ['BITSHIFT', ...ops]
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
    CLASS_EXTENSION: () => {
      ast.push({
        type: 'CLASS_EXTENSION',
        var: consume(),
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
    CLOSE_PARENTH: () => {
      ast.push({
        type: 'CLOSE_PARENTH',
      })
    },
    INSTANCEOF: () => {
      ast.push({
        type: 'INSTANCEOF',
        var: consume(),
        val: consume(),
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
        method: consume(),
        val: consume(),
      })
    },
    METHOD: () => {
      ast.push({
        type: 'METHOD',
        var: consume(),
        callee: consume(),
        method: consume(),
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
        method: consume(),
        val: consume(),
      })
    },
    VAR_MUT: () => {
      ast.push({
        type: 'VAR_MUT',
        var: consume(),
        method: consume(),
        val: consume(),
      })
    },
    VAR_CALL: () => {
      ast.push({
        type: 'VAR_CALL',
        var: consume(),
      })
    },
    COND_INIT: () => {
      ast.push({
        type: 'COND_INIT'
      })
    },
    COND_MANY_SINGLE_OPERATOR: () => {
      ast.push({
        type: 'COND_MANY_SINGLE_OPERATOR',
        var: consume(),
        method: consume(),
        val: consume(),
      })
    },
    COND_MANY_MANY_OPERATOR: () => {
      ast.push({
        type: 'COND_MANY_MANY_OPERATOR',
        var: consume(),
        method: consume(),
        val: consume(),
        callee: consume(),
        params: consume(),
      })
    },
    STATIC_STRING: () => {
      ast.push({
        type: 'STATIC_STRING',
        method: consume(),
        val: consume(),
      })
    },
    ATOM_INSTANTIATION: () => {
      ast.push({
        type: 'ATOM_INSTANTIATION',
        var: consume(),
        val: consume()
      })
    },
    ATOM_PRINT: () => {
      ast.push({
        type: 'ATOM_PRINT',
        var: consume(),
      })
    },
    RANGE: () => {
      ast.push({
        type: 'RANGE',
        var: consume(),
        val: consume(),
        method: consume(),
      })
    },
    ARRAY_ARITHMETIC: () => {
      ast.push({
        type: 'ARRAY_ARITHMETIC',
        var: consume(),
        method: consume(),
        val: consume(),
      })
    },
    NEQUAL: () => {
      ast.push({
        type: 'NEQUAL'
      })
    },
    ESTIMATE: () => {
      ast.push({
        type: 'ESTIMATE',
        var: consume(),
        val: consume(),
      })
    },
    ESTIMATE_PRECISE: () => {
      ast.push({
        type: 'ESTIMATE_PRECISE',
        var: consume(),
        method: consume(),
        val: consume(),
      })
    },
    DIV_REMAIN: () => {
      ast.push({
        type: 'DIV_REMAIN',
        var: consume(),
        val: consume(),
      })
    },
    FACTORIAL: () => {
      ast.push({
        type: 'FACTORIAL',
        val: consume(),
      })
    },
    MAYBE: () => {
      ast.push({
        type: 'MAYBE'
      })
    },
    MAYBE_WEIGHTED: () => {
      ast.push({
        type: 'MAYBE_WEIGHTED',
        val: consume(),
      })
    },
    MAGNITUDE: () => {
      ast.push({
        type: 'MAGNITUDE',
        var: consume(),
        method: consume(),
        val: consume(),
      })
    },
    MAGNITUDE_PRECISE: () => {
      ast.push({
        type: 'MAGNITUDE_PRECISE',
        var: consume(),
        method: consume(),
        params: consume(),
        val: consume(),
      })
    },
    BITSHIFT: () => {
      ast.push({
        type: 'BITSHIFT',
        var: consume(),
        method: consume(),
        val: consume(),
      })
    }
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
    CLASS_EXTENSION: (leaf: AstLeaf) => {
      return `class ${leaf.var} extends ${leaf.val} {`
    },
    CLASS_INSTANTIATION: (leaf: AstLeaf) => {
      return `const ${leaf.var} = new ${leaf.val}()`
    },
    CLOSE_CURLY: () => {
      return '}'
    },
    CLOSE_PARENTH: () => {
      return ')'
    },
    INSTANCEOF: (leaf: AstLeaf) => {
      return `${leaf.var} instanceof ${leaf.val}`
    },
    SPACE: () => {
      return ' '
    },
    FUNCTION_NOPARAM: (leaf: AstLeaf) => {
      if (leaf.method) {
        return `async function ${leaf.val}() {`
      }
      return `function ${leaf.val}() {`
    },
    METHOD: (leaf: AstLeaf) => {
      if (leaf.var) {
        return `await ${leaf.callee}.${leaf.method}(`
      }
      return `${leaf.callee}.${leaf.method}(`
    },
    RETURN: (leaf: AstLeaf) => {
      return `return ${leaf.val}`
    },
    VAR: (leaf: AstLeaf) => {
      if (leaf.method) {
        return `const ${leaf.var} = await ${leaf.val}`
      }
      return `const ${leaf.var} = ${leaf.val}`
    },
    VAR_MUT: (leaf: AstLeaf) => {
      if (leaf.method) {
        return `let ${leaf.var} = await ${leaf.val}`
      }
      return `let ${leaf.var} = ${leaf.val}`
    },
    VAR_CALL: (leaf: AstLeaf) => {
      return `${leaf.var}`
    },
    COND_INIT: () => {
      return `if (`
    },
    COND_MANY_SINGLE_OPERATOR: (leaf: AstLeaf) => {
      return (leaf.val as string).split(',')
        .map(x => x.trim())
        .map(x => `${leaf.var} ${leaf.method} ${x}`)
        .join(' || ') + ') {'
    },
    COND_MANY_MANY_OPERATOR: (leaf: AstLeaf) => {
      return `${leaf.var} ${leaf.method} ${leaf.val} || ${leaf.var} ${leaf.callee} ${leaf.params}) {`
    },
    STATIC_STRING: (leaf: AstLeaf) => {
      return `${leaf.method}${leaf.val}${leaf.method}`
    },
    ATOM_INSTANTIATION: (leaf: AstLeaf) => {
      return `const ${leaf.var} = Symbol.for('${leaf.val}')`
    },
    ATOM_PRINT: (leaf: AstLeaf) => {
      return `Symbol.keyFor(${leaf.var})`
    },
    RANGE: (leaf: AstLeaf) => {
      return `(() => {
        if (Array.isArray(${leaf.var})) {
          return ${leaf.var}.slice(${leaf.val}, ${leaf.method})
        }
        if (typeof ${leaf.var} === 'string') {
          return ${leaf.var}.substring(${leaf.val}, ${leaf.method})
        }
        throw new Error('Cannot obtain range for "${leaf.var}"')
      })()`
    },
    ARRAY_ARITHMETIC: (leaf: AstLeaf) => {
      return `${leaf.var}.map(n => n ${leaf.method} ${leaf.val})`
    },
    NEQUAL: () => {
      return `!==`
    },
    ESTIMATE: (leaf: AstLeaf) => {
      return `Math.round(${leaf.var}) === Math.round(${leaf.val})`
    },
    ESTIMATE_PRECISE: (leaf: AstLeaf) => {
      return `Math.round(${leaf.var} / ${leaf.method}) === Math.round(${leaf.val} / ${leaf.method})`
    },
    DIV_REMAIN: (leaf: AstLeaf) => {
      return `[Math.floor(${leaf.var} / ${leaf.val}), ${leaf.var} % ${leaf.val}]`
    },
    FACTORIAL: (leaf: AstLeaf) => {
      return `(() => {
        let res = 1
        for (let i = 1; i <= ${leaf.val}; i++) {
          res *= i
        }
        return res
      })()`
    },
    MAYBE: () => {
      return `Math.random() < 0.5) {`
    },
    MAYBE_WEIGHTED: (leaf: AstLeaf) => {
      return `Math.random() < ${leaf.val}) {`
    },
    MAGNITUDE: (leaf: AstLeaf) => {
      if (leaf.method === '<<') {
        // Much less-than
        return `${leaf.var} * 10 < ${leaf.val}`
      }
      // Much greater-than
      return `${leaf.var} > 10 * ${leaf.val}`
    },
    MAGNITUDE_PRECISE: (leaf: AstLeaf) => {
      if (leaf.method === '<') {
        // Much less-than
        return `${leaf.var} * ${leaf.params} < ${leaf.val}`
      }
      // Much greater-than
      return `${leaf.var} > ${leaf.params} * ${leaf.val}`
    },
    BITSHIFT: (leaf: AstLeaf) => {
      return `${leaf.var} ${leaf.method} ${leaf.val}`
    }
  }
  ast.forEach(leaf => {
    transpilation += transpilers[leaf.type](leaf)
  })
  return transpilation
};
