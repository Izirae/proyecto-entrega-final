let usuarios = []
let estadoLogin = {estado: false, user:""}

function actualizarUsers(){
        let usersLocal = JSON.parse(localStorage.getItem('usuarios'))
        if(usersLocal == null){
            usuarios = [{usuario: "admin", contrasena: "admin"}]
            const guardarLocal = (nombre, datos) => {localStorage.setItem(nombre, datos)};
            guardarLocal("usuarios", JSON.stringify(usuarios));
        } else {
            usuarios = usuarios.concat(usersLocal)
        }
}

actualizarUsers();

console.log(usuarios)

let botonLogin = document.getElementById('login');
botonLogin.onclick = () => {
    login()
}

function login(){
    let user = document.getElementById('usuario').value
    let pass = document.getElementById('pass').value
    let flag = false
    usuarios.every(element => {
        if(user == element.usuario && pass == element.contrasena){
            flag = true
            return false;
        }else {
            return true;}
        })
    if(flag){
        Swal.fire({
            title: 'Bienvenido',
            imageUrl: '../img/racing-helmet.png',
            width: 300,
            imageWidth: 100,
            imageHeight: 100,
            timer: 1500,
            position: 'center',
            showConfirmButton: false,
            color: '#ffffff',
            timerProgressBar: true,
        }).then(() => {
                logged.estado = true
                logged.user = user
                const guardarLocal = (nombre, datos) => {sessionStorage.setItem(nombre, datos)};
                    guardarLocal("dataLogin", JSON.stringify(logged));
                window.location.href="../../index.html";
            })
    }else {
        Swal.fire({
            title: 'Error!',
            text: 'Usuario o contraseña incorrectos',
            icon: 'error',
            width: 300,
            confirmButtonText: 'Reintentar',
            footer: '<a class="text-danger" href="../views/crearUsuario.html">Crear Usuario</a>',
            confirmButtonColor: '#d33',
            color: '#ffffff'
        })
    }
    
};

const logear = document.getElementById("pass")
logear.addEventListener("keypress", function onEvent(evento) {
    if (evento.key === "Enter") {
        login();
    }
});

btnInicio.onclick = () => {
    window.location.href = "../../index.html"
}

btnPilotos.onclick = () => {
    window.location.href = "./pilotos.html"
}

btnEquipos.onclick = () => {
    window.location.href = "./views/equipos.html"
}

btnPosiciones.onclick = () => {
    window.location.href = "./posiciones.html"
}

btnRegistro.onclick = () => {
    window.location.href = "./crearUsuario.html"
}