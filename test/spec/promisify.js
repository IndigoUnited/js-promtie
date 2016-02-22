import { promisify } from '../../';
import test from 'ava';

test('promisify(fn): callback called on success', t => {
    const feedUnicornAsync = promisify(feedUnicorn);

    function feedUnicorn(unicorn, rainbow, callback) {
        // FIXME For some reason this is failing in ava/lib/beautify-stack.js:15:62
        // callback(null, `${unicorn} ate the whole ${rainbow}!`);
        callback(null, unicorn + ' ate the whole ' + rainbow);
    }

    return feedUnicornAsync('kip', 'purple and blue')
    .then((result) => t.is(result, 'kip ate the whole purple and blue'));
});

test('promisify(fn): callback called on failure', t => {
    const feedUnicornAsync = promisify(feedUnicorn);

    function feedUnicorn(unicorn, rainbow, callback) {
        callback(new Error('UnicornNotHungry: time until meal time: 1h12'));
    }

    return t.throws(
        feedUnicornAsync('kip', 'purple and blue').then(() => t.fail('should not have failed')),
        'UnicornNotHungry: time until meal time: 1h12'
    );
});

test('promisify(fn): callback throws', t => {
    const feedUnicornAsync = promisify(feedUnicorn);

    function feedUnicorn() {
        throw new Error('Unicorns do not exist :"(');
    }

    return t.throws(
        feedUnicornAsync('kip', 'purple and blue').then(() => t.fail('should not have failed')),
        'Unicorns do not exist :"('
    );
});
