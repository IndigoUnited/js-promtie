import { attempt } from '../../';
import test from 'ava';

test('attempt(fn)', t => {
    return attempt(() => {
        return 'unicorn';
    })
    .then((unicorn) => t.is(unicorn, 'unicorn'));
});

test('attempt(fn): deal with promise failure', t => {
    return attempt(() => {
        throw new Error('Bad unicorn');
    })
    .then(() => t.fail('Promise expected to reject'), (err) => {
        t.ok(err instanceof Error);
    });
});
