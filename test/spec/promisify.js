import { promisify } from '../../';
import test from 'ava';

test('promisify(fn): callback called on success', t => {
    const feedUnicorn = (unicorn, rainbow, callback) => callback(null, `${unicorn} ate the whole ${rainbow}!`);
    const feedUnicornAsync = promisify(feedUnicorn);

    return feedUnicornAsync('kip', 'purple and blue')
    .then(result => t.is(result, 'kip ate the whole purple and blue!'));
});

test('promisify(fn): callback called on failure', t => {
    const feedUnicorn = (unicorn, rainbow, callback) =>
        callback(new Error('UnicornNotHungry: time until meal time: 1h12'));
    const feedUnicornAsync = promisify(feedUnicorn);

    return t.throws(
        feedUnicornAsync('kip', 'purple and blue').then(() => t.fail('should not have failed')),
        'UnicornNotHungry: time until meal time: 1h12'
    );
});

test('promisify(fn): callback throws', t => {
    const feedUnicorn = () => { throw new Error('Unicorns do not exist :"('); };
    const feedUnicornAsync = promisify(feedUnicorn);

    return t.throws(
        feedUnicornAsync('kip', 'purple and blue').then(() => t.fail('should not have failed')),
        'Unicorns do not exist :"('
    );
});
