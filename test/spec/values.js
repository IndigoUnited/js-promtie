import { values } from '../../';
import Promise from '../util/promise';
import test from 'ava';

test('values(object)', t =>
    values({
        key1: 'value1',
        key2: Promise.resolve('value2'),
        key3: Promise.resolve('value3'),
        key4: 'value4',
    })
    .then(result => t.deepEqual(result, {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
        key4: 'value4',
    }))
);

test('values(object): deal with not native promises', t =>
    values({
        key1: 'value1',
        key2: { then: (cb) => cb('value2') },
        key3: Promise.resolve('value3'),
        key4: 'value4',
    })
    .then(result => t.deepEqual(result, {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
        key4: 'value4',
    }))
);

test('values(fn)', t =>
    Promise.resolve({
        key1: 'value1',
        key2: Promise.resolve('value2'),
        key3: Promise.resolve('value3'),
        key4: 'value4',
    })
    .then(values(result => t.deepEqual(result, {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
        key4: 'value4',
    })))
);

test('values(object): deal with promise rejection', t =>
    t.throws(values({
        key1: 'value1',
        key2: Promise.resolve('value2'),
        key3: Promise.reject(new Error('error: value3')),
        key4: 'value4',
    }), 'error: value3')
);

test('values(fn): deal with promise rejection', t =>
    t.throws(Promise.resolve({
        key1: 'value1',
        key2: Promise.resolve('value2'),
        key3: Promise.reject(new Error('error: value3')),
        key4: 'value4',
    }).then(values(() => t.fail('expected to fail'))), 'error: value3')
);
