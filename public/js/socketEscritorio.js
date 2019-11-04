
// ESTABLECER LA CONEXIÓN

var socket = io();

//OBTENER LOS PARÁMETROS DEL URL.
var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritrio es necesario');
}

var escritorio = searchParams.get('escritorio');

var label = $('small');

//TRABAJAR CON LA ETIQUETA SMALL

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', {escritorio : escritorio},
    function(respuesta){

        if(respuesta === 'No hay tickets'){
            label.text('No hay más tickets');
            alert('No hay más tickets');
            return;
        }

        label.text(respuesta.numero);
    
    });

    socket.emit('ultimosCuatro');

});