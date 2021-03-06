export {};

let input = `0: 4
1: 2
2: 3
4: 4
6: 6
8: 5
10: 6
12: 6
14: 6
16: 12
18: 8
20: 9
22: 8
24: 8
26: 8
28: 8
30: 12
32: 10
34: 8
36: 12
38: 10
40: 12
42: 12
44: 12
46: 12
48: 12
50: 14
52: 14
54: 12
56: 12
58: 14
60: 14
62: 14
66: 14
68: 14
70: 14
72: 14
74: 14
78: 18
80: 14
82: 14
88: 18
92: 17`;

// input = `0: 3
// 1: 2
// 4: 4
// 6: 4`;

const pairs = input.split( '\n' )
	.map( l => l.split( ': ' ) )
	.map( ( [ r, d ] ) => ( [ parseInt( r ), parseInt( d ) ] ) );

enum Direction {
	FORWARD = 'F',
	BACK = 'B'
}

class Scanner {
	pos: number;
	dir: Direction;
	range: number;

	constructor( range ) {
		this.pos = 0;
		this.dir = Direction.FORWARD;
		this.range = range;
	}

	step() {
		if ( 0 === this.pos && Direction.BACK === this.dir ) {
			this.dir = Direction.FORWARD;
		}

		if ( ( this.range - 1 ) === this.pos && Direction.FORWARD === this.dir ) {
			this.dir = Direction.BACK;
		}

		( Direction.FORWARD === this.dir ) ? this.pos++ : this.pos--;
	}
}

const newFirewall = () => pairs.reduce( ( fwall: Scanner[], [ depth, range ] ) => {
	fwall[ depth ] = new Scanner( range );
	return fwall;
}, [] )

const firewall1 = newFirewall();

// console.log( firewall )

// const s = new Scanner( 5 );
// for ( let i = 0; i < 10; i++ ) {
// 	console.log( i, s.pos )
// 	s.step()
// }
// console.log( s );

const hits: number[] = [];

for ( let depth = 0; depth < firewall1.length; depth++ ) {
	if ( firewall1[ depth ] && 0 === firewall1[ depth ].pos ) {
		hits.push( depth );
	}
	firewall1.forEach( s => s && s.step() );
}
// console.log( hits );

const score = hits.reduce( ( score, depth ) => ( score + ( firewall1[ depth ].range * depth ) ), 0 );

console.log( score );

let wait = 0;
class Packet {
	wait: number;
	depth: number;
	constructor( wait ) {
		this.wait = wait;
		this.depth = 0;
	}
}

interface Array<T> { find( callbackfn: ( value: T ) => boolean ): T }

let packets: Packet[] = [];
const firewall2 = newFirewall();
const packetAtEnd = () => packets.find( p => p.depth == firewall2.length )
const packetNotDetected = ( p: Packet ) => ! firewall2[ p.depth ] || firewall2[ p.depth ].pos !== 0;

while ( ! packetAtEnd() ) {
	packets = packets.concat( new Packet( wait ) ) // add new packet
		.filter( packetNotDetected );
	packets.forEach( p => p.depth++ );
	firewall2.forEach( s => s && s.step() );
	wait++;
}

console.log( packetAtEnd().wait );
