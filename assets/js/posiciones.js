class Piloto{
    
    constructor(posicion,nombre, escuderia, puntos){
        this.posicion = posicion
        this.nombre = nombre
        this.escuderia = escuderia
        this.puntos = puntos
        
    }  
}

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

    await llamarAPI()
    actualizarDatos()
    pilotos.sort((a, b) => {return b.puntos - a.puntos;});
    for(let i = 0; i < pilotos.length; i++){
        pilotos[i].posicion = i + 1
        pilotos[i].posicion = pilotos[i].posicion.toString()
    }
    console.log(pilotos, "pilotos tabla")
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



crearTabla()


let boton = document.getElementById("botonAdd")

boton.onclick = () => {
    sessionStorage.setItem("pilotos", JSON.stringify(pilotos));
    window.location.href = "../views/login.html"
}

const search = document.getElementById("buscar")
search.addEventListener("keypress", function onEvent(evento) {
    if (evento.key === "Enter") buscarPiloto();
});

const pilotos1 = {...pilotos}
console.log(pilotos1, "spread de pilotos")




