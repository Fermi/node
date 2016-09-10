'use strict';
var common = require('../common');
var assert = require('assert');

var spawn = require('child_process').spawn;

var cat = spawn(common.isWindows ? 'more' : 'cat');
cat.stdin.write('hello');
cat.stdin.write(' ');
cat.stdin.write('world');

assert.ok(cat.stdin.writable);
assert.ok(!cat.stdin.readable);

cat.stdin.end();

var response = '';

cat.stdout.setEncoding('utf8');
cat.stdout.on('data', function(chunk) {
  console.log('stdout: ' + chunk);
  response += chunk;
});

cat.stdout.on('end', common.mustCall(function() {}));

cat.stderr.on('data', common.fail);

cat.stderr.on('end', common.mustCall(function() {}));

cat.on('exit', common.mustCall(function(status) {
  assert.strictEqual(0, status);
}));

cat.on('close', common.mustCall(function() {
  if (common.isWindows) {
    assert.equal('hello world\r\n', response);
  } else {
    assert.equal('hello world', response);
  }
}));
