import { Op } from "./lex.type";

export type AstType =
  'NEWLINE' |
  'SPACE' |
  'CLASS' |
  'CLASS_EXTENSION' |
  'CLASS_INSTANTIATION' |
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
