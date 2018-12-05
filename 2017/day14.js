var input = "flqrgnkx";
input = 'uugsqrei';
var hexChars = '0123456789abcdef';
var toHex = function (num) {
    var ones = num % 16;
    var sixteens = Math.floor(num / 16);
    return hexChars[sixteens] + hexChars[ones];
};
var toASCII = function (c) { return c.charCodeAt(0); };
var toBinary = function (n) { return n.toString(2); };
function knotHash(input) {
    function makeList(len) {
        if (len === void 0) { len = 256; }
        var list = [];
        for (var i = 0; i < len; i++) {
            list[i] = i;
        }
        return list;
    }
    var lengths = input.split('').map(toASCII).concat([17, 31, 73, 47, 23]);
    var listLength = 256;
    var pos = 0;
    var skipSize = 0;
    var list = makeList(listLength);
    function round(list, lengths) {
        lengths.forEach(function (length) {
            var listCopy = list.slice();
            for (var i = 0; i < (length / 2); i++) {
                var a = (pos + i + list.length) % list.length;
                var b = (pos + length - 1 - i + list.length) % list.length;
                if (a === b)
                    continue;
                list[a] = listCopy[b];
                list[b] = listCopy[a];
            }
            pos = (pos + length + skipSize) % list.length;
            skipSize++;
        });
        return list;
    }
    for (var i = 0; i < 64; i++) {
        list = round(list, lengths);
    }
    function denseHasher(list, start) {
        var hash = list[start];
        for (var i = start + 1; i < start + 16; i++) {
            hash = hash ^ list[i];
        }
        return hash;
    }
    var denseHash = [];
    for (var i = 0; i <= 255; i += 16) {
        denseHash.push(denseHasher(list, i));
    }
    return (denseHash);
}
var zeroPad = function (str) { return '0'.repeat(4 - str.length) + str; };
// console.log( knotHash( 'flqrgnkx-0' ).map( toHex ).join('').split('').map( c => parseInt( c, 16) ).map( toBinary ).map( zeroPad ).join( '' ) )
function row(input, i) {
    return knotHash(input + '-' + i)
        .map(toHex)
        .join('')
        .split('')
        .map(function (c) { return parseInt(c, 16); })
        .map(toBinary)
        .map(zeroPad)
        .join('');
}
var grid = [];
for (var i = 0; i < 128; i++) {
    grid[i] = row(input, i);
}
var count = grid
    .map(function (r) { return r.match(/1/g).length; })
    .reduce(function (sum, num) { return (sum + num); }, 0);
console.log(count);
var regionGrid = grid.map(function (r) { return r.split('').map(function (c) { return !!parseInt(c); }); });
// const regionGrid = [
// 	[ true, true, false, true, false, true, false ,false ],
// 	[ false, true, false, true, false, true, false ,true ],
// 	[ false, false, false, false, true, false, true, false ],
// ]
var neigbors = function (x, y) {
    return [
        [x - 1, y],
        [x, y + 1],
        [x + 1, y],
        [x, y - 1],
    ]
        .filter(function (_a) {
        var newX = _a[0], newY = _a[1];
        return newX >= 0 && newY >= 0;
    })
        .filter(function (_a) {
        var newX = _a[0], newY = _a[1];
        return newX < 128 && newY < 128;
    });
};
var shouldMark = function (cell) { return cell && 'boolean' === typeof cell; };
function markRegion(name, x, y) {
    regionGrid[y][x] = name;
    neigbors(x, y)
        .filter(function (_a) {
        var newX = _a[0], newY = _a[1];
        return shouldMark(regionGrid[newY][newX]);
    })
        .forEach(function (_a) {
        var newX = _a[0], newY = _a[1];
        return markRegion(name, newX, newY);
    });
}
var region = 0;
for (var y = 0; y < regionGrid.length; y++) {
    for (var x = 0; x < regionGrid[y].length; x++) {
        if (shouldMark(regionGrid[y][x])) {
            region++;
            markRegion(region, x, y);
        }
    }
}
console.log(region);
