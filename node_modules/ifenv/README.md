# ifenv
`ifenv` is a tiny preprocessor for JavaScript loosely modelled after C. It can be used on its own or as a webpack loader. Its main purpose is to remove content from source files based on environment variables.

## directives
### \#ifenv

`// #ifenv NAME`

Will copy all consecutive lines until encountering `#endif` only if `NAME` is set in your environment. Will only check if the variable is set and not the value.

Consider the following input:

```javascript
doSomething();
// #ifenv DEV
console.log('did something...');
// #endif
doSomethingElse();
```

Which if `DEV` is set, produces the following output:

```javascript
doSomething();
console.log('did something...');
doSomethingElse();
```

Otherwise:

```javascript
doSomething();
doSomethingElse();
```

## usage

Install the package using

```
npm install ifenv
```

### webpack

After installation, you can just add it as a loader within your webpack config:

```
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['ifenv']
      }
    ]
  }
```
