import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
  HomePage,
  CartPage,
  CheckoutPage,
  AboutPage,
  SingleProductPage,
  ProductsPage,
  ErrorPage,
  PrivateRoute,
} from './pages'

import styled from 'styled-components'

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/products' element={<ProductsPage />} />
        <Route exact path='/products/:id' element={<SingleProductPage />} />
        <Route exact path='/about' element={<AboutPage />} />

        <Route exact path='/checkout' element={<CheckoutPage />} />
        <Route exact path='/cart' element={<CartPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
