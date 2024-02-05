import React from "react";
import { Link } from "react-router-dom";


export default function Nav() {
  return (
    <div className="grid contenedor contenido-principal">
    <aside className="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">
                <Link to={"/"} className="clientes">Clientes</Link>
                <Link to={"/productos"} className="productos">Productos</Link>
                <Link to={"/pedidos"} className="pedidos">Pedidos</Link>
            </nav>
        </aside>
      </div>
  )
}

