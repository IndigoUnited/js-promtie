import { thenIf } from '../../';
import test from 'ava';

test('thenIf(predicate, fn): predicate true', (t) => {
    const input = [1, 2, 3, 4];

    return Promise.all([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(thenIf(input.length === 4, (result) => {
        t.same(result, input);
        return 'thenIf predicate was true';
    }))
    .then((result) => t.is(result, 'thenIf predicate was true'));
});

test('thenIf(predicate, fn): predicate true; fn returns promise', (t) => {
    const input = [1, 2, 3, 4];

    return Promise.all([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(thenIf(input.length === 4, (result) => {
        t.same(result, input);
        return Promise.resolve('thenIf predicate was true');
    }))
    .then((result) => t.is(result, 'thenIf predicate was true'));
});

test('thenIf(predicateFn, fn): predicate true; predicate is a function', (t) => {
    const input = [1, 2, 3, 4];

    return Promise.all([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(thenIf((result) => result.length === 4, (result) => {
        t.same(result, input);
        return 'thenIf predicate was true';
    }))
    .then((result) => t.is(result, 'thenIf predicate was true'));
});


test('thenIf(predicateFn, fn): predicate true; predicate is a function; fn returns promise', (t) => {
    const input = [1, 2, 3, 4];

    return Promise.all([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(thenIf((result) => result.length === 4, (result) => {
        t.same(result, input);
        return Promise.resolve('thenIf predicate was true');
    }))
    .then((result) => t.is(result, 'thenIf predicate was true'));
});
