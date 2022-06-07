class Piloto{
    
    constructor(posicion,nombre, escuderia, puntos){
        this.posicion = posicion
        this.nombre = nombre
        this.escuderia = escuderia
        this.puntos = puntos
        
    }  
}

let estadoLogin = []

let estadoLoginLS = JSON.parse(sessionStorage.getItem('dataLogin'))
if(estadoLoginLS !== null){
    estadoLogin = estadoLoginLS
}

/* FUNCIONES LOGIN */

function estadoLogueo() {
    if(estadoLogin.estado){

        while(logged.firstChild){
            logged.removeChild(logged.firstChild)
        }

        const p = document.createElement("p")
        const btnCamp = document.createElement("button")
        const btnLogout = document.createElement("button")

        logged.appendChild(p)
            p.className = "pColor"
            p.innerText = "Bienvenido, " + estadoLogin.user
        logged.appendChild(btnCamp)
            btnCamp.type = "button"
            btnCamp.onclick = () => {window.location.href = "./campeonato.html"};
            btnCamp.className = "btn btn-outline-danger text-white me-1"
            btnCamp.innerText = "Mi Campeonato"
        logged.appendChild(btnLogout)
            btnLogout.type = "button"
            btnLogout.className = "btn btn-outline-danger text-white"
            btnLogout.innerText = "Salir"
            btnLogout.onclick = logout;
    }
}

function logout(){

    estadoLogin.estado = false
    estadoLogin.user = ""

    const guardarLocal = (nombre, datos) => {sessionStorage.setItem(nombre, datos)};
        guardarLocal("dataLogin", JSON.stringify(estadoLogin));

    location.reload()
}

/* FIN FUNCIONES LOGIN */

let pilotos = []

async function llamarAPI(){
    await fetch('http://ergast.com/api/f1/current/driverStandings.json')

    .then((response) => response.json())
    .then((data) => {
        data.MRData.StandingsTable.StandingsLists[0].DriverStandings.forEach((race) => {
            pilotos.push(new Piloto(race.position, race.Driver.givenName + ' ' + race.Driver.familyName, race.Constructors[0].name, race.points))
        })
    })
}

function borrarTabla(){
    let columna = table.rows.length;
        for (let i = columna - 1; i >= 0; i--) {
            table.deleteRow(i);
        }
}

async function crearTabla(){

    fullTable.hidden = true

    await llamarAPI()
    actualizarDatos()
    pilotos.sort((a, b) => {return b.puntos - a.puntos;});
    for(let i = 0; i < pilotos.length; i++){
        pilotos[i].posicion = i + 1
        pilotos[i].posicion = pilotos[i].posicion.toString()
    }
    
    borrarTabla()
    const tabla = document.getElementById('table');
    
    pilotos.forEach(item => {
    
        const tr = document.createElement('tr');
    
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
    
        const pos = document.createTextNode(item.posicion);
        const name = document.createTextNode(item.nombre)
        const esc = document.createTextNode(item.escuderia)
        const puntos = document.createTextNode(item.puntos)
    
        td1.appendChild(pos);
        td2.appendChild(name)
        td3.appendChild(esc)
        td4.appendChild(puntos)
    
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
    
        tabla.appendChild(tr);
    })

    const awaitTimeout = delay =>
        new Promise(resolve => setTimeout(resolve, delay));
    awaitTimeout(200).then(() => fullTable.hidden=false)

}
    
function buscarPiloto() {
    
    borrarTabla()
    
    let input = document.getElementById("buscar");
    filtro = input.value.toLowerCase();
    pilotos.forEach(item => {
    
    if (item.nombre.toLowerCase().includes(filtro) || item.posicion.includes(filtro) || item.escuderia.toLowerCase().includes(filtro)) {
        const tr = document.createElement('tr');
    
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
    
        const pos = document.createTextNode(item.posicion);
        const name = document.createTextNode(item.nombre)
        const esc = document.createTextNode(item.escuderia)
        const puntos = document.createTextNode(item.puntos)
    
        td1.appendChild(pos);
        td2.appendChild(name)
        td3.appendChild(esc)
        td4.appendChild(puntos)
    
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
    
        table.appendChild(tr);
        }
    })
}

function actualizarDatos(){
    let pilotosLocal = JSON.parse(sessionStorage.getItem('pilotos'))
        if(pilotosLocal !== null){
            pilotos = pilotosLocal
        }
}  

btnInicio.onclick = () => {
    window.location.href = "../../index.html"
}
btnPilotos.onclick = () => {
    window.location.href = "./pilotos.html"
}
btnEquipos.onclick = () => {
    window.location.href = "./equipos.html"
}
btnLogin.onclick = () => {
    window.location.href = "./login.html"
}

btnRegistro.onclick = () => {
    window.location.href = "./crearUsuario.html"
}

estadoLogueo()
crearTabla()

const search = document.getElementById("buscar")
search.addEventListener("keypress", function onEvent(evento) {
    if (evento.key === "Enter") buscarPiloto();
});
