var assert = require('chai').assert,
    day5 = require('../day5');

describe('day 5', function() {
    describe('part 1', function() {
        it('ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter (...dd...), and none of the disallowed substrings.', function() {
            assert.equal(1, day5[0](['ugknbfddgicrmopn']));
        });
        
        it('aaa is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap.', function() {
            assert.equal(1, day5[0](['aaa']));
        });
        
        it('jchzalrnumimnmhp is naughty because it has no double letter.', function() {
            assert.equal(0, day5[0](['jchzalrnumimnmhp']));
        });
        
        it('haegwjzuvuyypxyu is naughty because it contains the string xy.', function() {
            assert.equal(0, day5[0](['haegwjzuvuyypxyu']));
        });
        
        it('dvszwmarrgswjxmb is naughty because it contains only one vowel.', function() {
            assert.equal(0, day5[0](['dvszwmarrgswjxmb']));
        });
    });
    
    describe('part 2', function() {
        it('qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that repeats with exactly one letter between them (zxz).', function() {
            assert.equal(1, day5[1](['qjhvhtzxzqqjkmpb']));
        });
        
        it('xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between, even though the letters used by each rule overlap.', function() {
            assert.equal(1, day5[1](['xxyxx']));
        });
        
        it('uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between them.', function() {
            assert.equal(0, day5[1](['uurcxstgmygtbstg']));
        });
        it('ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair that appears twice.', function() {
            assert.equal(0, day5[1](['ieodomkazucvgmuy']));
        });
    });
})