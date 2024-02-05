import React, { Fragment, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios'
import { useNavigate } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { useParams } from 'react-router-dom';

export default function Editarproducto() {

  let navigate  = useNavigate();

  // obtener el ID del producto:
  const { id } = useParams(); 

  // producto = state, y funcion para actualizar
  const [producto, guardarProducto ] = useState({
    nombre: '',
    precio: '',
    imagen : ''
  });

  const [archivo, guardarArchivo] = useState('');

  const consultarApi = async () =>{
    const productoConsulta = await clienteAxios.get(`/productos/${id}`);
    guardarProducto(productoConsulta.data);
  }
  
    // cuando el componente carga
    useEffect(()=>{
      consultarApi()
    },[])

  const leerInformacionProducto = e => {
    guardarProducto({
      ...producto,
      [e.target.name] : e.target.value
    })
  }

  const leerArchivo = e => {
    guardarArchivo(e.target.files[0]);
  }

  const editarProducto = async e => {
    e.preventDefault();

    // crear un formdata
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);

    // almacenarlo en la BD
    try {
        const res = await clienteAxios.put(`/productos/editar/${id}`, formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        } );

        // Lanzar una alerta
        if(res.status === 200) {
            Swal.fire(
                'Editado Correctamente',
                res.data.mensaje,
                'success'
            )
        }

        // redireccionar
        navigate('/productos',{replace:true})

    } catch (error) {
        console.log(error);
        // lanzar alerta
        Swal.fire({
            type:'error',
            title: 'Hubo un error',
            text: 'Vuelva a intentarlo'
        })
    }
}

  // extraer valores del state
  const { nombre, precio, imagen } = producto;


  return (
    <Fragment>
      <h2>Editar Producto</h2>

      <form onSubmit={editarProducto} >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={leerInformacionProducto} defaultValue={nombre}/>
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" onChange={leerInformacionProducto} defaultValue={precio}/>
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    { producto.imagen ? (
                        <img src={`http://localhost:5000/${producto.imagen}`} alt="imagen" width="300" />
                    ) : null }
                    <input type="file"  name="imagen" onChange={leerArchivo} defaultValue={imagen}/>
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Guardar Producto"/>
                </div>
            </form>
    </Fragment>
  )
}
