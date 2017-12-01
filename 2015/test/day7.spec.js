var assert = require('chai').assert,
    day7 = require('../day7');

describe.only('day 7', function() {
    var part1 = day7[0];
    describe('part 1', function() {
        it('should run the example', function() {
            part1([
                '123 -> x',
                '456 -> y',
                'x AND y -> d',
                'x OR y -> e',
                'x LSHIFT 2 -> f',
                'y RSHIFT 2 -> g',
                'NOT x -> h',
                'NOT y -> i'
            ]);
            
            assert.equal(123, day7.wires.x());
            assert.equal(456, day7.wires.y());
            assert.equal(72, day7.wires.d());
            assert.equal(507, day7.wires.e());
            assert.equal(492, day7.wires.f());
            assert.equal(114, day7.wires.g());
            assert.equal(65412, day7.wires.h());
            assert.equal(65079, day7.wires.i());
        })
    });
    
    var part2 = day7[1];
    describe('part 2', function() {

    })
})