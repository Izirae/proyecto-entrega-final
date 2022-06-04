let equipos = []

async function pilotosCard(){

    await fetch('http://ergast.com/api/f1/current/constructors.json')
    .then( (teams)=>{
    return teams.json();

    }).then((team)=>{

    equipos = team.MRData.ConstructorTable.Constructors
    
    })

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

btnInicio.onclick = () => {
    window.location.href = "../../index.html"
}
btnPosiciones.onclick = () => {
    window.location.href = "./posiciones.html"
}
btnPilotos.onclick = () => {
    window.location.href = "./pilotos.html"
}

pilotosCard()

