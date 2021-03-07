# Execute transpiler for file
node dist/pst.js ./demo.phl > demo.ts 
./node_modules/.bin/tsc demo.ts
# Should get a demo.js
node demo.js
