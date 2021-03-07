import { Op } from "./lex.type";

export type AstType =
  'NEWLINE' |
  'SPACE' |
  'CLOSE_CURLY' |
  'FUNCTION_NOPARAM' |
  'METHOD' |
  'RETURN' |
  'VAR'

export interface AstLeaf {
  type: AstType,
  var?: Op,
  val?: Op,
  callee?: Op,
  method?: Op,
  params?: Op,
}
