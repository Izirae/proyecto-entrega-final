let pilotos = []

function cards (){

    card.hidden=true;

    pilotos.forEach((data) => {

        const li = document.createElement("li");
        const a = document.createElement("a");
        const imgPiloto = document.createElement("img");
        const imgCasco = document.createElement("img");
        const imgBandera = document.createElement("img");
        const imgNumero = document.createElement("img");
        const div = document.createElement("div");
        const name = document.createElement("h3");
        const divH = document.createElement("div");
        const divHT = document.createElement("div");
        const p = document.createElement("p");
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")

            path.setAttribute("d", "M 40 80 c 22 0 40 -22 40 -40 v 40 Z")
            svg.setAttribute("class","arc")

        li.appendChild(a);
            a.className = "author-card";
            a.href = data.url
            a.target = "_blank"
            a.appendChild(imgPiloto);
                imgPiloto.src = "../img/drivers/"+data.driverId+".png";
                imgPiloto.className = "image";
            a.appendChild(div);
                div.className = "overlay";
                div.appendChild(divH)
                    divH.appendChild(svg)
                        svg.appendChild(path)
                    divH.className = "header";
                    divH.appendChild(imgCasco);
                        imgCasco.src = "../img/helmets/"+data.driverId+".png";
                        imgCasco.className = "helmet";
                    divH.appendChild(divHT);
                        divHT.className = "headertext";
                        divHT.appendChild(name);
                            name.className = "nombre"
                            name.textContent = data.givenName + ' ' + data.familyName 
                div.appendChild(p);
                    p.appendChild(imgNumero);
                        imgNumero.src = "../img/numbers/"+data.driverId+".png";
                        imgNumero.className = "numb";
                    p.appendChild(imgBandera);
                        imgBandera.src = "../img/flags/"+data.nationality+".jpg";
                        imgBandera.className = "flag";
    
        card.appendChild(li)

    })

}

async function pilotosCard(){

    await fetch('http://ergast.com/api/f1/current/drivers.json')
    .then( (drivers)=>{
    return drivers.json();

    }).then((driver)=>{

    pilotos = driver.MRData.DriverTable.Drivers
    })

    cards()

    const awaitTimeout = delay =>
        new Promise(resolve => setTimeout(resolve, delay));

    awaitTimeout(185).then(() => card.hidden=false)
}

btnInicio.onclick = () => {
    window.location.href = "../../index.html"
}
btnPosiciones.onclick = () => {
    window.location.href = "./posiciones.html"
}
btnEquipos.onclick = () => {
    window.location.href = "./equipos.html"
}

pilotosCard()

