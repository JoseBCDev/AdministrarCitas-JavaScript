
//Varibles

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

eventListener();

function eventListener() {
    mascotaInput.addEventListener('input',datosCita);
    propietarioInput.addEventListener('input',datosCita);
    telefonoInput.addEventListener('input',datosCita);
    fechaInput.addEventListener('input',datosCita);
    horaInput.addEventListener('input',datosCita);
    sintomasInput.addEventListener('input',datosCita);

    formulario.addEventListener('submit',nuevaCita);
}

//Clases
class UI {

    imprimirAlerta(mensaje,tipo)
    {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert','d-block','col-12');

        if(tipo === 'error')
        {
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;

        const contenido = document.querySelector('#contenido');
        contenido.insertBefore(divMensaje,document.querySelector('.agregar-cita'));
    
    setTimeout(() => {
        divMensaje.remove();
    }, 3000);
    }
}

class Citas {
    constructor()
    {
        this.citas = [];
    }

    agregarCitas(cita)
    {
        this.citas = [...this.citas,cita];
        console.log(this.citas);
    }
}

//Instanciamos

const ui = new UI();
const administrarCitas = new Citas();

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
    
}

function nuevaCita(e) {
    e.preventDefault();
    const {mascota,propietario,telefono,fecha,hora,sintomas} = ObjCita;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '')
    {
        ui.imprimirAlerta('Todos los campos son Obligatorios','error');

        return;
    }
    //Agregando ID al objeto
    ObjCita.id = Date.now();

    //Enviando datos al arreglo
    administrarCitas.agregarCitas({...ObjCita});

    //Reiniciar Objeto
    reiniciarObjeto();

    //Reiniciar Formulario
    formulario.reset();
}

function reiniciarObjeto()
{
    ObjCita.mascota = '';
    ObjCita.propietario = '';
    ObjCita.telefono = '';
    ObjCita.fecha = '';
    ObjCita.hora = '';
    ObjCita.sintomas = '';
}



