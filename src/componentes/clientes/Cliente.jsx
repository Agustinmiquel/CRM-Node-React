import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

export default function Cliente({ cliente }) {
  // extraer los valores
  const { _id, nombre, apellido, empresa, email, telefono } = cliente;

  const eliminarCliente = idCliente => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-azul",
        cancelButton: "btn btn-rojo"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estas seguro?",
      text: "Un cliente eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
      clienteAxios.delete(`/clientes/${idCliente}`).then( res => {
        
        swalWithBootstrapButtons.fire({
          title: "Eliminado",
          text: `El cliente ${res.data.mensaje} fue eliminado`,
          icon: "success"
        });
      })
      }
    });
  }

  return (
    <div>
      <li className="cliente">
        <div className="info-cliente">
          <p className="nombre">
            {nombre}
            {apellido}
          </p>
          <p className="empresa">{empresa}</p>
          <p>{email}</p>
          <p>{telefono}</p>
        </div>
        <div className="acciones">
          <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Cliente
          </Link>

          <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
            <i className="fas fa-plus"></i>
            Nuevo Pedido
          </Link>
          <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarCliente(_id)}>
            <i className="fas fa-times"></i>
            Eliminar Cliente
          </button>
        </div>
      </li>
    </div>
  );
}
