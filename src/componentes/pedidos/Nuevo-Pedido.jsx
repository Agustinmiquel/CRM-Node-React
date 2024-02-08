import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from "./FormCantidadProducto";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

export default function NuevoPedido() {
  // extraer el ID del cliente
  const { id } = useParams();

  let navigate = useNavigate();

  const [cliente, guardarCliente] = useState({});
  const [busqueda, guardarBusqueda] = useState('');
  const [productos, guardarProductos] = useState([]);
  const [total, guardarTotal] = useState(0);

  useEffect(() => {
    const consultarApi = async () => {
      const resultado = await clienteAxios.get(`/clientes/${id}`);
      guardarCliente(resultado.data);
    };
    consultarApi();
    // llama la funcion al haber una accion y se produce el efecto.
    actualizarTotal()
  }, [productos]);

  const buscarProducto = async e => {
    e.preventDefault();

    // obtener los productos de la busqueda
    const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
    console.log(resultadoBusqueda);

    if (resultadoBusqueda.data[0]) {

      let productoResultado = resultadoBusqueda.data[0];
      productoResultado.producto = resultadoBusqueda.data[0]._id;
      productoResultado.cantidad = 0;

        console.log(resultadoBusqueda.data[0]) //para ver que props me trae
        console.log(productoResultado); //para ver las posiciones y valores de las props

        // ponerlo en el state. Obtenemos una copia de los productos para que no se
        // reemplacen, si busco "angular" y despues "node", que este ultimo no reemplace, sino que angular se agregue al array
        guardarProductos([...productos, productoResultado])
    } else {
      Swal.fire({
        type: "error",
        title: "No hay resultados",
        text: `El producto ${busqueda} no existe`,
      });
    }
  };

  // almacenar la busqueda en el state
  const leerDatosBusqueda = e => {
    guardarBusqueda(e.target.value);
  };

  // actualizar cantidad de productos
  const restarProductos = i => {
    const todosProductos = [...productos]
    if(todosProductos[i].cantidad === 0) return;

    todosProductos[i].cantidad--;

    guardarProductos(todosProductos)
  }

  const aumentarProductos = i =>{
    const todosProductos = [...productos]

    todosProductos[i].cantidad++;

    guardarProductos(todosProductos)

  }

  const actualizarTotal = () => {
    if(productos.length === 0){
      guardarTotal(0);
      return; //para que no se siga ejecutando
    }

    // calcular en nuevo total
    let nuevoTotal = 0;

    // recorrer todos los productos cantidades y precio
    productos.map(producto => nuevoTotal+= (producto.cantidad * producto.precio));
    // almacenar el total
    guardarTotal(nuevoTotal);

  }
  // eliminar producto
  const eliminarProductoPedido = id =>{
    const todosProducto = productos.filter(producto => producto.producto !== id);
    guardarProductos(todosProducto);
  }

  // Almacenar el pedido:
    const realizarPedido = async e =>{
      e.preventDefault()

      const pedido = {
        "cliente" : id, 
        "pedido" : productos, 
        "total" : total
    }

    // almacenarlo en la BD
    const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

    // leer resultado
    if(resultado.status === 200) {
        // alerta de todo bien
        Swal.fire({
            type: 'success',
            title: 'Pedido creado',
            text: resultado.data.mensaje
        })
    } else {
        // alerta de error
        Swal.fire({
            type: 'error',
            title: 'Hubo un Error',
            text: 'Vuelva a intentarlo'
        })
    }
    navigate('/pedidos',{replace:true})
  }

  return (
    <div>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>
          {cliente.nombre} {cliente.apellido}
        </p>
        <p>Telefono: {cliente.telefono}</p>
      </div>

      <FormBuscarProducto
        buscarProducto={buscarProducto}
        leerDatosBusqueda={leerDatosBusqueda}
      />
      <ul className="resumen">
        {productos.map((producto, index)=>( 
          <FormCantidadProducto
          key={producto.producto}
          producto={producto}
          restarProductos = {restarProductos}
          aumentarProductos = {aumentarProductos}
          eliminarProductoPedido = {eliminarProductoPedido}
          index={index}
          />
        ))}
      </ul>
      <p className="total">Total a pagar: <span>${total}</span></p>
      {total > 0 ? (<form onSubmit={realizarPedido}>
        <input type="submit" className="btn btn-verde btn-block"
        value="Confirmar pedido" />
      </form>) : null }
    </div>
  );
}
