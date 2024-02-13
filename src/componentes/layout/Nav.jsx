import React, { useContext} from "react";
import { Link } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

export default function Nav() {

  const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth) return null;

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

