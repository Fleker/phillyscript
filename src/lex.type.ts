export type Token =
  'EOF' |
  'NEWLINE' |
  'SPACE' |
  'CLASS' |
  'CLASS_EXTENSION' |
  'CLASS_INSTANTIATION' |
  'CLOSE_CURLY' |
  'CLOSE_PARENTH' |
  'FUNCTION_NOPARAM' |
  'INSTANCEOF' |
  'METHOD' |
  'RETURN' |
  'VAR' |
  'VAR_MUT' |
  'VAR_CALL' |
  'COND_INIT' |
  'COND_MANY_SINGLE_OPERATOR' |
  'COND_MANY_MANY_OPERATOR' |
  'STATIC_STRING' |
  'ATOM_INSTANTIATION' |
  'ATOM_PRINT' |
  'RANGE' |
  'ARRAY_ARITHMETIC' |
  'NEQUAL' |
  'ESTIMATE' |
  'ESTIMATE_PRECISE' |
  'DIV_REMAIN' |
  'FACTORIAL' |
  'MAYBE' |
  'MAYBE_WEIGHTED'

export type Op = Token | string | number

export type LexemeCallback = (lexeme: string, ...ops: Op[]) => Token | Op[] | void

export interface Lex {
  addRule: (regex: string | RegExp, callback: LexemeCallback, start?: any[]) => Lex
  setInput: (program: string) => Lex
  lex: () => Op
}
