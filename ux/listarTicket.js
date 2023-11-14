
/*---
Función para procesar los parámetros recibidos en el URL
*/
function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

/*---
Extrae del URL el id de cliente ya validado, su nombre y la última fecha de login, actualiza banner de seguridad
*/

var query = getQueryParams(document.location.search);
document.getElementById("lastlogin").innerHTML =query.ultimo;
document.getElementById("clienteId").innerHTML =query.id;
document.getElementById("clientName").innerHTML =query.nombre;
/*---
Accede a REST API para obtener tickets
Tener en cuenta que typicode es un fake REST API
*/

const APIREST_URL='http://my-json-server.typicode.com/lu7did/testJASON/ticket/';
//const APIREST_URL='https://xe3qolsgh0.execute-api.us-east-1.amazonaws.com/listarTicketGET?clienteID='+query.id;


//clientID 0533a95d-7eef-4c6b-b753-1a41c9d1fbd0

const api_TicketURL=APIREST_URL;
const HTMLResponse=document.querySelector("#app");


fetch(`${api_TicketURL}`)
    .then(res => {
        return res.json();
    }).then(ticket => {
        console.log(ticket);
        let f = false;

        if (ticket.some(t => t.clienteID === query.id)) {
            // Crear el breadcrumb

            // Crear el contenedor de la lista de tickets
            let containerDiv = document.createElement("div");
            containerDiv.classList.add("container");

            // Crear la lista de tickets con estilos de Bootstrap
            let listGroupDiv = document.createElement("div");
            listGroupDiv.classList.add("list-group");

            // Filtrar los tickets del cliente
            const clientTickets = ticket.filter(t => t.clienteID === query.id);

            // Crear elementos para cada ticket
            clientTickets.forEach(t => {
                let listItemDiv = document.createElement("div");
                listItemDiv.classList.add("list-group-item", "list-group-item-action");

                listItemDiv.innerHTML = `
                    <div class="d-flex justify-content-between">
                         <span class="mb-1 badge bg-success fs-5">Ticket ${t.id}</span>
                        <small>${t.ultimo_contacto}</small>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p class="mb-1 fw-semibold">${t.solucion}</p>

                        <h5>Estado Solucion <span class="badge rounded-pill text-bg-warning py-2">${t.estado_solucion}</span></h5>
                    </div>
                    <small class="font-monospace">Usuario ${t.clienteID}</small>
                `;

                listGroupDiv.appendChild(listItemDiv);
            });

            containerDiv.appendChild(listGroupDiv);
            HTMLResponse.appendChild(containerDiv);
            f = true;
        }

        if (!f) {
            console.log("no tiene tickets");
            document.getElementById('mensajes').style.textAlign = "center";
            document.getElementById('mensajes').innerHTML = "No se registran tickets pendientes";
        }
    });
//          if (users.response == 'OK') {         //<==Habilitar esto para dejar que el API REST verifique sin exponer la password



/*---
Accede al REST API de tickets para obtener información
*/

/*
fetch(`${api_TicketURL}`)
.then((response)=>response.json())
.then((ticket)=>{
    let f=false;
    let table=document.createElement("table");
    ticket.forEach((t)=> {
        if (t.clienteID == query.id) {
            if (f==false) {

                f=true;
                const hdr=["Cliente","ID","Motivo","Estado","Fecha"];
                let tr=document.createElement("tr");
                hdr.forEach((item) => {
                    let th=document.createElement("th");
                    th.innerText = item;
                    tr.appendChild(th);
                });
                table.appendChild(tr);                   
            }

            const body=[t.clienteID,`${t.id}`,`${t.solucion}`,`${t.estado_solucion}`,`${t.ultimo_contacto}`];
            let trl=document.createElement("tr");
            body.forEach((line) => {
                let td=document.createElement("td");
                td.innerText = line;
                trl.appendChild(td);
            });
            table.appendChild(trl);                   

        }
    });

    if (f) {
        HTMLResponse.appendChild(table);
    } else {

        console.log("no tiene tickets");
        document.getElementById('mensajes').style.textAlign = "center";
        document.getElementById('mensajes').style.color="RED";
        document.getElementById("mensajes").innerHTML = "No hay tickets pendientes";
    }
});
*/    



