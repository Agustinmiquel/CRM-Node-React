import React, { Fragment, useState, useEffect } from "react";
import Producto from './Producto';
import clienteAxios from "../../config/axios";
import Spinner from '../layout/Spinner';


export default function Productos() {
   // productos = state, guardarproductos = funcion para guardar el state
   const [productos, guardarProductos] = useState([]);

    useEffect(() => {
      // Query a la API
      const consultarAPI = async () => {
          const productosConsulta = await clienteAxios.get('/productos');
          guardarProductos(productosConsulta.data);
      }
      consultarAPI();
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
