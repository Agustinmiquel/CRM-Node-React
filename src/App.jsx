import React, { Fragment } from 'react'
 
// Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom'
 
/** LAyout */
import Header from './componentes/layout/Header'
import Nav from './componentes/layout/Nav'
 
/** Componentes */
import Clientes from './componentes/clientes/Clientes'
import Productos from './componentes/productos/Productos'
import Pedidos from './componentes/pedidos/Pedidos'
import NuevoPedido from './componentes/pedidos/Nuevo-Pedido'
import NuevoCliente from './componentes/clientes/NuevoCliente'
import EditarCliente from './componentes/clientes/EditarCliente'

import NuevoProducto from './componentes/productos/Nuevo-Producto'
import EditarProducto from './componentes/productos/Editar-producto' 

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <div className='grid contenedor contenido-principal'>
          <Nav />
 
          <main className='caja-contenido col-9'>
            <Routes>
              <Route path='/' element={<Clientes />} />
              <Route path='/clientes/nuevo' element={<NuevoCliente/>}/>
              <Route path='/clientes/editar/:id' element={<EditarCliente/>}/>
              <Route path='/productos' element={<Productos />} />
              <Route path="/productos/nuevo" element={<NuevoProducto/>} />
              <Route path="productos/editar/:id" element={<EditarProducto />} />
              <Route path='/pedidos' element={<Pedidos />} />
              <Route path='/pedidos/nuevo/:id' element={<NuevoPedido />} />
            </Routes>
          </main>
        </div>
      </Fragment>
    </BrowserRouter>
  )
}
 
export default App