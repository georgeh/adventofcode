const DIVISOR = 2147483647;
const generator = ( factor: number ) => ( seed: number ) => factor * seed % DIVISOR;
const digitsToCompare = ( n: number ) => n % 65536
const isPair = ( a: number, b: number ) => digitsToCompare( a ) === digitsToCompare( b );

const genA = generator( 16807 );
const genB = generator( 48271 );

let seedA = 65,
	seedB = 8921;

[ seedA, seedB ] = [ 873, 583 ];
let pairs = 0;
let cycles = 5;
cycles = 40000000;
for ( let i = 0; i < cycles; i++ ) {
	[ seedA, seedB ] = [ genA( seedA ), genB( seedB ) ];

	if ( isPair( seedA, seedB ) ) {
		pairs++
	}
}
console.log( pairs );
// 1223 too high

const part2Generator = ( check: number, factor: number ) => {
	const gen = generator( factor );
	return seed => {
		let value = gen( seed );
		while ( 0 !== ( value % check ) ) {
			value = gen( value );
		}
		return value;
	}
}

pairs = 0;

cycles = 1100;
[ seedA, seedB ] = [ 65, 8921 ];
cycles = 5000000;
[ seedA, seedB ] = [ 873, 583 ];

const gen2A = part2Generator( 4, 16807 );
const gen2B = part2Generator( 8, 48271 );

for ( let i = 0; i < cycles; i++ ) {
	[ seedA, seedB ] = [ gen2A( seedA ), gen2B( seedB ) ];
	if ( isPair( seedA, seedB ) ) {
		pairs++
	}
}

console.log( pairs );
// 71 wrong