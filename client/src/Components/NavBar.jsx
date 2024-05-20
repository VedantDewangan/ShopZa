import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HamBurger } from './HamBurger';

export const NavBar = ({ page }) => {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (item) => {
    setHovered(item);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <>
      <div className='NavbarPage' style={{ height: "80px" }} >
        <HamBurger page={page} />
        <ul className='NavbarList'>
          <li
            style={{
              opacity: page === 'Home' || hovered === 'Home' ? 1 : 0.6,
            }}
            onMouseEnter={() => handleMouseEnter('Home')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={'/'}>HOME</Link>
          </li>
          <li
            style={{
              opacity: page === 'About' || hovered === 'About' ? 1 : 0.6,
            }}
            onMouseEnter={() => handleMouseEnter('About')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={'/about-us'}>ABOUT US</Link>
          </li>
          <li
            style={{
              opacity: page === 'Contact' || hovered === 'Contact' ? 1 : 0.6,
            }}
            onMouseEnter={() => handleMouseEnter('Contact')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={'/contact-us'}>CONTACT US</Link>
          </li>
        </ul>
        <Link className='Logo' to={"/"} page="Home" >SHOP<span style={{ color: "red" }} >ZA</span></Link>
        <ul className='NavbarList'>
          <li
            style={{
              opacity: page === 'Orders' || hovered === 'Order' ? 1 : 0.6,
            }}
            onMouseEnter={() => handleMouseEnter('Order')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={'/orders'}>ORDERS</Link>
          </li>
          <li
            style={{
              opacity: page === 'Cart' || hovered === 'Cart' ? 1 : 0.6,
            }}
            onMouseEnter={() => handleMouseEnter('Cart')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={'/cart'}>CART</Link>
          </li>


          <li
            style={{
              opacity: page === 'Wishlist' || hovered === 'Wishlist' ? 1 : 0.6,
            }}
            onMouseEnter={() => handleMouseEnter('Wishlist')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={'/Wishlist'}>WISHLIST</Link>
          </li>


          <li
            style={{
              opacity: page === 'Login' || hovered === 'Login' ? 1 : 0.6,
            }}
            onMouseEnter={() => handleMouseEnter('Login')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={'/login'}>{
              localStorage.getItem("ShopZa") ? "LOGOUT" : "LOGIN"
            }</Link>
          </li>
        </ul>
      </div>
    </>
  );
};
