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
jawn y := 2

if (y == 2, 4) {
    // Returns true if y is 2 OR y is 4
}
```

This can also be written with two different checks.

```
jawn z := 4

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

#### Estimations

Estimations, two values that would use a wavy equal sign, can be implemented
with a tilde or the `≈` character.

```
jawn x := 5
if (x ≈ 6) {
    // x is not close to 6
}
if (x ~10~ 6) {
    // We divide each side by the modifier and compare.
    // x and 6 are close relative to 10.
}
```

#### Random

The `maybe` keyword is used to randomly return true for a given weight, with
the default being half of the time.

```
if (maybe) {
    console.log('This returns true half of the time')
}

if (maybe(0.25)) {
    console.log('This returns true a quarter of the time')
}
```

#### Magnitude Comparisons

The number *101* is much greater than *10*. To represent that, mathematics
often uses the double less-than/greater-than symbol:

```
// Prints 'true'
console.log(101 >> 10)
```

By default, this is true if the operand is an order of magnitude larger (x10).
However, it can be customized by appending another operand in the middle:

```
// Prints 'false'
console.log(60 <4< 20)
```

## Operations

### Division with Remainder

The division-remainder operator can be used to return an array with the first
element being the whole number and the second element being the remainder.

```
jawn x := 14
// Prints '[3, 2]'
console.log(x /% 4)
```

### Factorial

Appending the exclamation mark after a number will compute its factorial.

```
// Prints 120
console.log(5!)
```

### Bit-Shifting

As the double-carat syntax is now used for magnitude comparisons, the bit-shift
operation now requires a dot in front:

```
// Prints '32'
console.log(2 .<< 4)
```

### Exponentials

Raising a number to another number uses the mathematical carat symbol, to
suggest superscript:

```
// Prints '49'
console.log(7^2)
```

### XOR

As the standard symbol for XOR is now used for exponentials, a new syntax
with the character `x` and the straight pipe `|` are joined together:

```
// Prints '1'
console.log(3 x| 2)
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
