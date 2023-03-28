import React from "react";
import { v4 as uuid } from "uuid";
import styles from "./Cart.module.scss";

const Cart = ({ handleClose, onRemove, items = [] }) => {
  return (
    <div className='overlay'>
      <div className={styles.cart}>
        <h2 className='d-flex justify-between mb-30'>
          Корзина{" "}
          <img className='cu-p' src='/img/btn-remove.svg' alt='Close' onClick={handleClose} />
        </h2>

        {items.length > 0 ? (
          <>
            <div className={styles.items}>
              {items.map(obj => (
                <div
                  key={uuid()}
                  className={styles.cartItem}
                  style={{ display: "flex", "aligtn-items": "center", "margin-bottom": "20px" }}>
                  <div
                    style={{ backgroundImage: `url(${obj.imgUrl})` }}
                    className={styles.cartItemImg}></div>

                  <div className='mr-20 flex'>
                    <p className='mb-5'>{obj.title}</p>
                    <b>{obj.price} грн.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className={styles.removeBtn}
                    src='/img/btn-remove.svg'
                    alt='Remove'
                  />
                </div>
              ))}
            </div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Всього:</span>
                  <div></div>
                  <b>8 997 грн. </b>
                </li>
                <li>
                  <span>ПДВ:</span>
                  <div></div>
                  <b>1500 грн. </b>
                </li>
              </ul>
              <button className={styles.greenButton}>
                Підтвердити замовлення <img src='/img/arrow.svg' alt='Arrow' />
              </button>
            </div>
          </>
        ) : (
          <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
            <img
              className='mb-20'
              width='120px'
              height='120px'
              src='/img/empty-cart.jpg'
              alt='empty cart'
            />
            <h2>Корзина пуста</h2>
            <p className='opacity-6'>Додайте товар у корзину щоб зробити замовлення.</p>
            <button className='greenButton' onClick={handleClose}>
              <img src='/img/arrow.svg' alt='Arrow sign' />
              Повернутись назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
