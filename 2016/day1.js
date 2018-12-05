let input = `R1, R1, R3, R1, R1, L2, R5, L2, R5, R1, R4, L2, R3, L3, R4, L5, R4, R4, R1, L5, L4, R5, R3, L1, R4, R3, L2, L1, R3, L4, R3, L2, R5, R190, R3, R5, L5, L1, R54, L3, L4, L1, R4, R1, R3, L1, L1, R2, L2, R2, R5, L3, R4, R76, L3, R4, R191, R5, R5, L5, L4, L5, L3, R1, R3, R2, L2, L2, L4, L5, L4, R5, R4, R4, R2, R3, R4, L3, L2, R5, R3, L2, L1, R2, L3, R2, L1, L1, R1, L3, R5, L5, L1, L2, R5, R3, L3, R3, R5, R2, R5, R5, L5, L5, R2, L3, L5, L2, L1, R2, R2, L2, R2, L3, L2, R3, L5, R4, L4, L5, R3, L4, R1, R3, R2, R4, L2, L3, R2, L5, R5, R4, L2, R4, L1, L3, L1, L3, R1, R2, R1, L5, R5, R3, L3, L3, L2, R4, R2, L5, L1, L1, L5, L4, L1, L1, R1`;
// input = `R8, R4, R4, R8`;

const steps = input.split( ', ' ).map( s => {
	const [ dir, ...dist ] = s.split( '' );
	return [ dir, parseInt( dist.join( '' ) ) ];
} )
const UP = 'UP', DOWN = 'DOWN', LEFT = 'LEFT', RIGHT = 'RIGHT';
let [ x, y ] = [ 0, 0 ];
let direction = UP;

const dirs = [ UP, RIGHT, DOWN, LEFT ];
const turns = { 'R': 1, 'L': -1 };

function turn( turnDir, currDir ) {
	const i = dirs.indexOf( currDir );
	return dirs[ ( i + turns[ turnDir ] + dirs.length ) % dirs.length ];
}

const blocks = ( [ x, y ] ) => Math.abs( x ) + Math.abs( y )

const seenMap = { '0|0': true };
let doubleVisit;

function see( [ x, y] ) {
	// console.log( 'seeing', [x,y] );
	if ( doubleVisit ) return;

	const seenKey = [ x, y ].join( '|' );
	if ( seenMap[seenKey] ) {
		doubleVisit = [ x, y];
	}
	seenMap[seenKey] = true;
}

const moves = {
	UP: ( [ x, y ], dist ) => {
		if ( ! doubleVisit ) {
			for ( let i = 1; i <= dist; i++ ) {
				see( [ x, y + i ] );
			}
		}
		return [ x, y + dist ]
	},
	RIGHT: ( [ x, y ], dist ) => {
		if ( ! doubleVisit ) {
			for ( let i = 1; i <= dist; i++ ) {
				see( [ x + i, y ] );
			}
		}
		return [ x + dist, y ]
	},
	DOWN: ( [ x, y ], dist ) => {
		if ( ! doubleVisit ) {
			for ( let i = 1; i <= dist; i++ ) {
				see( [ x, y - i ] );
			}
		}
		return [ x, y - dist ]
	},
	LEFT: ( [ x, y ], dist ) => {
		if ( ! doubleVisit ) {
			for ( let i = 1; i <= dist; i++ ) {
				see( [ x - i, y ] );
			}
		}
		return [ x - dist, y ]
	}
}
const move = ( [ x, y ], dir, dist ) => moves[ dir ]( [ x, y ], dist )

const state = steps.reduce( ( prevState, [ turnDir, dist ] ) => {
	const direction = turn( turnDir, prevState.direction );
	const [ x, y ] = move( [ prevState.x, prevState.y ], direction, parseInt( dist ) );
	return { direction, x, y }
}, {
	direction: UP,
	x: 0,
	y: 0
} );

// console.log( seenMap );

// console.log( state );
console.log( blocks( [ state.x, state.y ] ) );
console.log( blocks( doubleVisit ) );

// 282 too high
// 20
// 88

// Day 2
// 250 too high