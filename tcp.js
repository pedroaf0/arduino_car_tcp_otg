var net = require('net');
const express = require('express');
const path = require('path');
const ejs = require('ejs');

const cell_ip = '192.168.1.6';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');


app.use('/', (req,res) =>{
    res.render('movingBall.html');
});

var client = new net.Socket();
client.connect(1234, cell_ip, function() {
	console.log('Connected');
	client.write('d2 ');
	
io.on('connection', socket => {
	console.log(`Socket conectado: ${socket.id}`);

    socket.on('cli', data =>{
		client.write(data+"0");

    })


});

server.listen(3000);

});

client.on('data', function(data) {
	console.log('Received: ' + data);

});

client.on('close', function() {
	console.log('Connection closed');
});