import { Op } from "./lex.type";

export type AstType = 'NEWLINE' | 'VAR' | 'LOG'

export interface AstLeaf {
  type: AstType,
  var?: Op,
  val?: Op,
}
