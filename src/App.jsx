import React, { Fragment, useContext, useState } from 'react'
 
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

import Login from './componentes/auth/Login'

import NuevoProducto from './componentes/productos/Nuevo-Producto'
import EditarProducto from './componentes/productos/Editar-producto' 

import { CRMContext, CRMProvider } from './context/CRMContext'

function App() {

  // utilizando context en el componente
  const [auth, guardarAuth] = useContext(CRMContext)


  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <CRMProvider value={[auth, guardarAuth]}>
        <div className='grid contenedor contenido-principal'>
          <Nav />
          <main className='caja-contenido col-9'>
            <Routes>
              <Route path='/' element={<Clientes />} />
              <Route path='/productos' element={<Productos />} />
              <Route path='/pedidos' element={<Pedidos />} />            
              <Route path='/iniciar-sesion' element={<Login />} />
            </Routes>
            <Routes>
            <Route path="productos/editar/:id" element={<EditarProducto />} />
            <Route path='/clientes/editar/:id' element={<EditarCliente/>}/>
            <Route path='/clientes/nuevo' element={<NuevoCliente/>}/>
            <Route path="/productos/nuevo" element={<NuevoProducto/>} />
            <Route path='/pedidos/nuevo/:id' element={<NuevoPedido />} /> 
            </Routes>
          </main>
        </div>
        </CRMProvider>
      </Fragment>
    </BrowserRouter>
  )
}
 
export default App