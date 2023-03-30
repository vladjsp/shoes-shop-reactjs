import React from "react";

import Card from "../components/Card";

const Home = ({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToCart,
  onAddToFavorite,
  isLoading,
}) => {
  const renderItems = () => {
    const filteredItems = items.filter(item =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={obj => onAddToFavorite(obj)}
        onPlus={obj => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className='content p-20'>
      <div className='d-flex align-center justify-between mb-40'>
        <h1>{searchValue ? `Пошук по запиту: "${searchValue}"` : "Всі кросівки"}</h1>
        <div className='search-block d-flex'>
          <img src='img/search.svg' alt='Search' />
          {searchValue && (
            <img
              onClick={() => {
                setSearchValue("");
              }}
              className='clear cu-p'
              src='img/btn-remove.svg'
              alt='clear button'
            />
          )}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder='Пошук...' />
        </div>
      </div>
      <div className='cardContainer'>{renderItems()}</div>
    </div>
  );
};

export default Home;
