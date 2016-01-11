# Promtie

 > Neatly dress up your native promises with simple and useful utils.

Unlike `Bluebird` or `Q`, promtie aims to be used with native promises. It it very easy to start a chain of operations or to intersect a set of operations with an each or map iteration.

You can also use each util separately without requiring the whole library.

This module includes the most common utils needed to work with collections of promises (or values): each, map, filter, reduce; as well as other common patterns when using promises: delay, timeout, retry, spread, catchIf, ...

**Example:**
```javascript
import { each, map } from 'promtie';

// Request all the pages at the same time
map([1, 2, Promise.resolve(3)], requestPage)
// and render each one at a time
.then(each(renderPage));
```

## Installation

`$ npm install --save promtie`


## Usage

### Collections
#### each([array], fn) -> Promise | Function

Iterates over the `array` and calls `fn` on each value (promise that resolves to a value) in series.

**Example:**
```javascript
import { each } from 'promtie';

each([1, 2, 3], (value, index, length) => requestPage(value))
.then(pages => console.log('pages', pages) );
```

`each(fn) -> Function`: The array can be omitted in favor of returning an function that takes the array instead. **Example:**
```javascript
import { each } from 'promtie';

Promise.resolve([1, 2, 3])
.then(each((value, index, length) => requestPage(value)))
.then(pages => console.log('pages', pages));
```

#### map([array], fn, options) -> Promise | Function

Iterates over the `array` and calls `fn` on each value (promise that resolves to a value) in parallel.
Concurrency can be controller with `options.concurrency`.

**Example:**
```javascript
import { map } from 'promtie';

map([1, 2, 3], (value, index, length) => requestPage(value), { concurrency: 2 })
.then(pages => console.log('pages', pages) );
```

`map(fn, options) -> Function`: The array can be omitted in favor of returning an function that takes the array instead. **Example:**

```javascript
import { map } from 'promtie';

Promise.resolve([1, 2, 3])
.then(map((value, index, length) => requestPage(value), { concurrency: 2 }))
.then(pages => console.log('pages', pages));
```

#### filter([array], fn, options) -> Promise | Function

Iterates over the `array` and filters out the array values if they do not pass the function test.
Concurrency can be controller with `options.concurrency`.

**Example:**
```javascript
import { filter } from 'promtie';

filter([1, 2, 3], (value, index, length) => isOdd(value), { concurrency: 2 })
.then(pages => console.log('odd pages', pages));
```

`filter(fn, options) -> Function`: The array can be omitted in favor of returning an function that takes the array instead. **Example:**

```javascript
import { filter } from 'promtie';

Promise.resolve([1, 2, 3])
.then(filter((value, index, length) => isOdd(value), { concurrency: 2 }))
.then(pages => console.log('odd pages', pages) );
```

#### reduce([array], fn, [initialValue]) -> Promise | Function

Iterates over the array and calls fn on each value and accumulates the result to reduce it to a single value.

**Example:**
```javascript
import { reduce } from 'promtie';

reduce([1, 2, 3], (acc, value, index, length) => acc + value, 0)
.then(total => console.log('total sum:', total));
```

`reduce(fn, [initialValue]) -> Function`: The array can be omitted in favor of returning an function that takes the array instead. **Example:**

```javascript
import { reduce } from 'promtie';

Promise.resolve([1, 2, 3])
.then(reduce((acc, value, index, length) => acc + value, 0))
.then(total => console.log('total sum:', total));
```

#### values(object)

Resolve the values of an object, whether they are promises or not.
**Example:**

```javascript
import { values } from 'promtie';

values({
    key1: 'value1',
    key2: Promise.resolve('value2'),
    key3: Promise.resolve('value3'),
    key4: 'value4',
})
.then(result => console.log('got value 3:', result.key3)); // 'value3'
```

### Promisification
#### promisify(fn)
#### promisifyAll(object)

### Others
#### spread(fn)
#### nodeify([fn]) -> Function

Returns a function that calls the callback function with the resulting value, ignoring the error.
If no callback is provided, the returned function simply returns the value.
Useful for APIs that still want to support callback style.

**Example:**

```javascript
import { nodeify } from 'promtie';

// Function can be used with callback style or promise style
function fetch(cb) {
    return Promise.resolve(1)
    .then(nodeify(cb), cb);
}
```

#### catchIf(predicateFn, fn) -> Function

Returns a function that will handle an error if it passes the predicate function test.
If the predicate returns false, the error is propagated.
Useful for treating different cases of errors without cluttering the code with switch cases/ifs.

**Example:**

```javascript
import { catchIf } from 'promtie';

db.getUser(userId)
.catch(catchIf(isNotFoundError, err => {
    log.error(err, 'User with id ${userId} does not exist.');

    throw err;
}))
.catch(catchIf(isConnectionTimeoutError, err => {
    log.error(err, 'Service Unavailable. Please try again later.');

    throw err;
}));
// If the error thrown was not a NotFoundError or a ConnectionTimeoutError
// the error continues to be thrown.

```

#### retry(fn, options)
#### delay(n)
#### timeout(n)

## Tests

`$ npm test`


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
