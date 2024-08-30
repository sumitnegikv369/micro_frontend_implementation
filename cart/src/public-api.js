const API_SERVER = "http://localhost:8080";

export const getCart = () =>
  fetch(`${API_SERVER}/cart`).then((res) => res.json());

export const addToCart = (id) =>
  fetch(`${API_SERVER}/cart`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
      },
    body: JSON.stringify({ id }),
  }).then((res) => res.json()).then(()=>{
    getCart();
  });

export const clearCart = () => 
    fetch(`${API_SERVER}/cart`, {
        method: "DELETE",
      }).then((res) => res.json()).then(()=>{
        getCart();
      });