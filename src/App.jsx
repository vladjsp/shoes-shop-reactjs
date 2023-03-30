import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RootContext from "./context";
import axios from "axios";

import Header from "./components/Header";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const BASE_API_URL = "https://6421b76086992901b2ba8342.mockapi.io/";
  const FAV_BASE_API_URL = "https://6423f20f47401740432f319b.mockapi.io/";

  useEffect(() => {
    async function fetchData() {
      try {
        //mb better to use const [first, second, third] = Promise.all([firstRequest, secondRequest, thirdRequest])
        const cartResponse = await axios.get(`${BASE_API_URL}cart`);
        const favoritesResponse = await axios.get(`${FAV_BASE_API_URL}favorites`);
        const itemsResponse = await axios.get(`${BASE_API_URL}items`);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Виникла непередбачувана помилка.");
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async obj => {
    try {
      const findItem = cartItems.find(item => Number(item.trueId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.trueId) !== Number(obj.id)));
        await axios.delete(`${BASE_API_URL}cart/${findItem.id}`);
      } else {
        const { data } = await axios.post(`${BASE_API_URL}cart`, obj);
        setCartItems(prev => [...prev, data]);
      }
    } catch (error) {
      alert("Помилка при додаванні в корзину.");
      console.error(error);
    }
  };

  const onCartItemRemove = async id => {
    try {
      await axios.delete(`${BASE_API_URL}cart/${id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert("Помилка при видаленні товару з корзини.");
      console.error(error);
    }
  };

  const onChangeSearchInput = event => {
    setSearchValue(event.target.value);
  };

  const onAddToFavorite = async obj => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`${FAV_BASE_API_URL}favorites/${obj.id}`);
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(`${FAV_BASE_API_URL}favorites`, obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert("Невдалося додати до обраного ;(");
      console.error(error);
    }
  };

  const isItemInCart = id => {
    return cartItems.some(obj => Number(obj.trueId) === Number(id));
  };

  return (
    <RootContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemInCart,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}>
      <div className='wrapper clear'>
        {cartOpened && (
          <Cart
            items={cartItems}
            handleClose={() => setCartOpened(false)}
            onRemove={onCartItemRemove}
          />
        )}
        <Header handleCartOpen={() => setCartOpened(true)} />
        <Routes>
          <Route
            path=''
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }></Route>
          <Route path='favorites' element={<Favorites />}></Route>
          <Route path='orders' element={<Orders />}></Route>
        </Routes>
      </div>
    </RootContext.Provider>
  );
}

export default App;
