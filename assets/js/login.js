let usuarios = [{usuario: "admin", contrasena: "admin"}]


function actualizarUsers(){
        let usersLocal = JSON.parse(sessionStorage.getItem('usuarios'))
        if(usersLocal == null){
            const guardarLocal = (nombre, contrasena) => {sessionStorage.setItem(nombre, contrasena)};
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
            timer: 2000,
            position: 'center',
            showConfirmButton: false,
            color: '#ffffff',
            timerProgressBar: true,
        }).then(() => {
                window.location.href="../views/cargarDatos.html";
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