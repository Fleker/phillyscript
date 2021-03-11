import { Op } from "./lex.type";

export type AstType =
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
  'VAR_CALL'

export interface AstLeaf {
  type: AstType,
  var?: Op,
  val?: Op,
  callee?: Op,
  method?: Op,
  params?: Op,
}
