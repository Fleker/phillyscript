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
  'MAYBE_WEIGHTED' |
  'MAGNITUDE' |
  'MAGNITUDE_PRECISE' |
  'BITSHIFT'

export interface AstLeaf {
  type: AstType,
  var?: Op,
  val?: Op,
  callee?: Op,
  method?: Op,
  params?: Op,
}
