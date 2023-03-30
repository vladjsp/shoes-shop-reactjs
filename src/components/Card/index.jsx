import React, { useState } from "react";
import ContentLoader from "react-content-loader";
import RootContext from "../../context";

import styles from "./Card.module.scss";

const Card = ({
  id,
  title,
  price,
  imgUrl,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) => {
  const { isItemInCart } = React.useContext(RootContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  //solve mockapi.io behavior
  const itemsObj = { id, trueId: id, title, imgUrl, price };

  const onClickPlus = () => {
    onPlus(itemsObj);
  };

  const onClickFavorite = () => {
    onFavorite(itemsObj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox='0 0 155 265'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'>
          <rect x='1' y='0' rx='10' ry='10' width='155' height='155' />
          <rect x='0' y='167' rx='5' ry='5' width='155' height='15' />
          <rect x='0' y='187' rx='5' ry='5' width='100' height='15' />
          <rect x='1' y='234' rx='5' ry='5' width='80' height='25' />
          <rect x='124' y='230' rx='10' ry='10' width='32' height='32' />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img src={isFavorite ? "img/liked.svg" : "img/unliked.svg"} alt='Unliked' />
            </div>
          )}
          <img width={133} height={112} src={imgUrl} alt='Sneakers' />
          <h5>{title}</h5>
          <div className='d-flex justify-between align-center'>
            <div className='d-flex flex-column'>
              <span>Ціна:</span>
              <b>{price} грн.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                src={isItemInCart(id) ? "img/btn-checked.svg" : "img/plus.svg"}
                alt='Plus'
                onClick={onClickPlus}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
