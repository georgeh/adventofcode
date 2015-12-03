var R = require('ramda');
var readline = require('readline');

var compare = function(a, b) { 
    return a - b; 
}

var measurements = R.compose(R.sort(compare), R.map(parseInt), R.split('x'));

function packageArea(small, medium, large) {
    var sides = [(small * medium), (medium * large), (large * small)];
    var extra = small * medium;
    var area = (R.sum(sides) * 2) + extra;
    return area;
}

function ribbonLength(small, medium, large) {
    var wrap = small + small + medium + medium;
    var bow = small * medium * large;
    return wrap + bow;
}

var sumDimensions = R.compose(R.sum, R.map(R.apply(packageArea)));
var sumRibbon = R.compose(R.sum, R.map(R.apply(ribbonLength)));

var input = [];

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function (line) {
    input.push(line);
});

rl.on('close', function() {
    var sortedDimensions = input.map(measurements);
    console.log("Total square footage:" + sumDimensions(sortedDimensions));
    console.log("Total ribbon length: " + sumRibbon(sortedDimensions));
})
