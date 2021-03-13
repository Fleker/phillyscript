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
