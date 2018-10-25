import test from 'ava';
import m from '.';

test('clearModule()', t => {
	const id = './fixture';
	t.is(require(id)(), 1);
	t.is(require(id)(), 2);
	m(id);
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

test('clearModule("fixture", {children: true})', t => {
	// First empty all cache
	m.all();

	const scriptsCachedBeforeRequire = Object.keys(require.cache).length; // 5
	const path = require('path');
	const id1 = 'resolve-from';
	const resolveFrom = require(id1);
	const id2 = 'caller-path';
	const callerPath = require(id2);
	const id1Path = resolveFrom(path.dirname(callerPath()), id1);
	const id1Dir = path.dirname(id1Path);
	const id2Path = resolveFrom(path.dirname(callerPath()), id2);
	const id2Dir = path.dirname(id2Path);
	console.log(id1Dir);
	console.log(id2Dir);
	const scriptsCachedAfterRequire = Object.keys(require.cache).length; // 176
	console.log(scriptsCachedBeforeRequire);
	console.log(scriptsCachedAfterRequire);
	t.is(require(id)(), 13);
});

