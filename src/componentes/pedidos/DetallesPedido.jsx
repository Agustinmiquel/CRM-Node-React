import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";


export default function DetallesPedido({pedido}) {

    const {cliente} = pedido;

    let navigate = useNavigate();

    const eliminarPedido = idPedido => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-azul",
            cancelButton: "btn btn-rojo"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "¿Estas seguro?",
          text: "Un pedido eliminado no se puede recuperar",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si, eliminar",
          cancelButtonText: "No, cancelar",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
          clienteAxios.delete(`/pedidos/${idPedido}`).then( res => {
            
            swalWithBootstrapButtons.fire({
              title: "Eliminado",
              text: `El pedido ${res.data.mensaje} fue eliminado`,
              icon: "success"
            });
          })
          }
          navigate('/pedidos',{replace:true})
        });
      }


    return(
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: 0192019201291201</p>
                <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>
                        {pedido.pedido.map(articulos => (
                            <li key={pedido._id+articulos.producto._id}>
                                <p>{articulos.producto.nombre} </p>
                                <p>Precio: ${articulos.producto.precio} </p>
                                <p>Cantidad: {articulos.cantidad}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="total">Total: ${pedido.total} </p>

            </div>
            <div className="acciones">
                <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarPedido(pedido._id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Pedido
                </button>
            </div>
        </li>
    )
}