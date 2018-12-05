let input = `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 826
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`;

function Duet( input ) {
    this.registers = {};
    this.instructions = input.split('\n').map( l => l.split( ' ' ) );
    this.isWaiting = false;
    this.isEnded = false;
    this.receiveQueue = [];
    this.stepNum = 0;
    this.sendCount = 0;
}

Duet.prototype.step = function() {
    if ( this.isWaiting ) {
        if ( this.receiveQueue.length == 0 ) {
            return;
        } else {
            this.isWaiting = false;
        }
    }

    if ( this.stepNum >= this.instructions.length ) {
        this.isEnded = true;
        return;
    }

    const [ op, reg, target ] = this.instructions[ this.stepNum ];

    if ( /^[a-z]$/.test( reg ) && typeof this.registers[ reg ] == 'undefined' ) {
        this.registers[ reg ] = 0;
    }
    let val;

    if ( /^[a-z]$/.test( target ) ) {
        if ( typeof this.registers[ target ] == undefined ) {
            this.registers[ target ] = 0;
        }
        val = this.registers[ target ];
    } else {
        val = parseInt( target );
    }

    switch ( op ) {
        case 'snd':
            if ( isNaN( this.registers[ reg ] ) ) {
                console.log( this.registers );
                console.log( this.instructions[ this.stepNum ] )
                throw "🤷‍♂️";
            }
            this.otherProgram.receiveQueue.push( this.registers[ reg ] );
            this.sendCount++;
            break;
        case 'set':
            this.registers[ reg ] = val;
            if ( isNaN( this.registers[ reg ] ) ) {
                console.log( this.registers );
                console.log( this.instructions[ this.stepNum ] )
                throw "🤷‍♂️";
            }
            // console.log( op, this.registers[ reg ] );
            break;
        case 'add':
            this.registers[ reg ] = val + ( this.registers[ reg ] || 0 );
            if ( isNaN( this.registers[ reg ] ) ) {
                console.log( this.registers );
                console.log( this.instructions[ this.stepNum ] )
                throw "🤷‍♂️";
            }
            // console.log( op, this.registers[ reg ] );
            break;
        case 'mul':
            this.registers[ reg ] = val * ( this.registers[ reg ] || 0 )
            if ( isNaN( this.registers[ reg ] ) ) {
                console.log( this.registers );
                console.log( this.instructions[ this.stepNum ] )
                throw "🤷‍♂️";
            }
            // console.log( op, this.registers[ reg ] );
            break;
        case 'mod':
            if ( val == 0 ) {
                console.log( this.registers );
                console.log( this.instructions[ this.stepNum ] )
                throw "Divide by Zero";
            }

            this.registers[ reg ] = ( this.registers[ reg ] || 0 ) % val;

            if ( isNaN( this.registers[ reg ] ) ) {
                console.log( this.registers );
                console.log( this.instructions[ this.stepNum ] )
                console.log( val, reg )
                throw "🤷‍♂️";
            }
            // console.log( op, this.registers[ reg ] );
            break;
        case 'rcv':
            if ( this.receiveQueue.length > 0 ) {
                this.registers[ reg ] = this.receiveQueue.shift();
                if ( isNaN( this.registers[ reg ] ) ) {
                    console.log( this.registers );
                    throw "🤷‍♂️";
                }
                this.isWaiting = false;
            } else {
                this.isWaiting = true;
                return;
            }
            break;
        case 'jgz':
            let xVal = reg;
            if ( /^[a-z]$/.test( xVal ) ) {
                xVal = this.registers[ reg ];
            }
            if ( xVal > 0 ) {
                this.stepNum += val - 1;
            }
            break;
    }
    this.stepNum++;
}

// input = `snd 1
// snd 2
// snd p
// rcv a
// rcv b
// rcv c
// rcv d`

const prog1 = new Duet( input ),
      prog2 = new Duet( input );

prog1.otherProgram = prog2;
prog2.otherProgram = prog1;

let activeProgram = prog1,
    inactiveProgram = prog2;

let timestamp = Date.now();
const FPS = 30;
while ( ( ! prog1.isWaiting || ! prog2.isWaiting ) && ( ! prog1.isEnded ) ) {
    // console.log( 1, prog1.stepNum, prog1.registers, prog1.instructions[ prog1.stepNum ] );
    prog1.step();
    // console.log( prog1.registers );
    // console.log( '-----' );
    // console.log( 2, prog2.stepNum, prog1.registers, prog2.instructions[ prog2.stepNum ] );
    prog2.step();
    // console.log( prog2.registers );
    const now = Date.now();
    if ( now - timestamp > ( 1000 / FPS ) ) {
        console.log('\033[2J');
        console.log( 1, prog1.stepNum, prog1.registers, prog1.receiveQueue.length );
        console.log( 2, prog2.stepNum, prog1.registers, prog2.receiveQueue.length );
        timestamp = now;
    }
}

console.log( prog1.sendCount );
// 127 too low
// 16002 too high