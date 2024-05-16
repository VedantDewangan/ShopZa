import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from './Pages/Home'
import "./index.css"
import { AboutUs } from './Pages/AboutUs'
import { ContactUs } from './Pages/ContactUs'
import { Orders } from './Pages/Orders'
import { Cart } from './Pages/Cart'
import { Login } from './Pages/Login'
import { Wishlist } from './Pages/Wishlist'
import { SingleProductFull } from './Components/SingleProductFull'
import { SingleTypePage } from './Pages/SingleTypePage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/Wishlist' element={<Wishlist />} />
          <Route path='/login' element={<Login />} />
          <Route path={`/product/:id`} element={<SingleProductFull />} />
          <Route path={'/:name'} element={<SingleTypePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App