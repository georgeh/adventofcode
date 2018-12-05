let input = `3,4,1,5`

function makeList( last = 255 ) {
	const list = [];
	for ( let i = 0; i <= last; i++ ) {
		list[ i ] = i;
	}
	return list;
}

let listLength = 4
input = `70,66,255,2,48,0,54,48,80,141,244,254,160,108,1,41`;
listLength = 255

let pos = 0;
let skipSize = 0;
let list = makeList( listLength );
let lengths = input.split( "," ).map( n => parseInt( n ) )

function knotHash( list, lengths ) {
	// console.log( list )
	lengths.forEach( ( length ) => {
		const listCopy = list.slice();
		// console.log( 'listCopy', listCopy )
		for ( let i = 0; i < ( length / 2 ); i++ ) {
			const a = ( pos + i + list.length ) % list.length;
			const b = ( pos + length - 1 - i + list.length ) % list.length;
			if ( a === b ) continue
			// console.log( 'Swapping', a, b )
			list[ a ] = listCopy[ b ]
			list[ b ] = listCopy[ a ]
			// console.log( list )
		}
		pos = ( pos + length + skipSize ) % list.length;
		// console.log( 'pos', pos )
		skipSize++;
		// console.log( list )
	} )
	return list;
}

list = knotHash( list, lengths );
console.log( list[ 0 ] * list[ 1 ] );

// 4692 too low

const toASCII = ( c ) => c.charCodeAt( 0 )
lengths = input.split( '' ).map( toASCII ).concat( [ 17, 31, 73, 47, 23 ] )
list = makeList( listLength );
pos = 0;
skipSize = 0;

for ( let i = 0; i < 64; i++ ) {
	list = knotHash( list, lengths )
}

function denseHasher( list, start ) {
	let hash = list[start];
	for ( i = start + 1; i < start + 16; i++ ) {
		hash = hash ^ list[i];
	}
	return hash;
}

// let sparseHash = [65 , 27 , 9 , 1 , 4 , 3 , 40 , 50 , 91 , 7 , 6 , 0 , 2 , 5 , 68 , 22];
// console.log( denseHasher( sparseHash, 0 ) );

let denseHash = [];
for ( let i = 0; i <= 255; i += 16 ) {
	denseHash.push( denseHasher( list, i) );
}

const hexChars = '0123456789abcdef';
const toHex = ( num ) => {
	const ones = num % 16;
	const sixteens = Math.floor( num / 16 );
	return hexChars[sixteens] + hexChars[ones];
}

// console.log( toHex( 255 ) );
// console.log( toHex( 0 ) );
// console.log( toHex( 16 ) );
// console.log( toHex( 17 ) );
// console.log( toHex( 15 ) );
// console.log( toHex( 10 ) );
// console.log( toHex( 128 ) );

console.log( denseHash.map( toHex ).join( '' ) );
