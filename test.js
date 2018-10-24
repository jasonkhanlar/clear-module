import test from 'ava';
import m from '.';

test('clearModule()', t => {
	const id = './fixture';
	t.is(require(id)(), 1);
	t.is(require(id)(), 2);
	m(id);
	t.is(require(id)(), 1);
});

test('clearModule("fixture", {children: true})', t => {
	const id = './fixture';
	t.is(require(id)(), 1);
	t.is(require(id)(), 2);
	m(id);
	t.is(require(id)(), 1);

	const path = require('path');
	const resolveFrom = require('resolve-from');
	const callerPath = require('caller-path');
	const id2 = 'request';
	const id2Path = resolveFrom(path.dirname(callerPath()), id2);
	const id2Dir = path.dirname(id2Path);
    console.log(id2Dir);
	const scriptsCachedBeforeRequire = Object.keys(require.cache).length; // 5
	require('request');
	const scriptsCachedAfterRequire = Object.keys(require.cache).length; // 176
	console.log(scriptsCachedBeforeRequire);
	require(id2)();
	console.log(scriptsCachedAfterRequire);
	t.is(require(id)(), 13);
	//'/home/ryzen/Downloads/git/clear-module/test/node_modules/extend/index.js'
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
