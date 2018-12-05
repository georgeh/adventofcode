const { readFileSync } = require( 'fs' );
let input = 'dabAcCaCBAcCcaDA';
input = readFileSync( 'input-05', 'utf8' );

input = input.split( '' );

const reacts = ( a, b ) => ( a !== b && a.toUpperCase() == b.toUpperCase() );

function nextUnitIndex( polymer, idx ) {
	for ( i = idx; i < polymer.length; i++ ) {
		if ( '#' !== polymer[i] ) {
			return i;
		}
	}
}

function react( polymer ) {
	let reacting = true;
	let newPolymer = polymer.slice();
	while ( reacting ) {
		reacting = false;
		// Array.slice() is slowwwww, sped this up from 1m30s to 0m30s by not making new arrays
		// for ( i = 0; i < newPolymer.length - 1; i++ ) {
		// 	if ( reacts( newPolymer[ i ], newPolymer[ i + 1 ] ) ) {
		// 		newPolymer = newPolymer.slice( 0, i ).concat( newPolymer.slice( i + 2 ) );
		// 		reacting = true;
		// 	}
		// }
		for ( i = 0; i < newPolymer.length; i++ ) {
			let unitAidx = nextUnitIndex( newPolymer, i ),
				unitBidx = nextUnitIndex( newPolymer, unitAidx + 1 );

			// console.log( i, unitAidx, unitBidx );

			if ( ! unitBidx ) {
				break;
			}

			if ( reacts( newPolymer[ unitAidx ], newPolymer[ unitBidx ] ) ) {
				newPolymer[ unitAidx ] = '#';
				newPolymer[ unitBidx ] = '#';
				reacting = true;
			}
			i = unitBidx - 1;
		}
		// console.log( newPolymer.join( '' ), reacting );
	}
	return newPolymer.filter( u => u !== '#' );
}

const part1 = react( input );

// console.log( input.join( '' ) );
console.log( 'Part 1:', part1.length );

function uniqueUnits( polymer ) {
	const seen = new Map();
	polymer.forEach( u => seen.set( u.toUpperCase(), true) );
	return Array.from( seen.keys() );
}

const removeUnits = ( p ) => ( u ) => p.filter( l => l.toUpperCase() != u );

console.log( 'Part 2:',
	uniqueUnits( input )
	.map( removeUnits( input ) )
	.map( react )
	.map( p => p.length )
	.reduce( ( a, b ) => Math.min( a, b ) )
)
