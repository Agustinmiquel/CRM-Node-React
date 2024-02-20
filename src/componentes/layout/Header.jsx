import React,{useContext, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { CRMContext } from "../../context/CRMContext";

const Header = (props) => {

    let navigate = useNavigate();

    const [auth, guardarAuth] = useContext(CRMContext);

    const cerrarSesion = () => {
        // auth.auth = false y el token se remueve
        localStorage.removeItem('token');
        guardarAuth({
            token: '',
            auth: false
        });
        // localStorage.setItem('token', '');
        // redireccionar
        navigate('/iniciar-sesion',{replace:true});
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          guardarAuth({
            token,
            auth: true,
          });
        }
      }, []);

    return (
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>CRM - Administrador de Clientes</h1>


                    { auth.auth === true && localStorage.getItem('token') ? (
                        <button 
                            type="button"
                            className="btn btn-rojo"
                            onClick={cerrarSesion}
                        >
                            <i className="far fa-times-circle"></i>
                            Cerrar Sesión
                        </button>
                    ) : null                    
                    }   
                </div>
                
            </div>
        </header>
    )

}
export default Header;