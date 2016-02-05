import { whilst } from '../../';
import test from 'ava';

test('whilst(fn)', (t) => {
    let count = 0;

    setTimeout(() => {
        count += 1;
    }, 20);

    return whilst(() => {
        return Promise.resolve(count <= 3);
    }, () => {
        t.ok(count <= 3);

        return count;
    })
    .then(count => t.ok(count > 3));
});
