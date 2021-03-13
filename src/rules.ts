/**
 * Enforce title case
 */

const CLASS = '[A-Z][a-z]*'
/**
 * Enforce camelcase
 */
const VARIABLE = `[a-z]+(?:[A-Z][a-z])*`

const condOp = '(?:===|<=|>=|>|<|!==|==|!=)'

export const closeCurly = new RegExp('}')
export const functionNoParam = new RegExp('fun(#)? (.*) {')
export const method = new RegExp('(#)?(.*)\\.(.*)\\(')
export const closeParenth = new RegExp('\\)')
export const returnStatement = new RegExp('return (.*)')
export const variableDeclaration = new RegExp('jawn ([a-z]) := (#)?(.*)')
export const mutableVariableDeclaration = new RegExp('jawn\\* ([a-z]) := (#)?(.*)')
export const eof = new RegExp('$')
export const classDeclaration = new RegExp(`boul (${CLASS}) {`)
export const classInstantiation = new RegExp(`jawn (.*) @ (${CLASS})`)
export const classExtension = new RegExp(`boul (${CLASS}) <- (${CLASS}) {`)
export const variableInstanceOf = new RegExp(`([a-z]+) ~ (${CLASS})`)
export const variable = new RegExp('([a-z]+)')
export const conditionalInit = new RegExp('if \\(')
export const conditionalManyEquals = new RegExp(`(${VARIABLE}) (${condOp}) (.*)+\\) {`)
export const conditionalManyOperators = new RegExp(`(${VARIABLE}) (${condOp}) (.*)+, (${condOp}) (.*)+\\) {`)
export const staticString = new RegExp(`('|"|\`)(.*)(?:'|"|\`)`)
export const atomInstantiation = new RegExp('jawn ([a-z]) := :([a-z]*)')
export const atomPrint = new RegExp(`:(${VARIABLE}):`)
export const rangeSyntax = new RegExp(`(${VARIABLE})\\[(\\d+):(\\d+)\\]`)
