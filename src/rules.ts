const CLASS = '[A-Z][a-z]*'

export const closeCurly = new RegExp('}')
export const functionNoParam = new RegExp('fun (.*) {')
export const method = new RegExp('(.*)\\.(.*)\\((.*)\\)')
export const returnStatement = new RegExp('return (.*)')
export const variableDeclaration = new RegExp('jawn ([a-z]) = (.*)')
export const eof = new RegExp('$')
export const classDeclaration = new RegExp(`boul (${CLASS}) {`)
export const classInstantiation = new RegExp(`jawn (.*) @ (${CLASS})`)
export const classExtension = new RegExp(`boul (${CLASS}) <- (${CLASS}) {`)
