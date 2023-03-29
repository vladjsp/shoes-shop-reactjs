import React from "react";
import Card from "../components/Card";
import RootContext from "../context";

const Favorites = () => {
  const { favorites, onAddToFavorite } = React.useContext(RootContext);

  return (
    <div className='content p-20'>
      <div className='d-flex align-center justify-between mb-40'>
        <h1>Мої закладки</h1>
      </div>
      <div className='cardContainer'>
        {favorites.map((item, index) => (
          <Card key={index} favorited={true} onFavorite={onAddToFavorite} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
