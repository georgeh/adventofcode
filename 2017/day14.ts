let input = `flqrgnkx`;
input = 'uugsqrei';

const hexChars = '0123456789abcdef';
const toHex = ( num: number ): string => {
	const ones = num % 16;
	const sixteens = Math.floor( num / 16 );
	return hexChars[sixteens] + hexChars[ones];
}

const toASCII = ( c ): number => c.charCodeAt( 0 );
const toBinary = ( n ): string => n.toString( 2 );

function knotHash( input: string ) {
	function makeList( len = 256 ): Array<number> {
		const list = [];
		for ( let i = 0; i < len; i++ ) {
			list[ i ] = i;
		}
		return list;
	}

	const lengths = input.split( '' ).map( toASCII ).concat( [ 17, 31, 73, 47, 23 ] )

	const listLength = 256

	let pos = 0;
	let skipSize = 0;
	let list = makeList( listLength );

	function round( list: Array<number>, lengths: Array<number> ): Array<number> {
		lengths.forEach( ( length ) => {
			const listCopy = list.slice();
			for ( let i = 0; i < ( length / 2 ); i++ ) {
				const a = ( pos + i + list.length ) % list.length;
				const b = ( pos + length - 1 - i + list.length ) % list.length;
				if ( a === b ) continue
				list[ a ] = listCopy[ b ]
				list[ b ] = listCopy[ a ]
			}
			pos = ( pos + length + skipSize ) % list.length;
			skipSize++;
		} )
		return list;
	}

	for ( let i = 0; i < 64; i++ ) {
		list = round( list, lengths )
	}

	function denseHasher( list: Array<number>, start: number ): number {
		let hash = list[start];
		for ( let i = start + 1; i < start + 16; i++ ) {
			hash = hash ^ list[ i ];
		}
		return hash;
	}

	let denseHash: Array<number> = [];
	for ( let i = 0; i <= 255; i += 16 ) {
		denseHash.push( denseHasher( list, i) );
	}

	return( denseHash );
}

interface String { repeat(count: number): string }
const zeroPad = ( str: string ): string => '0'.repeat( 4 - str.length ) + str;

// console.log( knotHash( 'flqrgnkx-0' ).map( toHex ).join('').split('').map( c => parseInt( c, 16) ).map( toBinary ).map( zeroPad ).join( '' ) )

function row( input: string, i: number ): string {
	return knotHash( input + '-' + i )
		.map( toHex )
		.join('')
		.split('')
		.map( c => parseInt( c, 16) )
		.map( toBinary )
		.map( zeroPad )
		.join( '' );
}

const grid: string[] = [];
for ( let i = 0; i < 128; i++ ) {
	grid[ i ] = row( input, i );
}

const count = grid
	.map( r => r.match( /1/g ).length )
	.reduce( ( sum, num ) => ( sum + num ), 0 )

console.log( count );

const regionGrid: ( number | boolean )[][] = grid.map( r => r.split( '' ).map( c => !! parseInt( c ) ) )

// const regionGrid = [
// 	[ true, true, false, true, false, true, false ,false ],
// 	[ false, true, false, true, false, true, false ,true ],
// 	[ false, false, false, false, true, false, true, false ],
// ]

const neigbors = ( x: number, y: number ) => {
	return [
		[ x - 1, y ],
		[ x, y + 1 ],
		[ x + 1, y ],
		[ x, y - 1 ],
	]
		.filter( ( [ newX, newY ] ) => newX >= 0 && newY >= 0 )
		.filter( ( [ newX, newY ] ) => newX < 128 && newY < 128 )
}

const shouldMark = ( cell: number|boolean ) => cell && 'boolean' === typeof cell;

function markRegion( name: number, x: number, y: number ) {
	regionGrid[y][x] = name;

	neigbors( x, y )
		.filter( ( [ newX, newY ] ) => shouldMark( regionGrid[ newY ][ newX ] ) )
		.forEach( ( [ newX, newY ] ) => markRegion( name, newX, newY ) )
}

let region = 0;

for ( let y = 0; y < regionGrid.length; y++ ) {
	for ( let x = 0; x < regionGrid[ y ].length; x++ ) {
		if ( shouldMark( regionGrid[ y ][ x ] ) ) {
			region++;
			markRegion( region, x, y );
		}
	}
}

console.log( region )