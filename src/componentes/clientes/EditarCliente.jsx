import React, {Fragment, useEffect, useState} from 'react'
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function EditarCliente() {

    let navigate = useNavigate();
    
    //Extraer el ID
    const { id } = useParams(); 

  // cliente = state y guardarCliente=funcion para guardar el cliente
  const [cliente, datosCliente] = useState({
    nombre: '',
    apellido:'',
    telefono:'',
    email:'',
    empresa:''
  })

    //Query a la API
    const consultarApi = async ()=>{
        const clienteconsulta = await clienteAxios.get(`/clientes/${id}`);
        // console.log(clienteconsulta.data);

        // colocar en el state
        datosCliente(clienteconsulta.data);
    }

    // UseEffect cuando el componente carga
    useEffect(()=> {
        consultarApi();
    }, [id]);

  const actualizarState = e =>{
    // almacenamos lo que el usuario escribe
    datosCliente({
      // obtener una copia del state para que no se borre los campos que ya completamos
      ...cliente,
      //  asignamos el valor de lo que el usuario esta escribiendo a la propiedad
      [e.target.name]: e.target.value
    })
  }

  // Validar Formulario
  const validarCliente = () =>{
    // Destructuring 
    const { nombre, apellido, email, empresa, telefono} = cliente;

    // Revisar que las propiedades del state tengan algo
    return !nombre.length ||  !apellido.length || !email.length||!empresa.length||!telefono.length ;
  }


  const actualizarCliente = e => {
    e.preventDefault();

    // enviar petición por axios
    clienteAxios.put(`/clientes/${cliente._id}`, cliente) 
        .then(res => {
            // validar si hay errores de mongo 
            if(res.data.code === 11000) {
                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: 'Ese cliente ya esta registrado'
                })
            } else {
                Swal.fire(
                    'Correcto',
                    'Se actualizó Correctamente',
                    'success'
                )
            }

            // redireccionar
            navigate('/', {replace:true});
        })
    }

  return (
    <Fragment>
    <h2>Editar Cliente</h2>

    <form  onSubmit={actualizarCliente}>
      
      <legend>Llena todos los campos</legend>

      <div className="campo">
          <label>Nombre:</label>
          <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState}  defaultValue={cliente.nombre}/>
      </div>

      <div className="campo">
          <label>Apellido:</label>
          <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState}  defaultValue={cliente.apellido}/>
      </div>
  
      <div className="campo">
          <label>Empresa:</label>
          <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState}  defaultValue={cliente.empresa}/>
      </div>

      <div className="campo">
          <label>Email:</label>
          <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState} defaultValue={cliente.email}/>
      </div>

      <div className="campo">
          <label>Teléfono:</label>
          <input type="number" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState} defaultValue={cliente.telefono}/>
      </div>

      <div className="enviar">
              <input type="submit" className="btn btn-azul" value="Guardar Cambios" disabled={ validarCliente() }/>
      </div>

    </form>

    </Fragment>
  )
}
