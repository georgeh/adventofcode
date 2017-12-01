var crypto = require('crypto');

var input = 'iwrupvqb';
var zeros = 6;

var count = 0;
do {
    count++;
    var hash = crypto.createHash('sha1').update(input + count).digest('hex');
} while ('0'.repeat(zeros) !== hash.substring(0, zeros))

console.log(count);
console.log(hash);