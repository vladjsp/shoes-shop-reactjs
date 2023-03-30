import React from "react";
import Card from "../components/Card";
import axios from "axios";
import RootContext from "../context";

const FAV_BASE_API_URL = "https://6423f20f47401740432f319b.mockapi.io/";

const Orders = () => {
  const { onAddToCart } = React.useContext(RootContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${FAV_BASE_API_URL}orders`);
        setOrders(data.reduce((acc, obj) => [...acc, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Помилка при запиті замовлень!");
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className='content p-20'>
      <div className='d-flex align-center justify-between mb-40'>
        <h1>Історія замовлень</h1>
      </div>
      <div className='cardContainer'>
        {isLoading
          ? [...Array(8)]
          : orders.map((item, index) => (
              <Card key={index} onPlus={obj => onAddToCart(obj)} isLoading={isLoading} {...item} />
            ))}
      </div>
    </div>
  );
};

export default Orders;
