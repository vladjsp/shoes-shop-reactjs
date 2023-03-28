import React from "react";
import Card from "../components/Card";

const Favorites = ({ items, onAddToFavorite }) => {
  return (
    <div className='content p-20'>
      <div className='d-flex align-center justify-between mb-40'>
        <h1>Мої закладки</h1>
      </div>
      <div className='cardContainer'>
        {items.map((item, index) => (
          <Card key={index} favorited={true} onFavorite={onAddToFavorite} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
