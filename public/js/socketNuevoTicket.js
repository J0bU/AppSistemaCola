
//HACER REFERENCIA MUCHAS VECES A UN OBJETO EN HTML
var label = $('#lblNuevoTicket');

// ESTABLECER LA CONEXIÓN

var socket = io();

socket.on('connect', function(){

    console.log("Conectado al servidor");


});

socket.on('disconnect', function(){

    console.log("estamos fuera");

});

//TRAEMOS EL ESTADO ACTUAL DEL TICKET PARA PONERLO EN EL LABEL DESDE QUE SE INICIA LA PANTALLA
socket.on('estadoActual', function(respuesta) {

    label.text(respuesta.actual);

});
//ESTABLECEMOS UN LISTENER AL BOTÓN DE GENERAR NUEVO TICKET EN QUERY

$('button').on('click', function() {
    
    //NO SE ENVIARÁ NINGÚN ARGUMENTO PERO SÍ SE RECIBIRÁ EL VALOR DEL SERVIDOR
    socket.emit('siguienteTicket', null, function(siguienteTicket){

        label.text(siguienteTicket);



    });

  
  
});

    
