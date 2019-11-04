//REFERENCIA A OBJETOS DE HTML

//USAMOS NUMERAL PARA HACER REFERENCIAL AL ID QUE CONTIENE LA ETIQUETA, EN ESTE CASO
//EL ID ES CADA UNO DE LOS NOMBRES DE DICHAS ETIQUETAS.
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTicketS = [lblTicket1,lblTicket2,lblTicket3,lblTicket4];
var lblEscritorios = [lblEscritorio1,lblEscritorio2,lblEscritorio3,lblEscritorio4];

// ESTABLECER LA CONEXIÓN

var socket = io();

//ESCUCHAMOS EL EVENTO ESTADO ACTUAL QUE NOS ENVÍA EL SERVIDOR
socket.on('estadoActual', function(data){
        actualizaHTML(data.ultimosCuatro);
});


socket.on('ultimosCuatro', function(data){

    var audio = new Audio('../audio/new-ticket.mp3');
    audio.play();
        
    actualizaHTML(data.ultimosCuatro);
    
});

// SE RECORRE CADA UNO DE LOS VECTORES Y SE ASIGNAN A LAS ETIQUEDAS DE PUBLICO.HTML

function actualizaHTML(ultimosCuatro){
    for(var i = 0; i<=ultimosCuatro.length-1; i++){

        lblTicketS[i].text('Ticket ' + ultimosCuatro[i].numero);
        lblEscritorios[i].text('Escritorios ' + ultimosCuatro[i].escritorio);

    }
}

