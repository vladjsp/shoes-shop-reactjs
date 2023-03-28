import { useState } from "react";
import styles from "./Card.module.scss";

const Card = props => {
  const { id, title, price, imgUrl, onFavorite, onPlus, favorited = false } = props;

  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
    onPlus({ title, imgUrl, price });
    setIsInCart(!isInCart);
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imgUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt='Unliked' />
      </div>
      <img width={133} height={112} src={imgUrl} alt='Sneakers' />
      <h5>{title}</h5>
      <div className='d-flex justify-between align-center'>
        <div className='d-flex flex-column'>
          <span>Ціна:</span>
          <b>{price} грн.</b>
        </div>
        <img
          className={styles.plus}
          src={isInCart ? "/img/btn-checked.svg" : "/img/plus.svg"}
          alt='Plus'
          onClick={onClickPlus}
        />
      </div>
    </div>
  );
};

export default Card;