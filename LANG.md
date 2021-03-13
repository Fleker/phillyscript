# PhillyScript Reference Manual

This is a detailed manual for all PhillyScript features. Note that in its
current state, the language does not support the vast majority of TypeScript
features as those lex rules were just not implemented yet.

## Variable declarations

Variables are called `jawn`.

These jawns are immutable:

```
jawn x := 1
jawn y := 1
```

Adding an asterisk after `jawn` declares it to be mutable.

```
jawn* z := 3
```

### Symbols

[Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
are designed to be unique for each creation, even if the input parameter is
the same.

Rather than using the Symbol static methods, you can use the colon syntax:

```
// Create a new symbol with value "hello"
jawn a := :hello
// Print out the value of the symbol
console.log(:a:)
```

## Function declarations

### Zero-param functions

To reduce boilerplate, functions with zero parameters can omit the parenthesis.

```
fun simple {
    return 5
}
```

### Async/Await

To reduce boilerplate, the hash operator now signifies that an operation or
function is asynchronous.

```
fun# asyncFunction {
    jawn x := #asyncOperation()
    return x
}
```

## Class declarations

Classes are known as 'bouls' in PhillyScript. Declaring one is otherwise
the same.

For good code style, classes must start with a capital letter.

```
boul Bird {

}
```

### Instantiation

If there are no parameters in the class constructor, you can use the simpler
`@` syntax

```
jawn duck @ Bird
```

### Extending

The leftwards arrow syntax is used to state the inheritance between classes.

```
boul Bird {}

boul Duck <- Bird {}

boul Mallard <- Duck {}
```

### Instanceof

The `instanceof` operation has been replaced with the tilde operator.

```
boul Bird {}

boul Duck <- Bird {}

jawn z @ Bird

// Returns true
z ~ Bird

// Returns false
z ~ Duck
```

## Flow Control

### Conditionals

For a given variable, a condition can be created with two distinct checks
without having to formally create two OR checks.

```
jawn y = 2

if (y == 2, 4) {
    // Returns true if y is 2 OR y is 4
}
```

This can also be written with two different checks.

```
jawn z = 4

if (z > 0, z < 10) {
    // z is within our desired range
}
```

To simplify syntax, you can use the `≠` character to represent not-equals.

```
if (x ≠ 2) {
    // X is not 2
}
```

## Arrays

### Range Selection

For both strings and arrays, ranges can be selected in a way similar to the
Python syntax:

```
jawn b := 'Hello World'
// Prints 'Hello'
console.log(b[0:5])
```

### Arithmetic

Taking inspiration from Matlab, a dot-symbol syntax can be used to apply the
mathematics operation across every element of an array.

```
jawn c := [0, 1, 2, 3]
// Prints '[2, 3, 4, 5]`
console.log(c .+ 2)
// Prints '[0, 5, 10, 15]'
console.log(c .* 5)
```
