
// Envio de peticion al servidor
var socket = io.connect('http://192.168.1.62:6677',{'forceNew':true});

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

    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

// Funcion para obtener el nombre y el mensaje 

function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';

    // Enviando mensaje al servidor retornando false para que para la ejecucion de la funcion
    socket.emit('add-message', message);
    return false;
}