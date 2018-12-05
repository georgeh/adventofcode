const { readFileSync } = require( 'fs' );

// const input = readFileSync( 'day19-sample.txt', 'utf8' ).split( '\n' ).map( l => l.split( '' ) );
const input = readFileSync( 'day19-input.txt', 'utf8' ).split( '\n' ).map( l => l.split( '' ) );

const UP = 1, RIGHT = 2, DOWN = 3, LEFT = 4;

// input[y][x] = '*'
// console.log( input.map( l => l.join( '' ) ).join( '\n') );
// console.log( [ x, y ] );

function next( x, y, dir ) {
	let nextX = x,
		nextY = y;

	switch ( dir ) {
		case UP:
			nextY = y - 1;
			break;
		case RIGHT:
			nextX = x + 1;
			break;
		case DOWN:
			nextY = y + 1;
			break;
		case LEFT:
			nextX = x - 1;
	}

	return [ nextX, nextY ];
}

function changeDir( x, y, dir ) {
	if ( UP == dir || DOWN == dir ) {
		if ( input[ y ][ x - 1 ] != ' ' ) {
			return LEFT;
		} else {
			return RIGHT;
		}
	} else {
		if ( input[ y - 1] && input[ y - 1][ x ] != ' ' ) {
			return UP;
		} else {
			return DOWN;
		}
	}
}



const LETTERS = 'PYFGCRLAOEUIDHTNQJKXBMVZ';

let y = 0,
    x = input[ 0 ].indexOf( '|' ),
    dir = DOWN;

let theEnd = false,
    str = '';

let calls = 0, delay = 500;
function display( x, y ) {
	const copy = input.map( r => r.slice() );
	copy[ y ][ x ] = '*';
	setTimeout( () => {
		console.log( '\033[2J' );
		console.log( copy.map( l => l.join( '' ) ).join( '\n') );
		console.log( { x, y } );
		console.log( str );
	}, calls * delay );
}

while ( ! theEnd ) {
	// display( x, y );

	const char = input[ y ][ x ];
	if ( ' ' == char ) {
		break;
	}

	calls++
	if ( LETTERS.indexOf( char ) != -1 ) {
		str = str.concat( char );
	}

	if ( '+' == char ) {
		dir = changeDir( x, y, dir );
	}

	[ x, y ] = next( x, y, dir );
}

console.log( str, calls );