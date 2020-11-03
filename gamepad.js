const GamePad = require( 'node-gamepad' );
var controller = new GamePad( 'microsoft/sidewinder-precision-2', {
    vendorID: 0x0C12,
    productID: 0x8802
} );
controller.connect();
controller.on( 'up:press', function() {
    console.log( 'up' );
} );
controller.on( 'down:press', function() {
    console.log( 'down' );
} );