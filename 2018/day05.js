const { readFileSync } = require( 'fs' );
let input = 'dabAcCaCBAcCcaDA';
input = readFileSync( 'input-05', 'utf8' );

input = input.split( '' );

const reacts = ( a, b ) => ( a !== b && a.toUpperCase() == b.toUpperCase() );

function nextUnitIndex( polymer, idx ) {
	for ( let i = idx; i < polymer.length; i++ ) {
		if ( '#' !== polymer[i] ) {
			return i;
		}
	}
	return -1;
}

function prevUnitIndex( polymer, idx ) {
	for ( let i = idx; i > 0; i-- ) {
		if ( '#' !== polymer[i] ) {
			return i;
		}
	}
	return 0;
}

function react( polymer ) {
	let newPolymer = polymer.slice();
	let i = 0, j = 1;
	while ( i != -1 && j != -1 ) {
		if ( reacts( newPolymer[ i ], newPolymer[ j ] ) ) {
			newPolymer[ i ] = '#';
			newPolymer[ j ] = '#';
			j = nextUnitIndex( newPolymer, j + 1 );
			i = prevUnitIndex( newPolymer, i - 1 );
		} else {
			i = nextUnitIndex( newPolymer, i + 1 );
			j = nextUnitIndex( newPolymer, i + 1 );
		}
	}

	return newPolymer.filter( u => u !== '#' );
}

const part1 = react( input );

// console.log( input.join( '' ) );
console.log( 'Part 1:', part1.length );

function uniqueUnits( polymer ) {
	const seen = new Set();
	polymer.forEach( u => seen.add( u.toUpperCase() ) );
	return Array.from( seen.keys() );
}

const removeUnits = ( p ) => ( u ) => p.filter( l => l.toUpperCase() != u );

console.log( 'Part 2:',
	uniqueUnits( part1 )
	.map( removeUnits( input ) )
	.map( react )
	.map( p => p.length )
	.reduce( ( a, b ) => Math.min( a, b ) )
)
