const buffer = [ 0 ];
let pos = 0;

function step( steps ) {
	return ( 1 + pos + steps ) % buffer.length;
}

function insert( value ) {
	buffer.splice( pos + 1, 0, value );
}

let part2answer = undefined;

for ( let i = 1; i < 50000000; i++ ) {
	if ( i <= 2017 ) {
		insert( i );
	} else {
		// Array.push is basically O(1) while Array.splice is O(n)
		// we don't care about actually inserting the numbers after 2017
		// as long as we store the value after 0
		buffer.push( undefined );
	}

	if ( i == 2017 ) {
		console.log( 'Part 1', buffer[ pos + 2 ] );
	}

	if ( pos == 0 ) {
		part2answer = i;
	}

	pos = step( 359 );
}

console.log( 'Part 2', part2answer );