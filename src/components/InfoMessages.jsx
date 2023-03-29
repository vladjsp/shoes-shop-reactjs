import React from "react";
import RootContext from "../context";

const InfoMessages = ({ image, title, description }) => {
  const { setCartOpened } = React.useContext(RootContext);

  return (
    <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
      <img className='mb-20' width='120px' src={image} alt='empty cart' />
      <h2>{title}</h2>
      <p className='opacity-6'>{description}</p>
      <button className='greenButton' onClick={() => setCartOpened(false)}>
        <img src='/img/arrow.svg' alt='Arrow sign' />
        Повернутись назад
      </button>
    </div>
  );
};

export default InfoMessages;
