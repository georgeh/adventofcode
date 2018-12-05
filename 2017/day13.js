"use strict";
exports.__esModule = true;
var input = "0: 4\n1: 2\n2: 3\n4: 4\n6: 6\n8: 5\n10: 6\n12: 6\n14: 6\n16: 12\n18: 8\n20: 9\n22: 8\n24: 8\n26: 8\n28: 8\n30: 12\n32: 10\n34: 8\n36: 12\n38: 10\n40: 12\n42: 12\n44: 12\n46: 12\n48: 12\n50: 14\n52: 14\n54: 12\n56: 12\n58: 14\n60: 14\n62: 14\n66: 14\n68: 14\n70: 14\n72: 14\n74: 14\n78: 18\n80: 14\n82: 14\n88: 18\n92: 17";
// input = `0: 3
// 1: 2
// 4: 4
// 6: 4`;
var pairs = input.split('\n')
    .map(function (l) { return l.split(': '); })
    .map(function (_a) {
    var r = _a[0], d = _a[1];
    return ([parseInt(r), parseInt(d)]);
});
var Direction;
(function (Direction) {
    Direction["FORWARD"] = "F";
    Direction["BACK"] = "B";
})(Direction || (Direction = {}));
var Scanner = /** @class */ (function () {
    function Scanner(range) {
        this.pos = 0;
        this.dir = Direction.FORWARD;
        this.range = range;
    }
    Scanner.prototype.step = function () {
        if (0 === this.pos && Direction.BACK === this.dir) {
            this.dir = Direction.FORWARD;
        }
        if ((this.range - 1) === this.pos && Direction.FORWARD === this.dir) {
            this.dir = Direction.BACK;
        }
        (Direction.FORWARD === this.dir) ? this.pos++ : this.pos--;
    };
    return Scanner;
}());
var newFirewall = function () { return pairs.reduce(function (fwall, _a) {
    var depth = _a[0], range = _a[1];
    fwall[depth] = new Scanner(range);
    return fwall;
}, []); };
var firewall1 = newFirewall();
// console.log( firewall )
// const s = new Scanner( 5 );
// for ( let i = 0; i < 10; i++ ) {
// 	console.log( i, s.pos )
// 	s.step()
// }
// console.log( s );
var hits = [];
for (var depth = 0; depth < firewall1.length; depth++) {
    if (firewall1[depth] && 0 === firewall1[depth].pos) {
        hits.push(depth);
    }
    firewall1.forEach(function (s) { return s && s.step(); });
}
// console.log( hits );
var score = hits.reduce(function (score, depth) { return (score + (firewall1[depth].range * depth)); }, 0);
console.log(score);
var wait = 0;
var Packet = /** @class */ (function () {
    function Packet(wait) {
        this.wait = wait;
        this.depth = 0;
    }
    return Packet;
}());
var packets = [];
var firewall2 = newFirewall();
var packetAtEnd = function () { return packets.find(function (p) { return p.depth == firewall2.length; }); };
var packetNotDetected = function (p) { return !firewall2[p.depth] || firewall2[p.depth].pos !== 0; };
while (!packetAtEnd()) {
    packets = packets.concat(new Packet(wait)) // add new packet
        .filter(packetNotDetected);
    packets.forEach(function (p) { return p.depth++; });
    firewall2.forEach(function (s) { return s && s.step(); });
    wait++;
}
console.log(packetAtEnd().wait);
