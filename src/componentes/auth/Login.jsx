import React from 'react'

export default function Login() {

    const leerDatos = () =>{

    }

  return (
    <div className='login'>
        <h2>Iniciar Sesión</h2>

        <div className="contenedor-formulario">
            <form action="">
                <div className="campo">
                    <label>Email: </label>
                    <input type="text" placeholder='Tu correo' onChange={leerDatos} />
                </div>

                <div className="campo">
                    <label>Password: </label>
                    <input type="password" placeholder='Tu correo' onChange={leerDatos} />
                </div>
                <input type="submit" value='Iniciar sesión' className='btn btn-verde btn-block' />
            </form>
        </div>
    </div>
  )
}
