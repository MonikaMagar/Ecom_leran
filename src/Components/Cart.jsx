import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './Cart.css';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { authContent } from '../store';

const Cart = () => {
  const { cart, setCart } = useContext(authContent);
  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  // Function to remove an item from the cart
  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.item.id !== id));
  };

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, [setCart]);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Effect to calculate total amount and delivery charges
  useEffect(() => {
    const newTotalAmount = cart.reduce((acc, { item, quantity }) => acc + (item?.price || 0) * quantity, 0);
    setTotalAmount(newTotalAmount.toFixed(2));
    setDeliveryCharge(newTotalAmount < 500 ? 100 : 0);
  }, [cart]);

  // Functions to increase and decrease quantity
  const increaseQuantity = (id) => {
    setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.item.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.item.id === id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  // If the cart is empty
  if (cart.length === 0) {
    return (
      <div className="text-center my-5">
        <div className="border border-2 bg-danger rounded-4 p-5">
          <h1 className="fw-bold text-white">Bag is Empty</h1>
          <p className="display-4">😥</p>
          <Link to="/">
            <Button className="m-5" variant="light">Shop Now</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <h3 className="cart-title">My Cart</h3>
          {cart.map(({ item, quantity }) => (
            item && (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="cart-item-details">
                  <h5 className="cart-item-title">{item.title}</h5>
                  <div className="quantity-controls">
                    <p onClick={() => increaseQuantity(item.id)}>+</p>
                    <p>{quantity}</p>
                    <p onClick={() => decreaseQuantity(item.id)}>-</p>
                    <p className="mx-3">{"$" + item.price}</p>
                  </div>
                </div>
                <RxCross2 className="fs-4" style={{ cursor: 'pointer' }} onClick={() => removeItem(item.id)} />
              </div>
            )
          ))}
        </div>
        <div className="col-lg-6 col-md-12 summary">
          <h2>Summary</h2>
          <p><b>Items: </b>{cart.length}</p>
          <p><b>Total Amount:</b> ${totalAmount}</p>
          <p><b>Delivery Charge:</b> ${deliveryCharge}</p>
          <h4><b>Grand Total: </b>${(parseFloat(totalAmount) + parseFloat(deliveryCharge)).toFixed(2)}</h4>
          <Button className="checkout-button w-100" variant="success">CheckOut</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
