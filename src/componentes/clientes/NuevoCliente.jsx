import React, {Fragment, useState} from 'react'
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function NuevoCliente() {

  let navigate = useNavigate();

  // cliente = state y guardarCliente=funcion para guardar el cliente
  const [cliente, guardarCliente] = useState({
    nombre: '',
    apellido:'',
    telefono:'',
    email:'',
    empresa:''
  })

  const actualizarState = e =>{
    // almacenamos lo que el usuario escribe
    guardarCliente({
      // obtener una copia del state para que no se borre los campos que ya completamos
      ...cliente,
      //  asignamos el valor de lo que el usuario esta escribiendo a la propiedad
      [e.target.name]: e.target.value
    })
  }

  // Agregar un cliente nuevo a la REST API: 
  const agregarCliente = e => {

    e.preventDefault()
    clienteAxios.post('/clientes',cliente).then(res =>{
      if(res.data.code === 11000){
        Swal.fire({
          type:'error',
          title:'Hubo un error',
          text:`El ${cliente.email} ingresado ya existe`,
        })
      } else{
        Swal.fire(
          'Se agrego el cliente',
          res.data.mensaje,
          'success'
        )
      }

      // Redireccion
      navigate('/', {replace:true});
    });
  }


  // Validar Formulario
  const validarCliente = () =>{
    // Destructuring 
    const { nombre, apellido, email, empresa, telefono} = cliente;

    // Revisar que las propiedades del state tengan algo
    let valido = !nombre.length ||  !apellido.length || !email.length||!empresa.length||!telefono.length ;
    return valido;
  }

  return (
    <Fragment>
    <h2>Nuevo Cliente</h2>

    <form onSubmit={agregarCliente}>
      
      <legend>Llena todos los campos</legend>

      <div className="campo">
          <label>Nombre:</label>
          <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} />
      </div>

      <div className="campo">
          <label>Apellido:</label>
          <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState} />
      </div>
  
      <div className="campo">
          <label>Empresa:</label>
          <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState} />
      </div>

      <div className="campo">
          <label>Email:</label>
          <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState} />
      </div>

      <div className="campo">
          <label>Teléfono:</label>
          <input type="number" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState} />
      </div>

      <div className="enviar">
              <input type="submit" className="btn btn-azul" value="Agregar Cliente" disabled={ validarCliente() } />
      </div>

    </form>

    </Fragment>
  )
}
