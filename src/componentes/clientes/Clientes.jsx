import React, { useEffect, useState, Fragment } from "react";

// importo cliente Axios
import clientesAxios from "../../../config/axios";

import Cliente from "./Cliente";

import Spinner from "../layout/Spinner";

// import { Link } from "react-router-dom";

const Clientes = () => {

    // clientes =state, es lo que trae la Api
    // guardarClientes = funcion para guardar el state
    const [clientes, guardarClientes] = useState([]);

    useEffect(() => {
        // Query a la API
        const consultarAPI = async () => {
            const clientesConsulta = await clientesAxios.get('/clientes');
            const { data } = clientesConsulta;
            guardarClientes(data);
        }
        consultarAPI();
    }, [clientes]);

    if (!clientes.length) return <Spinner />

    return(
        <Fragment>
             <a href="/clientes/nuevo" className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </a>

            <h1 className="text-center">Clientes</h1>
            <ul className="listado-clientes">
                {clientes.map( cliente => (
                    <Cliente 
                        key={cliente._id}
                        cliente={cliente} 
                    />
                ))}
            </ul>

        </Fragment> 
    )
}

export default Clientes;