var readline = require('readline');
var day = require('./day' + process.argv[2]);
var input = [];

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function (line) {
    input.push(line);
});

rl.on('close', function() {

    console.log("Part 1: " + day[0](input));
    console.log("Part 2: " + day[1](input));
})