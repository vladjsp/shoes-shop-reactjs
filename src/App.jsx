import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RootContext from "./context";
import axios from "axios";

import Header from "./components/Header";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_API_URL = "https://6421b76086992901b2ba8342.mockapi.io/";
  const FAV_BASE_API_URL = "https://6423f20f47401740432f319b.mockapi.io/";

  useEffect(() => {
    async function fetchData() {
      //get cart from backend
      const cartResponse = await axios.get(`${BASE_API_URL}cart`);
      //get favorites from backend
      const favoritesResponse = await axios.get(`${FAV_BASE_API_URL}favorites`);
      //get shop goods list from backend
      const itemsResponse = await axios.get(`${BASE_API_URL}items`);

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = obj => {
    try {
      if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`${BASE_API_URL}cart/${obj.id}`);
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post(`${BASE_API_URL}cart`, obj);
        setCartItems(prev => [...prev, obj]);
      }
    } catch (error) {}
  };

  const onCartItemRemove = id => {
    //remove item from cart on backend
    axios.delete(`${BASE_API_URL}cart/${id}`);
    //remove item from cart on frontend
    setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
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
      alert("Щось пішло не так. Спробуйте пізніше.");
    }
  };

  const isItemInCart = id => {
    return cartItems.some(obj => Number(obj.id) === Number(id));
  };

  return (
    <RootContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemInCart,
        onAddToFavorite,
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
            path='/'
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
          <Route path='/favorites' element={<Favorites />}></Route>
        </Routes>
      </div>
    </RootContext.Provider>
  );
}

export default App;
