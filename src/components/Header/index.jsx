import React from "react";
import { Link } from "react-router-dom";
import "./Header.module.scss";

const Header = ({ handleCartOpen }) => {
  return (
    <header className='d-flex justify-between align-center p-40'>
      <Link to={"/"}>
        <div className='d-flex align-center'>
          <img width={40} height={40} src='/img/logo.png' alt='logo' />
          <div>
            <h3 className='text-uppercase'>React Sneakers</h3>
            <p className='opacity-5'>Магазин найкращих кросівок</p>
          </div>
        </div>
      </Link>
      <ul className='d-flex'>
        <li className='mr-30 cu-p' onClick={handleCartOpen}>
          <img width={18} height={18} src='/img/cart.svg' alt='cart sign' />
          <span>1205 грн.</span>
        </li>
        <Link to='/favorites'>
          <li className='mr-20 cu-p'>
            <img width={18} height={18} src='/img/heart.svg' alt='favorite page sign' />
          </li>
        </Link>
        <li>
          <img width={18} height={18} src='/img/user.svg' alt='user profile sign' />
        </li>
      </ul>
    </header>
  );
};

export default Header;
