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

const [ FOREWARD, BACK ] = [ 'F', 'B' ];

class Scanner {
	constructor( depth ) {
		this.pos = 0;
		this.dir = FOREWARD;
		this.depth = depth;
	}

	step() {
		if ( 0 === this.pos && BACK === this.dir ) {
			this.dir = FOREWARD;
		}

		if ( ( this.depth - 1 ) === this.pos && FOREWARD === this.dir ) {
			this.dir = BACK;
		}

		( FOREWARD === this.dir ) ? this.pos++ : this.pos--;
	}
}

const newFirewall = () => pairs.reduce( ( fwall, [ range, depth ] ) => {
	fwall[ range ] = new Scanner( depth );
	return fwall;
}, [] )

const firewall1 = newFirewall();

// console.log( firewall )

// const s = new Scanner( 3 );
// for ( let i = 0; i < 10; i++ ) {
// 	console.log( s )
// 	s.step()
// }
// console.log( s );

const hits = [];

for ( let depth = 0; depth < firewall1.length; depth++ ) {
	if ( firewall1[ depth ] && 0 === firewall1[ depth ].pos ) {
		hits.push( depth );
	}
	firewall1.forEach( s => s && s.step() );
}
// console.log( hits );

const score = hits.reduce( ( score, i ) => ( score + ( firewall1[ i ].depth * i ) ), 0 );

console.log( score );

let wait = 0;
let packets = [];
let firewall2 = newFirewall();
const packetsAtEnd = () => packets.filter( p => p.depth == firewall2.length )

while ( 0 === packetsAtEnd().length ) {
	packets = packets
		.concat( { wait, depth: 0 } ) // add new packet
		.filter( p => ! firewall2[ p.depth ] || firewall2[ p.depth ].pos !== 0 );
	packets.forEach( p => p.depth++ );
	firewall2.forEach( s => s && s.step() );
	wait++;
}

console.log( packetsAtEnd() );
console.log( packetsAtEnd()[0].wait );