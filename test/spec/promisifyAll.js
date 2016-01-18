import { promisifyAll } from '../../';
import Promise from '../util/promise';
import test from 'ava';

test('promisifyAll(object): object with own method', (t) => {
    const unicorn = promisifyAll({
        name: 'jeffy',
        run(callback) {
            callback(null, `${this.name} started to run`);
        },
        feed(rainbow, callback) {
            callback(new Error(`UnicornNotHungry: ${this.name} is not hungry ATM.`));
        },
    });

    t.true(unicorn.run() instanceof Promise);

    return unicorn.run()
    .then((result) => {
        t.is(result, 'jeffy started to run');

        return t.throws(unicorn.feed('blue and purple'), 'UnicornNotHungry: jeffy is not hungry ATM.');
    });
});

test('promisifyAll(object): object with prototype method', (t) => {
    let jeffy;

    function Unicorn(name) {
        this.name = name;
    }

    Unicorn.prototype.run = function (callback) {
        callback(null, `${this.name} started to run`);
    };
    Unicorn.prototype.feed = function (rainbow, callback) {
        callback(new Error(`UnicornNotHungry: ${this.name} is not hungry ATM.`));
    };

    jeffy = promisifyAll(new Unicorn('jeffy'));

    t.true(jeffy.run() instanceof Promise);

    return jeffy.run()
    .then((result) => {
        t.is(result, 'jeffy started to run');

        return t.throws(jeffy.feed('blue and purple'), 'UnicornNotHungry: jeffy is not hungry ATM.');
    });
});

test('promisifyAll(object): object with own method that also contains methods', (t) => {
    let unicorn = {
        name: 'jeffy',
        run(callback) {
            callback(null, `${this.name} started to run`);
        },
    };

    unicorn.run.slowly = function (callback) {
        callback(null, 'Running slowly');
    };

    unicorn = promisifyAll(unicorn);

    return unicorn.run.slowly()
    .then((result) => t.is(result, 'Running slowly'));
});

test('promisifyAll(object): object with prototype method that also contains methods', (t) => {
    let jeffy;

    function Unicorn(name) {
        this.name = name;
    }

    Unicorn.prototype.run = function (callback) {
        callback(null, `${this.name} started to run`);
    };

    jeffy = promisifyAll(new Unicorn('jeffy'));

    jeffy.run.slowly = function (callback) {
        callback(null, 'Running slowly');
    };

    jeffy = promisifyAll(jeffy);

    return jeffy.run.slowly()
    .then((result) => t.is(result, 'Running slowly'));
});
