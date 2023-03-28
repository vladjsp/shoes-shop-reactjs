import { useState, useEffect } from "react";
//import { v4 as uuid } from "uuid";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    //get shop goods list from backend with fetch
    fetch("https://6421b76086992901b2ba8342.mockapi.io/items")
      .then(response => {
        return response.json();
      })
      .then(json => {
        //if data from backend goes without id's
        // const jsonWithId = json.map(item => ({
        //   ...item,
        //   id: uuid(),
        // }));
        setItems(json);
      })
      .catch(err => {
        console.log(err);
      });
    //get cart from backend with axios
    axios.get("https://6421b76086992901b2ba8342.mockapi.io/cart").then(res => {
      setCartItems(res.data);
    });
    //get favorites from backend with axios
    // axios.get("https://6421b76086992901b2ba8342.mockapi.io/favorites").then(res => {
    //   setFavorites(res.data);
    // });
  }, []);

  const onAddToCart = obj => {
    axios.post("https://6421b76086992901b2ba8342.mockapi.io/cart", obj);
    setCartItems(prev => [...prev, obj]); //setCartItems([...cartItems, obj]);
    //console.log(cartItems);
  };

  const onCartItemRemove = id => {
    //remove item from cart on backend
    axios.delete(`https://6421b76086992901b2ba8342.mockapi.io/cart/${id}`);
    //remove item from cart on frontend
    setCartItems(prev => prev.filter(item => item.id !== id)); // another way setCartItems([...cartItems, obj]);
  };

  const onChangeSearchInput = event => {
    //console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  // here i have reached project/resource limit for a free plan on mockapi so favorites feature works without backend
  const onAddToFavorite = async obj => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        //axios.delete(`https://6421b76086992901b2ba8342.mockapi.io/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(item => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://6421b76086992901b2ba8342.mockapi.io/favorites",
          obj
        );
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert("Щось пішло не так. Спробуйте пізніше.");
    }
  };

  return (
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
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }></Route>
        <Route
          path='favorites'
          element={<Favorites items={favorites} onFavorite={onAddToFavorite} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
