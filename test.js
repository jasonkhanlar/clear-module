import test from 'ava';
import m from '.';

test('clearModule()', t => {
	const id = './fixture';
	t.is(require(id)(), 1);
	t.is(require(id)(), 2);
	m(id);
	t.is(require(id)(), 1);
});

test('clearModule("fixture", { children: true })', t => {
	console.log('what is t.is', t.is);
	console.log('what is t.is.toString', t.is.toString());
	console.log('what is m.toString', m.toString());
	const id = './fixturefail';
    // What does this do?
	t.is(require(id)(), 1);
    // What does this do?
	t.is(require(id)(), 2);
	m(id, { children: true });
    // What does this do?
	t.is(require(id)(), 1);
});

test('clearModule.all()', t => {
	t.true(Object.keys(require.cache).length > 0);
	m.all();
	t.is(Object.keys(require.cache).length, 0);
});

test('clearModule.match()', t => {
	const id = './fixture';
	const match = './fixture-match';
	t.is(require(id)(), 1);
	t.is(require(match)(), 1);
	m.match(/match/);
	t.is(require(id)(), 2);
	t.is(require(match)(), 1);
});
