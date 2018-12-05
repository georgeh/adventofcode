const { readFileSync } = require( 'fs' );
// const input = readFileSync( 'day20-sample', 'utf8' ).split( '\n' );
const input = readFileSync( 'day20-input', 'utf8' ).split( '\n' );

function Particle( spec, i ) {
	this.id = i;
	const [ , ps, vs, as ] = /p=<(.*)>, v=<(.*)>, a=<(.*)>/.exec( spec );
	console.log( { ps, vs, as } );
	[ this.x, this.y, this.z ] = ps.split( ',' ).map( i => parseInt( i ) );
	[ this.xV, this.yV, this.zV ] = vs.split( ',' ).map( i => parseInt( i ) );
	[ this.xA, this.yA, this.zA ] = as.split( ',' ).map( i => parseInt( i ) );
}

Particle.prototype.tick = function() {
	this.xV += this.xA;
	this.yV += this.yA;
	this.zV += this.zA;
	this.x += this.xV;
	this.y += this.yV;
	this.z += this.zV;
}

Particle.prototype.distance = function() {
	return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );
}

let particles = input.map( ( l, i ) => new Particle( l, i ) );
const closest = () => particles.reduce( ( closest, current ) => {
	return ( closest.distance() < current.distance() ) ? closest : current
} );

const isColliding = ( p1, p2 ) => {
	return ( p1.x == p2.x && p1.y == p2.y && p1.z == p2.z );
}

const removeCollisions = ( particles ) => {
	for ( let i = 0; i < particles.length - 1; i++ ) {
		for ( let j = i + 1; j < particles.length; j++ ) {
			if ( isColliding( particles[ i ], particles[ j ] ) ) {
				particles[ i ].colliding = true,
				particles[ j ].colliding = true
			}
		}
	}
	return particles.filter( p => ! p.colliding );
}

const FPS = 30;
let last = Date.now();
while ( 1 ) {
	particles = removeCollisions( particles );
	particles.forEach( p => p.tick() );
	let now = Date.now();
	if ( now - last > ( 1000 / FPS ) ) {
		console.log( '\033[2J' );
		console.log( 'Closest', closest().id );
		console.log( 'Particles', particles.length );
		last = now;
	}
}
