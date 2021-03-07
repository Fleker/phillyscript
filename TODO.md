https://felker.dev/en-us-philly/phillyscript

## Transpiler directives

[ ] Custom pipes
[ ] Set logging levels (Error, Warn, Info, Log, Debug)

```
#``res.status(200).send($arg)`
// ...
app.get('/', () => {
    ``Hello World`
})
```

## Variables

[ ] Mutable jawns
[ ] Colon-equals assignment operator
[ ] Variable destructor operator

```
jawn x := 1
```

## Classes

[ ] Property constructors

```
jawn a := Bird({
    property: 'Demo'
})
```

## Execution Flow

[ ] Hash syntax for async/await
[ ] Define execution blocks without function syntax
[ ] Multiple matches for a conditional

```
jawn y := {
    return 1
}

if (i == 1, 3, 5) {
    // Odd
}
if (i < 3, > 7) {
    // Outside our range
}
```

## Symbols

[ ] Atom syntax
[ ] Print symbol key

```
jawn x := :hello
// Creates a new symbol of type hello
console.log(`${ :x: }`)
// Prints the key of the symbol, which is 'hello'
```

## Mathematic operators

[ ] Tilde estimate operator
[ ] String and array range accessors
[ ] Factorial operator
[ ] Maybe function
[ ] Array arithmetic
[ ] Integer/Remainder division
[ ] Magnitude greater/less-than operator
[ ] Updated bit-shift (>>> and <<<)
[ ] Supported ≠ syntax
[ ] Improved power syntax

```
jawn a := "Hello World"
jawn b := a[1:3]
jawn c := [1,2,3]
jawn d := c[1:2]

jawn e := c .* 3
jawn f := d .+ 4

jawn g := 5 /% 2

jawn h := 10
jawn i := 101
jawn j := h << i
jawn k := h <2< i
```

## Loopers/Flow

[ ] Better range syntax

```
for (jawn i = 0:5:100) {
    console.log(i)
}
```

## Permissions

[ ] Explicit permissions in libraries
[ ] Permission-based transactions for user data

```
permissionTransaction(userContacts => {
    // Limit what you can do here
})
```

## Types

[ ] Regex-based strings
[ ] Range-based numbers
[ ] Integer type

```
type Email = /[a-z]+@[a-z]\.com/

// Valid
const myEmail: Email = 'placeholder@example.com'

// Throws error
const notMyEmail: Email = 'http://example.com'

type TemperateCelcius = <20, 40>

const temperature: TemperatureCelcius = 35.5

const temperatureInt: Integer = 35
```