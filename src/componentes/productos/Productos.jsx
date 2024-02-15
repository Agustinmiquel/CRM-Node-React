import React, { Fragment, useState, useEffect, useContext } from "react";
import Producto from './Producto';
import clienteAxios from "../../config/axios";
import Spinner from '../layout/Spinner';
import { CRMContext } from "../../context/CRMContext";
import { useNavigate } from 'react-router-dom';


export default function Productos() {
   // productos = state, guardarproductos = funcion para guardar el state
   const [productos, guardarProductos] = useState([]);
   
      let navigate = useNavigate();

   const [auth, guardarAuth] = useContext(CRMContext);

    useEffect(() => {
      if(auth.token !== ''){
      // Query a la API
      const consultarAPI = async () => {
        try {
          const productosConsulta = await clienteAxios.get('/productos',{
            headers:{
                'Authorization' : `Bearer ${auth.token}`
            }
        });
          guardarProductos(productosConsulta.data);
        } catch (error) {
          if(error.response.status == 500){
            navigate('/iniciar-sesion',{replace:true});
        }
        }  
      }
      consultarAPI();
  } else{
    navigate('/iniciar-sesion',{replace:true});}
  }, [productos]);

  // spinner de carga
  if(!productos.length) return <Spinner /> 

  return (
    <Fragment>
            <a href="/productos/nuevo" className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </a>
            <h1 className="text-center">Productos</h1>
            <ul className="listado-productos">
              {productos.map(producto => (
                      <Producto 
                          key={producto._id}
                          producto={producto}
                      />
                  ))}
            </ul>
    </Fragment>
  )
}
