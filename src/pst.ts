// Phillyscript Transpiler
// CLI

import {transpile, parse, lex} from './philly'
import * as fs from 'fs'

// Read args
const args = process.argv.slice(2)
const filename = args[0]
const step = args[1]
const program = fs.readFileSync(filename, 'utf8')
if (step === undefined) {
  console.log(transpile(parse(lex(program))))
} else if (step === 'print') {
  console.log(program)
} else if (step === 'lex') {
  console.log(...lex(program))
} else if (step === 'parse') {
  console.log(...parse(lex(program)))
}
