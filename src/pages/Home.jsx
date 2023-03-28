import React from "react";
import Card from "../components/Card";

const Home = ({
  items,
  searchValue,
  setSearchValue,
  onAddToCart,
  onAddToFavorite,
  onChangeSearchInput,
}) => {
  return (
    <div className='content p-20'>
      <div className='d-flex align-center justify-between mb-40'>
        <h1>{searchValue ? `Пошук по запиту: "${searchValue}"` : "Всі кросівки"}</h1>
        <div className='search-block d-flex'>
          <img src='/img/search.svg' alt='Search' />
          {searchValue && (
            <img
              onClick={() => {
                setSearchValue("");
              }}
              className='clear cu-p'
              src='/img/btn-remove.svg'
              alt='clear button'
            />
          )}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder='Пошук...' />
        </div>
      </div>
      <div className='cardContainer'>
        {items
          .filter(sneakersObj =>
            sneakersObj.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map(sneakersObj => (
            <Card
              key={sneakersObj.id}
              title={sneakersObj.title}
              price={sneakersObj.price}
              imgUrl={sneakersObj.imgUrl}
              onFavorite={obj => onAddToFavorite(obj)}
              onPlus={obj => onAddToCart(obj)} //тут можна передати і сам об'єкт sneakersObj, а не витягувать з компоненту
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
