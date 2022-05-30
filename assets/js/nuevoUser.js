class User{
    
    constructor(usuario, contrasena){
        this.usuario = usuario
        this.contrasena = contrasena
    }  
}

function actualizarUsers(){
    let usersLocal = JSON.parse(sessionStorage.getItem('usuarios'))
    usuariosN = usuariosN.concat(usersLocal)
}

function nuevoUser(){
    let user = document.getElementById("newUser").value;
    let pass = document.getElementById("newPass").value;
    
    if(user == "" || pass == ""){

        Swal.fire({
            title: 'Error!',
            text: 'Por favor, complete ambos campos',
            icon: 'error',
            width: 300,
            confirmButtonText: 'Reintentar',
            confirmButtonColor: '#d33',
            color: '#ffffff'
        })
        
    }else{
        Swal.fire({
            title: 'Registro correcto',
            icon: 'success',
            width: 300,
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#d33',
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                usuariosN.push(new User(user,pass))
                const guardarLocal = (nombre, contrasena) => {sessionStorage.setItem(nombre, contrasena)};    
                guardarLocal("usuarios", JSON.stringify(usuariosN));
                window.location.href= "../views/login.html";
            }
        })
    }
}


let usuariosN = []
actualizarUsers()

let boton = document.getElementById('botonNew');
boton.onclick = () => {
    nuevoUser()
}

const crear = document.getElementById("newPass")
crear.addEventListener("keypress", function onEvent(evento) {
    if (evento.key === "Enter") nuevoUser();
});