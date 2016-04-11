import { attempt } from '../../';
import test from 'ava';

test('attempt(fn)', t =>
    attempt(() => 'unicorn')
    .then((unicorn) => t.is(unicorn, 'unicorn'))
);

test('attempt(fn): deal with promise failure', t =>
    attempt(() => { throw new Error('Bad unicorn'); })
    .then(() => t.fail('Promise expected to reject'), err => t.truthy(err instanceof Error))
);
