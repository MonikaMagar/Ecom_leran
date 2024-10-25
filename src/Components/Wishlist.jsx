import React, { useContext } from "react";
import { authContent } from "../store";
import { Button } from "react-bootstrap";
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, setWishlist, cart, setCart } = useContext(authContent);

  // Function to remove item from wishlist
  const removeFromWishlist = (itemId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== itemId);
    setWishlist(updatedWishlist);
  };

  // Function to move item from wishlist to cart
  const moveToCart = (item) => {
    setCart([...cart, { item, quantity: 1 }]);
    removeFromWishlist(item.id); 
  };

  if (wishlist.length === 0) {
    return <h2 className="text-center">Your Wishlist is Empty</h2>;
  }

  return (
    <div className="wishlist-container">
      <h2 className="text-center">My Wishlist</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {wishlist.map((item) => (
          <div className="col" key={item.id}>
            <div className="card">
              <img src={item.image} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text fw-bold">Price: ₹{item.price}</p>
                <Button variant="primary" onClick={() => moveToCart(item)}>Move to Cart</Button>
                <Button variant="danger" onClick={() => removeFromWishlist(item.id)} className="ms-2">Remove</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
