import { values } from '../../';
import test from 'ava';

test('values(object)', (t) => {
    const input = {
        key1: 'value1',
        key2: Promise.resolve('value2'),
        key3: Promise.resolve('value3'),
        key4: 'value4',
    };

    return values(input)
    .then((result) => {
        t.same(result, {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
            key4: 'value4',
        });
    });
});

test('values(fn)', (t) => {
    const input = {
        key1: 'value1',
        key2: Promise.resolve('value2'),
        key3: Promise.resolve('value3'),
        key4: 'value4',
    };

    return Promise.resolve(input)
    .then(values((result) => {
        t.same(result, {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
            key4: 'value4',
        });
    }));
});

test('values(object): deal with promise rejection', (t) => {
    const input = {
        key1: 'value1',
        key2: Promise.resolve('value2'),
        key3: Promise.reject(new Error('error: value3')),
        key4: 'value4',
    };

    return t.throws(values(input), 'error: value3');
});

test('values(fn): deal with promise rejection', (t) => {
    const input = {
        key1: 'value1',
        key2: Promise.resolve('value2'),
        key3: Promise.reject(new Error('error: value3')),
        key4: 'value4',
    };

    return t.throws(Promise.resolve(input)
    .then(values((result) => {
        t.same(result, {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
            key4: 'value4',
        });
    })), 'error: value3');
});
