let equipos = []
let estadoLogin = []

estadoLogin = JSON.parse(sessionStorage.getItem('dataLogin'))

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

function cards(){

    cards.hidden=true;

    equipos.forEach((data) => {

        const li = document.createElement("li");
        const a = document.createElement("a");
        const imgAuto = document.createElement("img");
        const imgLogo = document.createElement("img");
        const div = document.createElement("div");
        const name = document.createElement("h3");
        const divH = document.createElement("div");
        const divImg = document.createElement("div");
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")

            path.setAttribute("d", "M 40 80 c 22 0 40 -22 40 -40 v 40 Z")
            svg.setAttribute("class","arc")

        li.appendChild(a);
            a.className = "author-card";
            a.target = "_blank"
            a.href = data.url
            a.appendChild(imgAuto);
                imgAuto.src = "../img/teams/"+data.constructorId+".png";
                imgAuto.className = "image";
            a.appendChild(div);
                div.className = "overlay";
                div.appendChild(divH)
                    divH.appendChild(svg)
                        svg.appendChild(path)
                    divH.className = "headerE";
                    divH.appendChild(name);
                        name.className = "nombreE"
                        name.textContent = data.name
                    divH.appendChild(divImg);
                        divImg.className="headertext"
                        divImg.appendChild(imgLogo)
                            imgLogo.src = "../img/logos/"+data.constructorId+".png";
                            imgLogo.className = "logo";
    
        card.appendChild(li)
    })

}

async function pilotosCard(){

    await fetch('http://ergast.com/api/f1/current/constructors.json')
    .then( (teams)=>{
    return teams.json();

    }).then((team)=>{

    equipos = team.MRData.ConstructorTable.Constructors
    
    })

    cards()

    const awaitTimeout = delay =>
        new Promise(resolve => setTimeout(resolve, delay));

    awaitTimeout(200).then(() => card.hidden=false)
}

btnInicio.onclick = () => {
    window.location.href = "../../index.html"
}
btnPosiciones.onclick = () => {
    window.location.href = "./posiciones.html"
}
btnPilotos.onclick = () => {
    window.location.href = "./pilotos.html"
}

btnLogin.onclick = () => {
    window.location.href = "./login.html"
}

btnRegistro.onclick = () => {
    window.location.href = "./crearUsuario.html"
}

estadoLogueo()
pilotosCard()

