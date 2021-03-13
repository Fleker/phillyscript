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

## Classes

[ ] Property constructors

```
jawn a := Bird({
    property: 'Demo'
})
```

## Execution Flow

[ ] Define execution blocks without function syntax

```
jawn y := {
    return 1
}
```

## Mathematic operators

[ ] Tilde estimate operator
[ ] Factorial operator
[ ] Maybe function
[ ] Array arithmetic
[ ] Integer/Remainder division
[ ] Magnitude greater/less-than operator
[ ] Updated bit-shift (>>> and <<<)
[ ] Supported ≠ syntax
[ ] Improved power syntax

```
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
