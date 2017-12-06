const input = 347991;

const UP = 0, DOWN = 1, LEFT = 2, RIGHT = 3;

let x = 0, y = 0, steps = 1; stepCount = 0; direction = RIGHT;

function move() {
	switch ( direction ) {
		case RIGHT:
			x += 1;
			break;
		case UP:
			y += 1;
			break;
		case LEFT:
			x -= 1;
			break;
		case DOWN:
			y -= 1;
			break;
	}
}

function turn() {
	steps += 1;
	if ( steps <= stepCount ) {
		return;
	}

	steps = 0;

	switch ( direction ) {
		case RIGHT:
			direction = UP;
			break;
		case UP:
			direction = LEFT;
			stepCount += 1;
			break;
		case LEFT:
			direction = DOWN;
			break;
		case DOWN:
			direction = RIGHT;
			stepCount += 1;
			break;
	}
}


for ( let i = 1; i < input; i++ ) {
	// console.log( '' + i + ': ', [ x, y] );
	move();
	turn();
}


console.log( '' + input + ': ', [ x, y] );
console.log( Math.abs( x ) + Math.abs( y ) );

x = 0, y = 0, steps = 1; stepCount = 0; direction = RIGHT;
const values = {};

function get( x, y ) {
	if ( ! values[x] ) {
		values[x] = {};
	}
 	return values[x][y] || 0;
}

function set( x, y, value ) {
	if ( ! values[x] ) {
		values[x] = {}
	}
	values[x][y] = value;
}

function sum( x, y ) {
	return get( x - 1, y + 1 ) +
	       get( x, y + 1 ) +
	       get( x + 1, y + 1 ) +
	       get( x + 1, y ) +
	       get( x + 1, y - 1 ) +
	       get( x, y - 1 ) +
	       get( x - 1, y - 1 ) +
	       get( x - 1, y );
}

set( 0, 0, 1 );
let value = 1;

while ( value < 347991 ) {
	move();
	turn();
	value = sum( x, y );
	set( x, y, value );
}

console.log( value )