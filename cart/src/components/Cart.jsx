// cart facade providing a simplified interface
import { useEffect, useState } from "react";
import { currency } from "shell/public-api";
import { clearCart, getCart } from "../public-api";
import 'tailwindcss/tailwind.css';
import { fetchProducts } from "../ACL/api";

const Cart = () => {
  const [items, setItems] = useState(undefined);
  const [showCart, setShowCart] = useState(false);

  const getItems = async () => {
    const data = await fetchProducts(getCart);
    setItems(data);
  }

  useEffect(() => {
    getItems();
    // enable below line to able to fetch cart state every 2 second interval as this application is currently not using any state management tool like redux
    // setInterval(getItems, 2000);
  }, []);
  return (
    <div className="">
      <div
        onClick={() => {
          if(items.length>0){
            setShowCart(!showCart)
          }
        }}
        className="m-4 bg-red-600 text-sm text-white w-fit p-4 rounded-md font-bold cursor-pointer"
      >
        Show Cart
      </div>
      {showCart && (
        <>
          <div className="flex-col absolute right-10 top-32 z-20 bg-white border-2 rounded-md border-green-600">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 justify-between items-start px-4 py-4 bg-gray-600/10 m-4 rounded-md"
              >
                <div className="flex gap-4 text-white text-[20px]">
                  <p className="bg-red-400 p-1 rounded-full w-6 h-6 flex items-center justify-center">
                    {item.quantity}
                  </p>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[100px] aspect-square"
                  />
                </div>
                <div className="flex flex-col justify-end items-end">
                  <div className="text-white bg-red-600 p-2 text-sm shadow-md rounded-md rotate-45 translate-x-10 -translate-y-4">{item.version === "2" && "Discount"}</div>
                  <div className="text-sm text-blue-600">{item.name}</div>
                  <div className="text-green-800 font-mono">
                    {item.currency && item.currency === 'INR' ? `Rs ${item.quantity * item.price}` : currency.format(item.quantity * item.price)}
                  </div>
                </div>
              </div>
            ))}
            <div className="m-4">
              <button onClick={()=>{
                setItems(clearCart());
                setShowCart(false);
              }} className="bg-white border-2 border-green-800 rounded-md p-4 text-sm font-bold cursor-pointer text-green-800">Clear Cart</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Cart;
