// const input = `0	2	7	0`;
const input = `4	10	4	1	8	4	9	14	5	1	14	15	0	15	3	5`;

function highestIndex( banks ) {
	return banks.reduce( ( highest, current, index, banks ) => {
		if ( banks[highest] == current ) {
			return ( highest < current ) ? highest : current;
		}
		return ( banks[highest] > current ) ? highest : index;
	}, 0 );
}

function redistribute( banks ) {
	const newBanks = banks.slice();
	const highest = highestIndex( banks );
	const blocks = banks[ highest ];
	newBanks[ highest ] = 0;
	for ( let i = 1; i <= blocks; i++ ) {
		const target = ( highest + i ) % banks.length;
		newBanks[ target ]++;
	}
	return newBanks;
}

let steps = 0;

const seenBanks = {};
function see( banks ) {
	seenBanks[ banks.join( '|' ) ] = steps;
}

function seen( banks ) {
	return seenBanks[ banks.join( '|' ) ];
}

function output( banks ) {
	const out = banks.slice();
	const i = highestIndex( banks );
	out[ i ] = out[ i ].toString() + "*"
	console.log( steps + ":\t" + out.join( "\t" ) );
}

let banks = input.split( "\t" ).map( n => parseInt( n ) );
do {
	output( banks );
	see( banks );
	banks = redistribute( banks );
	steps++;
} while ( ! seen( banks ) )


output( banks );

console.log( steps );
console.log( steps - seen( banks ) );