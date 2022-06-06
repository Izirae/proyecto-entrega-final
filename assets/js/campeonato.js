let pilotos = []
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

function borrarTabla(){
    let columna = table.rows.length;
        for (let i = columna - 1; i >= 0; i--) {
            table.deleteRow(i);
        }
}

// function actualizarDatos(){
//     let pilotosLocal = JSON.parse(sessionStorage.getItem('pilotos'))
//     pilotos = [...pilotosLocal]
// }

function cargar() {
    const select = document.getElementById("pilotos");
    
    for(let i=0; i < pilotos.length; i++){ 
        const option = document.createElement("option");
        option.innerHTML = pilotos[i].nombre;
        select.appendChild(option);
    }
    document.getElementById("equipo").innerText = "Escuderia";
}

function cargarPuntos(){

    let suma = parseInt(document.getElementById("cargaPuntos").value)
    console.log(suma)
    parseInt(suma)
        if(suma <= 0 || suma > 26 || isNaN(suma)){
            Swal.fire({
                icon: 'error',
                text: 'Ingresó un valor erróneo (min. 1, max. 26)',
                timer: 3000,
                position: 'center',
                showConfirmButton: false,
                color: '#ffffff',
                timerProgressBar: true,
                toast: true,
            })
        } else{
                const valor = document.getElementById("pilotos").value
                pilotos.forEach(elemento => {
                if(elemento.nombre == valor){
                    Swal.fire({
                        title: 'Confirmar',
                        icon: 'question',
                        target: '#conf',
                        iconColor:'#d33',
                        text: '¿Está seguro de agregar ' + suma + ' puntos, al piloto ' + valor + '?', 
                        confirmButtonText: 'Sí',
                        confirmButtonColor: '#555555',
                        color: '#ffffff',
                        denyButtonText: 'No',
                        showDenyButton: true,
                        denyButtonColor: '#aa2222'
                    }).then((resultado) => {
                        if (resultado.isConfirmed) {
                            elemento.puntos = parseInt(elemento.puntos) + suma;
                            sessionStorage.setItem("pilotos", JSON.stringify(pilotos));
                            pilotos.sort((a, b) => {return b.puntos - a.puntos;});
                            for(let i = 0; i < pilotos.length; i++){
                                pilotos[i].posicion = i + 1
                                pilotos[i].posicion = pilotos[i].posicion.toString()
                            }
                            crearTabla()
                        }
                        })
                    }
                })
            }
}

function crearTabla(){

    borrarTabla()

const table = document.getElementById('table');
pilotos.sort((a, b) => {return b.puntos - a.puntos;});
for(let i = 0; i < pilotos.length; i++){
    pilotos[i].posicion = i + 1
    pilotos[i].posicion = pilotos[i].posicion.toString()
}
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

    table.appendChild(tr);
})
}

function buscarPiloto() {

    borrarTabla()
    
    let input = document.getElementById("buscar");
    filtro = input.value.toLowerCase();
    console.log(filtro, "filtro")
    
    pilotos.forEach(item => {
    console.log(item.posicion, "pos")
    if (item.nombre.toLowerCase().includes(filtro) || item.escuderia.toLowerCase().includes(filtro) || item.posicion.includes(filtro)) {
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

estadoLogueo()
cargar()
crearTabla()

const lista = document.getElementById("pilotos")
lista.onchange = () => {
    const valor = document.getElementById("pilotos").value
    pilotos.forEach(elemento => {
        if(elemento.nombre == valor){
            document.getElementById("equipo").innerText = elemento.escuderia;
        }
    })
}

let boton = document.getElementById("boton")

boton.onclick = () => {
    cargarPuntos()
}


const search = document.getElementById("buscar")
search.addEventListener("keypress", function onEvent(evento) {
    if (evento.key === "Enter") {
        buscarPiloto();
    }
});

const sumar = document.getElementById("cargaPuntos")
sumar.addEventListener("keypress", function onEvent(evento) {
    if (evento.key === "Enter") {
        cargarPuntos()
    }
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
