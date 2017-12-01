module.exports = [
    function(input) {
        return input.reduce((count, word) => count + (isNice(word)? 1 : 0), 0);
    },
    function(input) {
        return input.reduce((count, word) => count + (isNicer(word)? 1 : 0), 0);
    },
]

function isVowel(letter) {
    switch (letter) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
            return true;
        default:
            return false;
    }
}

function forbiddenPair(letters) {
    switch(letters) {
        case 'ab':
        case 'cd':
        case 'pq':
        case 'xy':
            return true;
        default:
            return false;
    }
}

function isNice(word) {
    var vowelCount = 0,
        doubleLetter = false;
        
    for (var i = 0; i < word.length; i++) {
        if (isVowel(word[i])) vowelCount++;
        if (!doubleLetter && word[i] === word[i-1]) doubleLetter = true;
        if (forbiddenPair(word[i - 1] + word[i])) return false;
    }
    
    return (vowelCount >= 3 && doubleLetter);
}

function isNicer(word) {
    return /(\w\w).*\1/.test(word) && /(\w)\w\1/.test(word); 
}