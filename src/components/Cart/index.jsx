import React from "react";
import RootContext from "../../context";
import axios from "axios";

import InfoMessages from "../InfoMessages";
import styles from "./Cart.module.scss";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const Cart = ({ handleClose, onRemove, items = [] }) => {
  const { cartItems, setCartItems } = React.useContext(RootContext);
  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("https://6423f20f47401740432f319b.mockapi.io/orders", {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderCompleted(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete("https://6421b76086992901b2ba8342.mockapi.io/cart/" + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert("Не вдалося створити замовлення :(");
    }
    setIsLoading(false);
  };

  return (
    <div className='overlay'>
      <div className={styles.cart}>
        <h2 className='d-flex justify-between mb-30'>
          Корзина
          <img className='cu-p' src='/img/btn-remove.svg' alt='Close' onClick={handleClose} />
        </h2>

        {items.length > 0 ? (
          <div className='d-flex flex-column flex'>
            <div className={styles.items}>
              {items.map(obj => (
                <div
                  key={obj.id}
                  className={styles.cartItem}
                  style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
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
              <button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>
                Підтвердити замовлення <img src='/img/arrow.svg' alt='Arrow' />
              </button>
            </div>
          </div>
        ) : (
          <InfoMessages
            title={isOrderCompleted ? "Замовлення оформлене" : "Корзина пуста"}
            image={isOrderCompleted ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
            description={
              isOrderCompleted
                ? `Ваше замовлення номер ${orderId} найближчим часом буде передане службі доставки`
                : "Додайте товар до корзини аби сформувати замовлення."
            }
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
