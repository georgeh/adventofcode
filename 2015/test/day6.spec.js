var assert = require('chai').assert,
    day6 = require('../day6');

describe('day 6', function() {
    var part1 = day6[0];
    describe('part 1', function() {
        it('turn on 0,0 through 999,999 would turn on (or leave on) every light', function() {
            assert.equal(1000000, part1(['turn on 0,0 through 999,999']));
        });
        
        it('toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off', function() {
            assert.equal(999000, part1([
                'turn on 0,0 through 999,999', 
                'toggle 0,0 through 999,0'
            ]));
            
            assert.equal(1000, part1(['toggle 0,0 through 999,0']));
        });
        
        it('turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights', function() {
            assert.equal(999996, part1([
                'turn on 0,0 through 999,999', 
                'turn off 499,499 through 500,500'
            ]));
            
            assert.equal(2, part1([
                'turn on 499,499 through 499,502', 
                'turn off 499,499 through 500,500'
            ]));
            
            assert.equal(0, part1(['turn off 499,499 through 500,500']));
        });
        
        it('turn on 0,0 through 0,0 should turn on 1 light', function() {
            assert.equal(1, part1(['turn on 0,0 through 0,0']));
            
            assert.equal(9, part1(['turn on 0,0 through 2,2']));
        });
        
        it('turn on 0,0 through 1,0 should turn on 2 lights', function() {
            assert.equal(2, part1(['turn on 0,0 through 1,0']));
            
            assert.equal(0, part1(['turn on 0,0 through 0,0', 'toggle 0,0 through 0,0']));
            assert.equal(0, part1(['turn on 0,0 through 5,5', 'toggle 0,0 through 5,5']));
        });
    });
    
    var part2 = day6[1];
    describe('part 2', function() {
        it('turn on 0,0 through 0,0 would increase the total brightness by 1', function() {
            assert.equal(1, part2(['turn on 0,0 through 0,0']));
        });
        
        it('toggle 0,0 through 999,999 would increase the total brightness by 2000000', function() {
            assert.equal(2000000, part2(['toggle 0,0 through 999,999']));
        });
    })
})