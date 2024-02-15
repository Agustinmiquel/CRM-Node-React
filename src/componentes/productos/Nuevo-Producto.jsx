import React, {Fragment, useState,} from 'react'
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios'
import { useNavigate } from 'react-router-dom';

export default function NuevoProducto() {

  let navigate = useNavigate();

  const [producto, guardarproducto] = useState({
    nombre: '',
    precio:''
  })
  
  
  const [archivo,guardararchivo] = useState('');


  // leer los datos del formulario
  const leerinformacionProducto = e => {
    guardarproducto({
      // obtener copia del state y agregando el nuevo
      ...producto,
      [e.target.name]: e.target.value
    })

  } 
  // coloca la imagen en el state
  const leerArchivo = e => {
    // con un console log al e.target.files podemos ver que archivo nos trae al subir un archivo
    guardararchivo( e.target.files[0] )
  }

  // almacena nuevo producto y sube una img a la base de datos
  const agregarProducto = async e => {
    e.preventDefault();
    // crear un formdata. Si o si se almacena como tal.
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio',producto.precio);
    formData.append('imagen', archivo);

    // almacenar
    try {
      const res = await clienteAxios.post('/productos', formData, {
        // configuracion de Axios
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    } );

    // Lanzar una alerta
    if(res.status === 200) {
        Swal.fire(
            'Agregado Correctamente',
            res.data.mensaje,
            'success'
        )
    }
    // Redireccion
    navigate('/productos', {replace:true});
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
    // // verificar si el usuario esta autenticado o no
    // if(!auth.auth && (localStorage.getItem('token') === auth.token)){
    //   navigate('iniciar-sesion',{replace:true});
    // }

  return (
    <Fragment>
       <main className="caja-contenido col-9">
            <h2>Nuevo Producto</h2>

            <form onSubmit={agregarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={leerinformacionProducto}/>
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" onChange={leerinformacionProducto}/>
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  name="imagen" onChange={leerArchivo}/>
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
                </div>
            </form>
        </main>
    </Fragment>
  )
}
