import React, { useState } from 'react';
// Importando las funciones en otro archivo

export default function FormBuscarProducto({ buscarProducto, leerDatosBusqueda }) {

    const handleSubmit = (event) => {
        event.preventDefault();
        buscarProducto();
      }
    
      const handleChange = (event) => {
        leerDatosBusqueda(event.target.value);
      }
      //asdasdasd
  return (
    <form onSubmit={handleSubmit}>
      <legend>Busca un Producto y agrega una cantidad</legend>

      <div className="campo">
        <label>Productos:</label>
        <input
          type="text"
          placeholder="Nombre Productos"
          name="productos"
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="btn btn-azul btn-block"
        value="Buscar Producto"
      />
    </form>
  );
}
