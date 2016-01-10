# node-promise-utils

 > Small utilities to be used with native promises.

Unlike `Bluebird` or `Q`, <insert name here> aims to be used with native promises. You can use each util separately without requiring the whole library.

This module includes the most common utils needed to work with collections of promises (or values): each, map, filter, reduce, sort; as well as other common patterns when using promises: delay, timeout, retry, spread, thenIf, catchIf, ...

**Example:**
```javascript
import { each, map } from 'promise-utils';

// Request all the pages at the same time
map([1, 2, Promise.resolve(3)], requestPage)
// and render each one at a time
.then(each(renderPage));
```

## Installation

`$ npm install --save promise-utils`


## Usage

### Collections
#### each([array], fn) -> Promise | Function

Iterates over the `array` and calls `fn` on each value (promise that resolves to a value) in series.

**Example:**
```javascript
import { each } from 'promise-utils';

each([1, 2, 3], (value, index, length) => requestPage(value))
.then(pages => console.log('pages', pages) );
```

`each(fn) -> Function`: The array can be omitted in favor of returning an function that takes the array instead. **Example:**
```javascript
import { each } from 'promise-utils';

Promise.resolve([1, 2, 3])
.then(each((value, index, length) => requestPage(value)))
.then(pages => console.log('pages', pages));
```

#### map([array], fn, options) -> Promise | Function

Iterates over the `array` and calls `fn` on each value (promise that resolves to a value) in parallel.
Concurrency can be controller with `options.concurrency`.

**Example:**
```javascript
import { map } from 'promise-utils';

map([1, 2, 3], (value, index, length) => requestPage(value), { concurrency: 2 })
.then(pages => console.log('pages', pages) );
```

`map(fn, options) -> Function`: The array can be omitted in favor of returning an function that takes the array instead. **Example:**

```javascript
import { map } from 'promise-utils';

Promise.resolve([1, 2, 3])
.then(map((value, index, length) => requestPage(value), { concurrency: 2 }))
.then(pages => console.log('pages', pages));
```

#### filter(array, fn, options) -> Promise | Function

Iterates over the `array` and filters out the array values if they do not pass the function test.
Concurrency can be controller with `options.concurrency`.

**Example:**
```javascript
import { filter } from 'promise-utils';

filter([1, 2, 3], (value, index, length) => isOdd(value), { concurrency: 2 })
.then(pages => console.log('odd pages', pages));
```

`filter(fn, options) -> Function`: The array can be omitted in favor of returning an function that takes the array instead. **Example:**

```javascript
import { filter } from 'promise-utils';

Promise.resolve([1, 2, 3])
.then(filter((value, index, length) => isOdd(value), { concurrency: 2 }))
.then(pages => console.log('odd pages', pages) );
```

#### reduce(array, fn)
#### sort(array, fn)
#### settle(array, fn)
#### props(object, fn) (find a better name)

### Promisification
#### promisify(fn)
#### promisifyAll(object)
#### nodeify(fn)

### Others
#### spread(fn)
#### retry(fn, options)
#### thenIf(predicate|predicateFn, fn)
#### catchIf(predicate|predicateFn, fn)
#### delay(n)
#### timeout(n)

## Tests

`$ npm test`


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
