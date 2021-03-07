# PhillyScript Reference Manual

This is a detailed manual for all PhillyScript features. Note that in its
current state, the language does not support the vast majority of TypeScript
features as those lex rules were just not implemented yet.

## Variable declarations

Variables are called `jawn`.

These jawns are immutable:

```
jawn x = 1
jawn y = 1
```

## Function declarations

### Zero-param functions

To reduce boilerplate, functions with zero parameters can omit the parenthesis.

```
fun simple {
    return 5
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
