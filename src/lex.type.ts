export type Token = 'NEWLINE' | 'VAR' | 'LOG'

export type Op = Token | string | number

export type LexemeCallback = (lexeme: string, ...ops: Op[]) => string | Op[] | void

export interface Lex {
  addRule: (regex: string | RegExp, calback: LexemeCallback) => Lex
  setInput: (program: string) => Lex
  lex: () => Op
}
