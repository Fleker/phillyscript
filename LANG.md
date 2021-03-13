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
