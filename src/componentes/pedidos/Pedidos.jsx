import React, {useEffect, useState, Fragment} from 'react'
import clienteAxios from "../../config/axios";
import DetallesPedido from './DetallesPedido';
import Spinner from "../layout/Spinner";

export default function Pedidos() {

  const [pedidos, guardarPedidos] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
        // obtener los pedidos
        const resultado = await clienteAxios.get('/pedidos');
        // console.log(resultado.data)
        guardarPedidos(resultado.data.pedido);
    }
    consultarAPI();
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
