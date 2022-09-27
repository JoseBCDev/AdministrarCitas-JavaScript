
//Varibles

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');


eventListener();

function eventListener() {
    mascotaInput.addEventListener('input',datosCita)
}

//Objeto Cita

const ObjCita = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//Funciones

function datosCita(e){
    ObjCita[e.target.name] = e.target.value;
    console.log(ObjCita);
}



