// Configuracion del servidor 
const express = require('express');
const app = express(); 
const server = require('http').Server(app);
const io = require('socket.io')(server);


// app.get('/hola-mundo', function(req,res){
//     res.status(200).send('Hola mundo desde el servidor');
// });

// Me recibe todo lo que tenga en la carpeta del client
app.use(express.static('client'));

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado creado con Socket.io y Nodejs',
    nickname: 'Julian-Soto'
}];

// Abrir conexion con el socket con on()
// esta funcion es la encargada de recibir la conexion de los clientes
io.on('connection', function(socket){
    console.log("El cliente con IP: "+socket.handshake.address+" se ha conectado...");
    // Envio de mensajes al cliente
    socket.emit('messages',messages);
    // Recibo los mensajes del cliente con sus respectivos datos
    socket.on('add-message', function(data){
        //se hace un push para añadirle un dato nuevo al array de messages
        messages.push(data);
        // Envio a todos los clientes que esten conectados (array de messages actualizado) 
        io.sockets.emit('messages', messages);
    });
    
});

server.listen(6677, function(){
    console.log("El servidor esta funcionando en http://localhost:6677");
}); 