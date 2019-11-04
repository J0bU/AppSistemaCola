
//EMS6

const fs = require('fs');

//CLASE ENCARGADA DE MANEJAR LOS TICKETS PENDIENTES.

class Ticket {

    //PARÁMETROS: NÚMERO DEL TICKET QUE ATENDERÉ Y ADEMÁS EL ESCRITORIO QUE ATENDERÁ DICHO TICKET.
    constructor(numero, escritorio){

        this.numero = numero;
        this.escritorio = escritorio;

    }
}

class TicketControl {

    constructor(){

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];

        //TRAEMOS EL ARCHIVO JSON.
        let data = require('../data/data.json');
       

        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        }else{
            this.reiniciarConteo();
        }
    }
    
    //INCREMENTAMOS EN UNO EL ÚLTIMO
    siguienteTicket(){
        this.ultimo = this.ultimo + 1;

        // SE CREA UN NUEVO TICKET
        let ticket = new Ticket(this.ultimo, null);

        // SE AÑADE ESE NUEVO TICKET AL ARREGLO DE TICKETS
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket: ${this.ultimo}`;
    }

    //ESTADO ACTUAL DEL TICKET
    getUltimoTicket(){
        return `Ticket: ${this.ultimo}`;
    }

     //ESTADO ACTUAL DEL TICKET
     getUltimosCuatro(){
        return this.ultimosCuatro;
    }

    //ATENDER TICKET DE COLA
    atenderTicket( escritorio ){

        if(this.tickets.length === 0){
            return "No hay tickets";
        }

        let numeroTicket = this.tickets[0].numero;
        //ELIMINAMOS EL PRIMERO TICKET DEL ARREGLO.
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimosCuatro.unshift(atenderTicket); //AGREGA AL INICIO DEL ARREGLO

        if(this.ultimosCuatro.length > 4){
            this.ultimosCuatro.splice(-1, 1); //BORRA EL ÚLTIMO ELEMENTO.
        }

      

        this.grabarArchivo();

        return atenderTicket;
    }

    //REINICIAR EL CONTEO POR DÍA
    reiniciarConteo(){

       this.ultimo = 0;
       this.tickets = [];
       this.ultimosCuatro = []; //HARÁN PARTE DE LA PANTALLA DE LAS PERSONAS A LA ESPERA.
       console.log("Se ha inicializado el sistema");
       this.grabarArchivo();
    }

    grabarArchivo(){

        let jsonData = {
            ultimo  :  this.ultimo,
            hoy : this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        };
      

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}


module.exports = {
    TicketControl
}