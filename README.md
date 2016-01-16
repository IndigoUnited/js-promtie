# Promtie

 > Neatly dress up your native promises with simple but powerful utils.

Unlike `Bluebird` or `Q`, promtie aims to be used with native promises. It it very easy to start a chain of promises or to intersect a set of promises with an each or map iteration.


**Example:**

```javascript
import { each, map } from 'promtie';

// Greet all the unicorns at the same time
map(['unicorn1', 'unicorn2', Promise.resolve('fancy unicorn')], greetUnicorns)
// Feed each unicorn one at a time
.then(each(feedUnicorns));
```

You can also use each util separately without requiring the whole library.

**Example:**

```javascript
import { each, map } from 'promtie';

// or using require

var each = require('promtie/lib/each');
```

This module includes the most common utils needed to work with collections of promises: each, map, filter, reduce; as well as other common patterns when using promises: delay, timeout, retry, spread, catchIf, ...

## Installation

`$ npm install --save promtie`

## Usage

### Collections

#### `each([array], fn) -> Promise | Function`

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

#### `map([array], fn, options) -> Promise | Function`

Iterates over the `array` and calls `fn` on each value (promise that resolves to a value) in parallel.
Concurrency can be controlled with `options.concurrency`.

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

#### `filter([array], fn, options) -> Promise | Function`

Iterates over the `array` and filters out the array values if they do not pass the function test.
Concurrency can be controlled with `options.concurrency`.

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

#### `reduce([array], fn, [initialValue]) -> Promise | Function`

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

#### `values(object|fn) -> Promise | Function`

Resolve the values of an object, whether they are promises or not, fulfilled.
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

`values(fn) -> Function`: Alternatively, pass a function that will receive the resolved object values in favor of returning a function that takes the object instead. The handle function return value will be the fulfillment value. **Example:**

```javascript
import { values } from 'promtie';

Promise.resolve({
    key1: 'value1',
    key2: Promise.resolve('value2'),
    key3: Promise.resolve('value3'),
    key4: 'value4',
})
.then(values(result => console.log('got value 3:', result.key3))) // 'value3'
```

### Promisification
#### `promisify(fn) -> Function`
#### `promisifyAll(object) -> Object`

### Others
#### `attempt(fn) -> Promise`

Start a chain of promises while mapping synchronous exceptions to promise rejections.
**Example:**

```javascript
import { readFileSync } from 'fs';
import { attempt } from 'promtie';

attempt(() => JSON.parse(readFileSync('unicorn.json').toString()))
.then(unicorn => console.log('Unicorn\'s name is:', unicorn.name), err => {
    // Catch synchronous errors such as ENOENT or SyntaxError (for invalid json)
    console.error('Failed to read unicorn:', err);
    console.error(err.stack);
});
```

#### `spread([array], fn, [ctx]) -> Function | Promise`

Spreads array values to the arguments of `fn`.
You can pass a context object to bind to the function call.
**Example:**

```javascript
import { spread } from 'promtie';

Promise.resolve([fetchData(), fetchMetadata(), 'v0.2.1'])
.then(spread((data, meta, version) => {
    console.log('got data:', data);
    console.log('meta:', meta);
    console.log('version:', version);
}));
```

`spread(array, fn, [ctx]) -> Promise`: Alternatively, if you pass an array as the first argument, `spread` returns a promise.
**Example:**

```javascript
import { spread } from 'promtie';

spread([fetchData(), fetchMetadata(), 'v0.2.1'], (data, meta, version) => {
    console.log('got data:', data);
    console.log('meta:', meta);
    console.log('version:', version);

    return data;
})
.then(normalizeData);
```

#### `retry(fn, options)`

#### `delay(n, [fn]) -> Function | Promise`

Delays the execution of the next promise by `n` milliseconds.

**Example:**

```javascript
import { map, delay } from 'promtie';

map(users, user => {
    return fetchActivity(user.id)
    .then(delay(250)); // Wait 250 milliseconds in between requests
});

// Also works with promise failures
map(users, user => {
    return fetchActivity(user.id)
    .then(null, delay(250)); // Wait 250 milliseconds in between requests on failures
});
```

`delay(n, fn) -> Promise`: Alternatively, if you also pass a function, `delay` returns a promise.
Useful for starting a promise chain with a delay.
**Example:**

```javascript
import { delay } from 'promtie';

// Wait 200 milliseconds to start the server
delay(200, server.listen)
.then(app => {
    console.log('app listening on ${app.host}');
});
```

#### `timeout(n, fn | promise) -> Promise`

Do not wait more than `n` milliseconds for the operation to finish.
If Timeout is reached, the promise is rejected with `timeout.TimeoutError`.

**Example:**

```javascript
import { timeout, map, catchIf } from 'promtie';

getTopUsers()
.then(users => {
    // Wait no more than 10 seconds. Notifying users is not critical.
    return timeout(10e3, map(users, user => notifyUser(user.id)));
})
.catch(catchIf(timeout.isTimeoutError, err => {
    console.log(err, 'Notifying users took too long. Moving on...');
}));
```

#### `timeout.TimeoutError`

TimeoutError error object.
**Example:**

```javascript
import { timeout, catchIf } from 'promtie';

timeout(10e3, fetchNotifications(userId))
// If this error is a timeout error, translate error message
.catch(catchIf(timeout.TimeoutError, () => throw new Error('Fetching user notifications timed out.')));
```

#### `catchIf(predicateFn, fn) -> Function`

Returns a function that will handle an error if it passes the predicate function test.
If the predicate returns false, the error is propagated and `fn` is not called.
Useful for treating different cases of errors without cluttering the code with switch cases/ifs.

**Example:**

```javascript
import { catchIf } from 'promtie';

db.getUser(userId)
.catch(catchIf(isNotFoundError, err => {
    console.error(err, 'User with id ${userId} does not exist.');

    throw err;
}))
.catch(catchIf(isConnectionTimeoutError, err => {
    console.error(err, 'Service Unavailable. Please try again later.');

    throw err;
}));
// If the error thrown was not a NotFoundError or a ConnectionTimeoutError
// the error continues to be thrown.
```

#### `nodeify([fn]) -> Function`

Returns a function that calls the callback function with the resulting value or the error. If the callback throws an error, it will be globally thrown.
If no callback is provided, the returned function simply returns the value or continues to propagate the error.
Useful for APIs that still want to support callback style.

**Example:**

```javascript
import { nodeify } from 'promtie';

// Function can be used with callback style or promise style
function fetch(cb) {
    return Promise.resolve(1)
    .then(nodeify(cb), nodeify(cb));
}

// Or
function fetch(cb) {
    return Promise.resolve(1)
    .then(nodeify(cb))
    .catch(nodeify(cb));
}
```

#### `through(fn) -> Function`

Excecute `fn` while passing the resolved value or rejection through, regardless of the promise's resolved value or rejection.
The promise fulfillment value is maintained and the rejection error is propagated as well.
**Example:**

```javascript
import { through } from 'promtie';

db.getUser(userId)
// Close connection to db whether or not the promise was successful or not
.then(through(db.connection.close), through(db.connection.close));

// Or
db.getUser(userId)
// Close connection to db whether or not the promise was successful or not
.then(through(db.connection.close))
.catch(through(db.connection.close));
```


## Tests

`$ npm test`


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
