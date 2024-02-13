import React, { useEffect, useState, Fragment, useContext } from "react";

// importo cliente Axios
import clientesAxios from "../../../config/axios";

import Cliente from "./Cliente";

import Spinner from "../layout/Spinner";

import { CRMContext } from "../../context/CRMContext";
import { useNavigate } from 'react-router-dom';

const Clientes = () => {

    // clientes =state, es lo que trae la Api
    // guardarClientes = funcion para guardar el state
    const [clientes, guardarClientes] = useState([]);

    let navigate = useNavigate();

    // utilizar valores de context
    const [auth, guardarAuth] = useContext(CRMContext);

    useEffect(() => {
        if(auth.token !== ''){
        // Query a la API
        const consultarAPI = async () => {
            try {
            const clientesConsulta = await clientesAxios.get('/clientes',{
                headers:{
                    'Authorization' : `Bearer ${auth.token}`
                }
            });
            // colocar resultado en el state
            guardarClientes(clientesConsulta.data);
        } catch (error) {
            if(error.response.status == 500){
                navigate('/iniciar-sesion',{replace:true});
            }
         }        
        }
        consultarAPI();
    } else{
            navigate('/iniciar-sesion',{replace:true});
        }
    }, [clientes]);

    // si el state esta como false, para que no pase por el spinner
    if(!auth.auth){
        navigate('/iniciar-sesion',{replace:true});
    }

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