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
  'VAR_CALL'

export type Op = Token | string | number

export type LexemeCallback = (lexeme: string, ...ops: Op[]) => Token | Op[] | void

export interface Lex {
  addRule: (regex: string | RegExp, callback: LexemeCallback, start?: any[]) => Lex
  setInput: (program: string) => Lex
  lex: () => Op
}
