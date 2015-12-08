var R = require('ramda');

var firstAnswer;
module.exports = [
    function(input) {
        module.exports.wires = input.reduce(parseLine, {});
        firstAnswer = module.exports.wires.a();
        return firstAnswer;
    },
    function(input) {
        module.exports.wires = input.reduce(parseLine, {});
        module.exports.wires.b = literal(firstAnswer);
        return module.exports.wires.a && module.exports.wires.a();
    }
];

function parseLine(wires, line) {
    var commandParts = line.split(' -> ');
    var command = commandParts[0], 
        dest = commandParts[1];
    wires[dest] = R.memoize(assignInput(wires, command));
    return wires;
}

function assignInput(wires, command) {
    var tokens = command.split(' ');
    var wireGet = R.curry(lookup)(wires);
    
    if ('AND' === tokens[1]) {
        var firstArg;
        if (/\d+/.test(tokens[0])) {
            firstArg = literal(parseInt(tokens[0], 10));
        } else {
            firstArg = wireGet(tokens[0]);
        }
        
        return and(firstArg, wireGet(tokens[2]));
    }
    
    if ('OR' === tokens[1]) {
        return or(wireGet(tokens[0]), wireGet(tokens[2]));
    }
    
    if ('LSHIFT' === tokens[1]) {
        return lshift(wireGet(tokens[0]), parseInt(tokens[2], 10));
    }
    
    if ('RSHIFT' === tokens[1]) {
        return rshift(wireGet(tokens[0]), parseInt(tokens[2], 10));
    }
    
    if ('NOT' === tokens[0]) {
        return not(wireGet(tokens[1]));
    }
    
    if (/^\d+$/.test(command)) {
        return literal(parseInt(command, 10));
    } else {
        return wireGet(command);
    }
    
    throw Error('Unknown command: ' + command);
}

function lookup(wires, a) {
    return function innerLookup() {
        return wires[a]();
    }
}

function literal(a) {
    return function innerLiteral() {
        return a;
    }
}

function and(a, b) {
    return function innerAnd() {
        return a() & b();
    }
}

function or(a, b) {
    return function innerOr() {
        return a() | b();
    }
}

function lshift(a, n) {
    return function innerLshift() {
        return a() << n;
    }
}

function rshift(a, n) {
    return function innerRshift() {
        return a() >> n;
    }
}

var TO_32BIT = 65535
function not(a) {
    return function innerNot() {
        return (~a()) & TO_32BIT;
    }
}