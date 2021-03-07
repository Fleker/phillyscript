import { Op } from "./lex.type";

export type AstType = 'NEWLINE' | 'VAR' | 'METHOD'

export interface AstLeaf {
  type: AstType,
  var?: Op,
  val?: Op,
  callee?: Op,
  method?: Op,
  params?: Op,
}
