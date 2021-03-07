// Phillyscript Transpiler
// CLI

import {transpile, parse, lex} from './philly'
import * as fs from 'fs'

// Read args
const args = process.argv.slice(2)
const filename = args[0]
const program = fs.readFileSync(filename, 'utf8')
console.log(transpile(parse(lex(program))))
