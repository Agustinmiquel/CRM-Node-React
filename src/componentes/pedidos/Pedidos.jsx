import React, {useEffect, useState, Fragment, useContext} from 'react'
import clienteAxios from "../../config/axios";
import DetallesPedido from './DetallesPedido';
import Spinner from "../layout/Spinner";

import { CRMContext } from "../../context/CRMContext";
import { useNavigate } from 'react-router-dom';

export default function Pedidos() {

  const [pedidos, guardarPedidos] = useState([]);

  let navigate = useNavigate();

  // utilizar valores de context
  const [auth, guardarAuth] = useContext(CRMContext);

  useEffect(() => {
    if(auth.token !== ''){
      const consultarAPI = async () => {
        try {
          // obtener los pedidos
        const resultado = await clienteAxios.get('/pedidos',{
          headers:{
              'Authorization' : `Bearer ${auth.token}`
          }
      });
        // console.log(resultado.data)
        guardarPedidos(resultado.data.pedido);
        } catch (error) {
          if(error.response.status == 500){
            navigate('/iniciar-sesion',{replace:true});
        }
        }
        
    }
    consultarAPI(); 
  } else {
      navigate('/iniciar-sesion',{replace:true});} 
    }, []);

if (!pedidos.length) return <Spinner />

  return (
    <Fragment>
        <h2>Pedidos</h2>

        <ul className="listado-pedidos">
            {pedidos.map( (pedido) => ( 
              <DetallesPedido key={pedido._id} pedido={pedido}/>
      ))}
        </ul>
    </Fragment>
  )
}
