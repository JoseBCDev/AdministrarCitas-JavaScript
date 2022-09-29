
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

    imprimirCitas(ClaseCita)
    {
        this.limpiarHTML();

        const {citas} = ClaseCita;

        citas.forEach(cita => {
           const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;

           const divCita = document.createElement('div');
           divCita.classList.add('cita','p-3');
           divCita.dataset.id = id;
           
           const mascotaParrafo = document.createElement('h2');
           mascotaParrafo.classList.add('card-title','font-weight-bolder');
           mascotaParrafo.textContent = mascota;

           const propietarioParrafo = document.createElement('p');
           propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span>${propietario}`;
           
           const telefonoParrafo = document.createElement('p');
           telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono: </span>${telefono}`;
           
           const fechaParrafo = document.createElement('p');
           fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span>${fecha}`;
           
           const horaParrafo = document.createElement('p');
           horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span>${hora}`;
           
           const sintomasParrafo = document.createElement('p');
           sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span>${sintomas}`;

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-2');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
`
            //Accion al Boton
            btnEliminar.onclick = () =>eliminarCitas(id);

           //Agregar hijos al DIV 
           divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);

            contenedorCitas.appendChild(divCita);
           
        });
    }

    limpiarHTML()
    {
        while (contenedorCitas.firstChild)
        {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
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
    }

    eliminarCita(id)
    {
        this.citas = this.citas.filter((cita)=>cita.id !== id);
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

    //Enviando datos al arreglo //Generando copia del objeto
    administrarCitas.agregarCitas({...ObjCita});

    //Reiniciar Objeto
    reiniciarObjeto();

    //Reiniciar Formulario
    formulario.reset();

    //Mostrar Citas
    ui.imprimirCitas(administrarCitas);
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

function eliminarCitas(id) {
    //metodo eliminar de las Class Cita
    administrarCitas.eliminarCita(id);
    
    //Mostrar mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');
    //mostrar en el interfaz las nuevas Citas
    ui.imprimirCitas(administrarCitas);
}



