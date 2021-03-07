export type Token =
  'EOF' |
  'NEWLINE' |
  'SPACE' |
  'CLOSE_CURLY' |
  'FUNCTION_NOPARAM' |
  'METHOD' |
  'RETURN' |
  'VAR'

export type Op = Token | string | number

export type LexemeCallback = (lexeme: string, ...ops: Op[]) => Token | Op[] | void

export interface Lex {
  addRule: (regex: string | RegExp, callback: LexemeCallback, start?: any[]) => Lex
  setInput: (program: string) => Lex
  lex: () => Op
}
