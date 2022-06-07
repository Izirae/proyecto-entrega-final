class Piloto{
    
    constructor(posicion,nombre, escuderia, puntos){
        this.posicion = posicion
        this.nombre = nombre
        this.escuderia = escuderia
        this.puntos = puntos
        
    }  
}

/* FUNCIONES LOGIN */

let estadoLogin = {estado: false, user:""}

let estadoLoginLS = JSON.parse(sessionStorage.getItem('dataLogin'))
if(estadoLoginLS !== null){
    estadoLogin = estadoLoginLS
}

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
            btnCamp.onclick = () => {window.location.href = "./assets/views/campeonato.html"};
            btnCamp.className = "btn btn-danger text-dark me-1"
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

    window.location.href = "../../index.html"
}

/* FIN FUNCIONES LOGIN */

let campeonato = {nombre: '', duenio: '', pilotos: []}

function borrarTabla(){
    let columna = table.rows.length;
        for (let i = columna - 1; i >= 0; i--) {
            table.deleteRow(i);
        }
}
    
function crearTabla(){
    
    borrarTabla()
    
    const table = document.getElementById('table');
    
    campeonato.pilotos.forEach(item => {
    
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
    })
}
    
function buscarPiloto() {
    
    borrarTabla()
    
    let input = document.getElementById("buscar");
    filtro = input.value.toLowerCase();
    pilotos.forEach(item => {
    if (item.nombre.indexOf(filtro) > -1) {
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
    let pilotosLocal = JSON.parse(localStorage.getItem('pilotos'))
        pilotosLocal !== null ? pilotos = [...pilotosLocal] : console.log(pilotosLocal, "esta vacio")
}    

estadoLogueo()

actualizarDatos()
console.log(campeonato.pilotos)

campeonato.pilotos.sort((a, b) => {return b.puntos - a.puntos;});

for(let i = 0; i < campeonato.pilotos.length; i++){
    campeonato.pilotos[i].posicion = i + 1
}

crearTabla()

let boton = document.getElementById("botonAdd")

boton.onclick = () => {
    localStorage.setItem("pilotos", JSON.stringify(pilotos));
    window.location.href = "../views/login.html"
}

const search = document.getElementById("buscar")
search.addEventListener("keypress", function onEvent(evento) {
    if (evento.key === "Enter") buscarPiloto();
});


btnInicio.onclick = () => {
    window.location.href = "../../index.html"
}

btnPilotos.onclick = () => {
    window.location.href = "../views/pilotos.html"
}

btnEquipos.onclick = () => {
    window.location.href = "../views/equipos.html"
}

btnPosiciones.onclick = () => {
    window.location.href = "../views/posiciones.html"
}
