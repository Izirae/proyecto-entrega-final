let estadoLogin = {estado: false, user:""}

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
            btnCamp.onclick = () => {window.location.href = "./assets/views/campeonato.html"};
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

let ultimaCarrera = []
let siguienteCarrera = []

function carreras(){

    ultimaCarrera.forEach((data) => {
            

        const div = document.createElement("div");
        const divCB = document.createElement("div");
        const a = document.createElement("a");
        const divTopCinco = document.createElement("div");
        const ul = document.createElement("ul");
        const h3 = document.createElement("h3");

    div.className = "card col m-3 p-2 border border-dark border-2 h5 text-white bg-dark text-center"
    div.style = "border-radius: 10px; "
    div.textContent = "Última carrera"
    div.appendChild(divCB)
    divCB.className = "card-body"
    divCB.appendChild(a)
    a.textContent = data.Circuit.circuitName
    a.className = "link-danger"
    a.href= data.Circuit.url
    a.target = "_blank"
    div.appendChild(divTopCinco)
    divTopCinco.appendChild(ul);
    ul.className = "list-group list-group-flush"
    ul.appendChild(h3);
    h3.textContent = "Resultados:"
        for(let i = 0; i < 5; i++){
            const li = document.createElement("li");
            li.className="list-group-item"
            li.textContent = data.Results[i].position + " - " + data.Results[i].Driver.givenName + " " + data.Results[i].Driver.familyName
            ul.appendChild(li)
        }
    

    card.appendChild(div)
    })

    siguienteCarrera.forEach((data) => {
            

        const div = document.createElement("div");
        const divCB = document.createElement("div");
        const a = document.createElement("a");
        const divTopTres = document.createElement("div");
        const ul = document.createElement("ul");
        const h3 = document.createElement("h3");

    div.className = "card col m-3 p-2 border border-dark border-2 h5 text-white bg-dark text-center"
    div.style = "border-radius: 10px; "
    div.textContent = "Próxima carrera"
    div.appendChild(divCB)
    divCB.className = "card-body"
    divCB.appendChild(a)
    a.textContent = data.Circuit.circuitName
    a.className = "link-danger"
    a.target = "_blank"
    a.href= data.Circuit.url
    div.appendChild(divTopTres)
    divTopTres.appendChild(ul);
    ul.className = "list-group list-group-flush"
    ul.appendChild(h3);
    h3.textContent = "Horarios:"
        for(let i = 0; i < 5; i++){

            switch (i){

            case 0:
                const li0 = document.createElement("li");
                li0.className="list-group-item"
                li0.textContent = "Fecha Libres 1: " +data.FirstPractice.date + " Hora: " + data.FirstPractice.time.substring(0, data.FirstPractice.time.length -4)
                ul.appendChild(li0)
            break;

            case 1:
                const li1 = document.createElement("li");
                li1.className="list-group-item"
                li1.textContent = "Fecha Libres 2: " +data.SecondPractice.date + " Hora: " + data.SecondPractice.time.substring(0, data.FirstPractice.time.length -4)
                ul.appendChild(li1)
            break;

            case 2:
                const li2 = document.createElement("li");
                li2.className="list-group-item"
                li2.textContent = "Fecha Libres 3: " +data.ThirdPractice.date + " Hora: " + data.ThirdPractice.time.substring(0, data.FirstPractice.time.length -4)
                ul.appendChild(li2)
            break;

            case 3:
                const li3 = document.createElement("li");
                li3.className="list-group-item"
                li3.textContent = "Fecha Clasificación: " +data.Qualifying.date + " Hora: " + data.Qualifying.time.substring(0, data.FirstPractice.time.length -4)
                ul.appendChild(li3)
            break;

            case 4:
                const li4 = document.createElement("li");
                li4.className="list-group-item"
                li4.textContent = "Fecha Carrera: " +data.date + " Hora: " + data.time.substring(0, data.FirstPractice.time.length -4)
                ul.appendChild(li4)
            break;
            
            }
        }
    

    card.appendChild(div)
    })
}

async function datosCarreras(){

    // Última carrera

    await fetch('http://ergast.com/api/f1/current/last/results.json')
    .then( (raceData)=>{
    return raceData.json();

    }).then((race)=>{

    ultimaCarrera = race.MRData.RaceTable.Races
    })

    // Siguiente carrera

    await fetch('http://ergast.com/api/f1/current/next.json')
    .then( (raceData)=>{
    return raceData.json();

    }).then((race)=>{

    siguienteCarrera = race.MRData.RaceTable.Races
    })

    carreras()

}

btnPosiciones.onclick = () => {
    window.location.href = "./assets/views/posiciones.html"
}

btnPilotos.onclick = () => {
    window.location.href = "./assets/views/pilotos.html"
}

btnEquipos.onclick = () => {
    window.location.href = "./assets/views/equipos.html"
}

btnLogin.onclick = () => {
    window.location.href = "./assets/views/login.html"
}

btnRegistro.onclick = () => {
    window.location.href = "./assets/views/crearUsuario.html"
}

btnRegistro.onclick = () => {
    window.location.href = "./assets/views/crearUsuario.html"
}

estadoLogueo()
datosCarreras()