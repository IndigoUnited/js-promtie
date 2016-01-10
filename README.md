# node-promise-utils

## Installation

`$ npm install promise-utils`


## Usage

### Promisification
#### promisify(fn)
#### promisifyAll(object)
#### nodeify(fn)

### Collections
#### each(array, fn)
#### map(array, fn, options)
#### filter(array, fn)
#### reduce(array, fn)
#### sort(array, fn)
#### settle(array, fn)
#### props(object, fn) (find a better name)
#### spread(fn)

#### Others
### retry(fn, options)
### thenIf(predicate|predicateFn, fn)
### catchIf(predicate|predicateFn, fn)
### delay(n)
### timeout(n)

## Tests

`$ npm test`


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
