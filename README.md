# Promtie 👔

> Neatly dress up your native promises with simple but powerful utils.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/promtie
[downloads-image]:http://img.shields.io/npm/dm/promtie.svg?style=flat-square
[npm-image]:http://img.shields.io/npm/v/promtie.svg?style=flat-square
[travis-url]:https://travis-ci.org/IndigoUnited/js-promtie
[travis-image]:http://img.shields.io/travis/IndigoUnited/js-promtie/master.svg?style=flat-square
[coveralls-url]:https://coveralls.io/r/IndigoUnited/js-promtie
[coveralls-image]:https://img.shields.io/coveralls/IndigoUnited/js-promtie/master.svg?style=flat-square
[david-dm-url]:https://david-dm.org/IndigoUnited/js-promtie
[david-dm-image]:https://img.shields.io/david/IndigoUnited/js-promtie.svg?style=flat-square
[david-dm-dev-url]:https://david-dm.org/IndigoUnited/js-promtie?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/IndigoUnited/js-promtie.svg?style=flat-square


Unlike `Bluebird` or `Q`, promtie aims to be used with native promises by making it very easy to start a chain of promises or to intersect a set of promises with, for example, an each or map iteration.

`Promtie` is just as powerful as `Bluebird` or `Q`, but instead of forcing the usage of custom Promise instances, with `Promtie` you can use native promises.
This module includes the most common utils needed to work with collections of promises: `each`, `map`, `filter`, `reduce`, ...; as well as other common patterns when using promises: `delay`, `timeout`, `retry`, `spread`, `catchIf`, ...

```javascript
import promtie from 'promtie';

// Greet all the unicorns at the same time
promtie.map([Promise.resolve('fancy unicorn'), 'fancy unicorn nº 2'], greetUnicorns)
// Feed each unicorn one at a time
.then(promtie.each(feedUnicorns));
```

You can also use each util separately without requiring the whole module. This is the recomended way to use it.

```javascript
import { each, map } from 'promtie';

// using require
var each = require('promtie/each');
```


## Installation

`$ npm install --save promtie`

## API Reference

 - [each](#each)
 - [map](#map)
 - [filter](#filter)
 - [reduce](#reduce)
 - [values](#values)
 - [settle](#settle)
 - [attempt](#attempt)
 - [spread](#spread)
 - [retry](#retry)
 - [delay](#delay)
 - [timeout](#timeout)
 - [catchIf](#catchif)
 - [whilst](#whilst)
 - [times](#times)
 - [through](#through)
 - [nodeify](#nodeify)
 - [promisify](#promisify)
 - [promisifyAll](#promisifyall)

### each

`each(array, fn) -> Promise`:
Iterates over the `array` and calls `fn` on each value (or promise that resolves to a value) in series.

```javascript
import { each } from 'promtie';

each([1, 2, 3], (value, index, length) => requestPage(value))
.then(pages => console.log('pages', pages) );
```

`each(fn) -> Function`:
If you omit the array, `each` returns a function that takes the array instead as an argument.

```javascript
import { each } from 'promtie';

Promise.resolve([1, 2, 3])
.then(each((value, index, length) => requestPage(value)))
.then(pages => console.log('pages', pages));
```

### map

`map(array, fn, options) -> Promise`:
Iterates over the `array` and calls `fn` on each value (promise that resolves to a value) in parallel.
Concurrency can be controlled with `options.concurrency`.

```javascript
import { map } from 'promtie';

map([1, 2, 3], (value, index, length) => requestPage(value), { concurrency: 2 })
.then(pages => console.log('pages', pages) );
```

`map(fn, options) -> Function`:
If you omit the array, `map` returns a function that takes the array instead as an argument.

```javascript
import { map } from 'promtie';

Promise.resolve([1, 2, 3])
.then(map((value, index, length) => requestPage(value), { concurrency: 2 }))
.then(pages => console.log('pages', pages));
```

### filter

`filter(array, fn, [options]) -> Promise`:
Iterates over the `array` and filters out the array values if they do not pass the function test.
Concurrency can be controlled with `options.concurrency`

```javascript
import { filter } from 'promtie';

filter([1, 2, 3], (value, index, length) => isOdd(value), { concurrency: 2 })
.then(pages => console.log('odd pages', pages));
```

`filter(fn, [options]) -> Function`:
If you omit the array, `filter` returns a function that takes the array instead as an argument.

```javascript
import { filter } from 'promtie';

Promise.resolve([1, 2, 3])
.then(filter((value, index, length) => isOdd(value), { concurrency: 2 }))
.then(pages => console.log('odd pages', pages) );
```

### reduce

`reduce(array, fn, [initialValue]) -> Promise`:
Iterates over the array and calls fn on each value and accumulates the result to reduce it to a single value.

```javascript
import { reduce } from 'promtie';

reduce([1, 2, 3], (acc, value, index, length) => acc + value, 0)
.then(total => console.log('total sum:', total));
```

`reduce(fn, [initialValue]) -> Function`:
If you omit the array, `reduce` returns a function that takes the array instead as an argument.

```javascript
import { reduce } from 'promtie';

Promise.resolve([1, 2, 3])
.then(reduce((acc, value, index, length) => acc + value, 0))
.then(total => console.log('total sum:', total));
```

### values

`values(object) -> Promise`:
Resolve the values of an object, whether they are promises or not, fulfilled.

```javascript
import { values } from 'promtie';

values({
    key1: 'value1',
    key2: Promise.resolve('value2'),
    key3: Promise.resolve('value3'),
    key4: 'value4',
})
.then(result => console.log(`got value 3: ${result.key3}`)); // 'value3'
```

`values(fn) -> Function`:
If you omit the object, `values` returns a function that takes the object instead as an argument.

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

### settle

`settle(array) -> Promise`:
Wait until all the promises in the array settle, and then resolve a promise with all the fulfilment values or rejections.

```javascript
import got from 'got';
import { settle } from 'promtie';

settle(['https://google.com', 'https://baboom.com'].map(got))
.then(settledRequests => {
    settledRequests.forEach(settledRequest => {
        settledRequest.fulfilled && console.log('Request successfull. Response body:', settledRequest.value.body);

        settledRequest.rejected && console.error('Request failed. Response error:', settledRequest.reason);
    })
});
```

### attempt

`attempt(fn) -> Promise`:
Start a chain of promises while mapping synchronous exceptions to promise rejections.

```javascript
import { readFileSync } from 'fs';
import { attempt } from 'promtie';

attempt(() => JSON.parse(readFileSync('unicorn.json').toString()))
.then(unicorn => console.log(`Unicorn\'s name is: ${unicorn.name}`), err => {
    // Catch synchronous errors such as ENOENT or SyntaxError (for invalid json)
    console.error('Failed to read unicorn:', err);
    console.error(err.stack);
});
```

### spread

`spread(array, fn) -> Promise`:
Spreads array values to the arguments of `fn`.

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

`spread(array, fn) -> Function`:
If you omit the array, `spread` returns a function that takes the array instead as an argument.

```javascript
import { spread } from 'promtie';

Promise.resolve([fetchData(), fetchMetadata(), 'v0.2.1'])
.then(spread((data, meta, version) => {
    console.log('got data:', data);
    console.log('meta:', meta);
    console.log('version:', version);
}));
```

### retry

`retry(n, fn, [options]) -> Promise`:
Retry a function `n` times. Delay in between retries can be configured with `options.delay`.

```javascript
import { retry, catchIf } from 'promtie'

// Retry at most three times to connect to db if the connection is timing out.
retry(3, retryAgain => {
    return db.connect()
    .catch(catchIf(ConnectionTimeoutError, retryAgain));
}, { delay: 50 });
```

### delay

`delay(n) -> Function`:
Delays the execution of the next promise by `n` milliseconds.

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

`delay(n, fn) -> Promise`:
Alternatively, if you also pass a function, `delay` returns a promise.
Useful for starting a promise chain with a delay.

```javascript
import { delay } from 'promtie';

// Wait 200 milliseconds to start the server
delay(200, server.listen)
.then(app => {
    console.log('app listening on ${app.host}');
});
```

### timeout

`timeout(n, fn | promise) -> Promise`:
Do not wait more than `n` milliseconds for the operation to finish.
If Timeout is reached, the promise is rejected with `timeout.TimeoutError`.

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

### catchIf

`catchIf(predicateFn, fn) -> Function`:
Returns a function that will handle an error if it passes the predicate function test.
If the predicate returns false, the error is propagated and `fn` is not called.
Useful for treating different types of errors without cluttering the code with switch cases/ifs.

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

`catchIf(object, fn) -> Function`:
Alternatively, you can pass an object to be matched with error instance.

```javascript
import { catchIf } from 'promtie';

function NotFoundError() {}
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = function () {
    this.message = 'Not found';
    this.code = 'NOT_FOUND';
};

db.getUser(userId)
// If the error is an instance of NotFoundError
.catch(catchIf(NotFoundError, err => {
    console.error(err, 'User with id ${userId} does not exist.');

    throw err;
}));
```

### whilst

`whilst(conditionFn, fn, [options]) -> Promise`:
Whilst the `conditionFn` returns true, execute `fn`. `fn` and `conditionFn` can return a value or a promise. Delay in between iterations can be configured with `options.delay` (default is 0).

```javascript
import { whilst } from 'promtie';

whilst(
    () => db.getUser(userId).then(user => user.state !== 'ready'),
    () => notifyUser(userId, 'Waiting for user to be ready...')
), { delay: 150 });
```

### times

`times(n, fn) -> Promise`:
Execute `fn`, `n` times. The returned promise fulfills to the `n` results from each `fn` call.
`fn` calls are run in parallel.
Concurrency can be controlled with `options.concurrency`.

```javascript
import uuid from 'uuid';
import { times } from 'promtie';

times(15, i => {
    return db.set(`user!${i}`, {
        id: uuid(),
        name: `user ${i}`,
    });
}, { concurrency: 5 })
.then(users => console.log('15 users created', users));
```


### through

`through(fn) -> Function`:
Execute `fn` while passing the resolved value or rejection through, regardless of the promise's resolved value or rejection.
When used on both the fulfillment and rejection handlers, this is similar to the try/catch finally, meaning, regardless of the promise's end result, this code is executed.

```javascript
import { through } from 'promtie';

db.getUser(userId)
// Close connection to db whether the promise was fulfilled or not
.then(through(db.connection.close), through(db.connection.close));

// Or
db.getUser(userId)
// Close connection to db whether the promise was fulfilled or not
.then(through(db.connection.close))
.catch(through(db.connection.close));
```

### nodeify

`nodeify([fn]) -> Function`:
Returns a function that calls the callback function with the resulting value or the error. If the callback throws an error, it will be thrown to the global context.
If no callback is provided, the returned function simply returns the value or continues to propagate the error.
Useful for APIs that still want to support callback style.

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

### promisify

`promisify(fn) -> Function`:
Promisifies a callback style function.

```javascript
import { promisify } from 'promtie';

const feedUnicornAsync = promisify(feedUnicorn);

function feedUnicorn(unicorn, rainbow, callback) {
    console.log(`${unicorn} eats ${rainbow}`);
    callback(null, '~burp');
}

feedUnicornAsync(unicorn, 'morning rainbow')
.then(result => console.log('Unicorn fed:', result))
.catch(err => console.error('Failed to feed unicorn:', err));
```

### promisifyAll

`promisifyAll(object, [targetObject]) -> Object`:
Promisifies all the enumerable functions of an object, returning a new object, or assigning methods to the `targetObject`.
Methods that also have methods are recursively promisified.

```javascript
import { promisifyAll } from 'promtie';

const jeffy = promisifyAll({
    name: 'jeffy',
    run(callback) {
        callback(null, `${this.name} started to run`);
    },
});

jeffy.run().then(() => console.log(`${jeffy.name} stopped running`));
```

## Tests

`$ npm test`

## Contributing

Feel free to propose PRs for bug fixes, adding utils, etc.

## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
