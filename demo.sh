# Build transpiler
yarn build
node dist/philly.js > demo.ts 
./node_modules/.bin/tsc demo.ts
# Should get a demo.js
node demo.js
