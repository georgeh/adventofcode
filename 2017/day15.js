var DIVISOR = 2147483647;
var generator = function (factor) { return function (seed) { return factor * seed % DIVISOR; }; };
var digitsToCompare = function (n) { return n % 65536; };
var isPair = function (a, b) { return digitsToCompare(a) === digitsToCompare(b); };
var genA = generator(16807);
var genB = generator(48271);
var seedA = 65, seedB = 8921;
_a = [873, 583], seedA = _a[0], seedB = _a[1];
var pairs = 0;
var cycles = 5;
cycles = 40000000;
for (var i = 0; i < cycles; i++) {
    _b = [genA(seedA), genB(seedB)], seedA = _b[0], seedB = _b[1];
    if (isPair(seedA, seedB)) {
        pairs++;
    }
}
console.log(pairs);
// 1223 too high
var part2Generator = function (check, factor) {
    var gen = generator(factor);
    return function (seed) {
        var value = gen(seed);
        while (0 !== (value % check)) {
            value = gen(value);
        }
        return value;
    };
};
pairs = 0;
cycles = 1100;
_c = [65, 8921], seedA = _c[0], seedB = _c[1];
cycles = 5000000;
_d = [873, 583], seedA = _d[0], seedB = _d[1];
var gen2A = part2Generator(4, 16807);
var gen2B = part2Generator(8, 48271);
for (var i = 0; i < cycles; i++) {
    _e = [gen2A(seedA), gen2B(seedB)], seedA = _e[0], seedB = _e[1];
    if (isPair(seedA, seedB)) {
        pairs++;
    }
}
console.log(pairs);
var _a, _b, _c, _d, _e;
// 71 wrong 
