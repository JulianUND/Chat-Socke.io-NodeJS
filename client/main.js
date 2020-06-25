
// Envio de peticion al servidor
var socket = io.connect('http://192.168.1.53:6677',{'forceNew':true});

// Recibo mensajes del servidor
socket.on('messages', function(data){
    console.log(data);
    render(data);
});

// Funcion para pintar el array de mensajes y pintarlo en el html 
function render(data){
    var html = data.map(function(message,index){
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    document.getElementById('messages').innerHTML = html;
}