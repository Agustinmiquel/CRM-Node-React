import React, {useContext, useState} from 'react'
import clientesAxios from "../../../config/axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import { CRMContext } from "../../context/CRMContext";

export default function Login(props) {

    // Auth y Token
    const [auth, guardarAuth] = useContext(CRMContext);
    console.log(auth);

    const [credenciales, guardarCredenciales] = useState({});

    let navigate = useNavigate();


    // iniciar sesión en el servidor
    const iniciarSesion = async e =>{
        e.preventDefault();
        try {
            
            const usuario = await clientesAxios.post('/iniciar-sesion', credenciales);

            // extraer el token y colocarlo en LocalStorage
            const {token} = usuario.data;
            localStorage.setItem('token', token);

            // colocarlo en el state
            guardarAuth({
                token,
                auth: true
            })

            Swal.fire(
                'Bienvenido',
                'Has iniciado sesión',
                'success',
            )

        navigate('/',{replace:true})

        } catch (error) {
            console.log(error);
            Swal.fire({
                type:'error',
                title:'Hubo un error',
                text: error.response.data.mensaje
            })
        }
    }

    const leerDatos = e =>{
        guardarCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }

  return (
    <div className='login'>
        <h2>Iniciar Sesión</h2>

        <div className="contenedor-formulario">
            <form onSubmit={iniciarSesion}>
                <div className="campo">
                    <label>Email: </label>
                    <input type="text" name='email' placeholder='Tu correo' onChange={leerDatos} />
                </div>

                <div className="campo">
                    <label>Password: </label>
                    <input type="password" name='password' placeholder='Tu contraseña' onChange={leerDatos} />
                </div>
                <input type="submit" value='Iniciar sesión' className='btn btn-verde btn-block' />
            </form>
        </div>
    </div>
  )
}
