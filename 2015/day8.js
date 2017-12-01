module.exports = [
    function(input) {
        var counts = input.map((l) => l.split(''))
            .reduce(characterCounter, { literal: 0, parsed: 0});
        
        return counts.literal - counts.parsed;
    },
    function(input) {
        var counts = input.map((l) => l.split(''))
            .reduce(stringEscaper, { literal: 0, escaped: 0});
        
        return counts.escaped - counts.literal;
    }
];

function characterCounter(counts, line) {
    var char, 
        literal = line.length, 
        parsed = 0;
        
    // console.log(line.join(''));
    while ((line.length > 0) && (char = line.shift())) {
        if ('"' === char) {
            continue;
        }
        
        if (isEscape(char)) {
            char = line.shift();
            if ('x' === char) {
                line.shift();
                line.shift();
            }
        }
        
        parsed++;
    }
    // console.log({literal: literal, parsed: parsed});
    
    return {
        literal: literal + counts.literal, 
        parsed: parsed + counts.parsed 
    };
}

function isEscape(char) {
    return '\\' === char;
}

function stringEscaper(counts, line) {
    var char,
        escaped = '"',
        literal = line.length;
    
    // console.log(line.join(''));
    while ((line.length > 0) && (char = line.shift())) {
        if ('"' === char || '\\' == char) {
            escaped = escaped + '\\';
        }
        escaped = escaped + char;
    }
    // console.log(escaped);
    // console.log({literal: literal, escaped: escaped.length});
    return {
        literal: literal + counts.literal, 
        escaped: escaped.length + counts.escaped 
    };
}