const { io } = require('../server');

const {TicketControl} = require('../classes/ticket-control');

let ticket = new TicketControl();

io.on('connection', (client) => {

    //EMITIMOS EL ÚLTIMO TICKET DESDE EL SERVIDOR
    client.emit('estadoActual', {actual: ticket.getUltimoTicket(),
    ultimosCuatro: ticket.getUltimosCuatro()});
    
    //RECIBIMOS EL SIGUIENTE TICKET QUE VIENE DEL CLICK DEL CLIENTE CON EL LABEL PARA PONERLO EN 
    //EL INDEX DEL SITIO WEB.
    client.on('siguienteTicket', (data, callback) =>{
        let siguiente = ticket.siguienteTicket();
        console.log("Siguiente ", siguiente);
        
        callback(siguiente);
    });
    

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });


    //CONTROL DE TICKETS PENDIENTES

    client.on('atenderTicket', (data , callback) => {

        //SI VIENE EL ESCRITORIO
        if(!data.escritorio){
            return callback({
                err: true,
                mensaje: "El escritorio es necesario"
            });
        }


        let atenderTicket = ticket.atenderTicket(data.escritorio);

        //LA PERSONA EN EL FRONTEND LO TRABAJARÁ.
        callback(atenderTicket);

        //ACTUALIZAR O NOTIFICAR CAMBIOS EN LOS ÚLTIMOS CUATRO.
        client.broadcast.emit('ultimosCuatro', {ultimosCuatro: ticket.getUltimosCuatro()});

    }); 

  




    

});