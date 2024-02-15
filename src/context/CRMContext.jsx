import React, {useState} from "react";

const CRMContext = React.createContext([{}, () => {}]);

const CRMProvider = props => {

    const token = localStorage.getItem('token') || '';

    // definir el state inicial
    const [auth, guardarAuth]= useState({
        token:token,
        auth:token ? true : false, //va a cambiar si el token es valido o no
    });
    // rodea a todos los componentes hijos con props.children.
    return(
        <CRMContext.Provider value={[auth,guardarAuth]}>
            {props.children} 
         </CRMContext.Provider>   
    )
}

export { CRMContext, CRMProvider };