import React, { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './Home.css';
import { authContent } from '../store';
import img from '../img/tv1.avif';
import img1 from '../img/sweatshirt.avif';
import img2 from '../img/tshrit.avif';
import img3 from '../img/ring.jpg';
import img4 from '../img/all.jpg';

const Home = ({ searchTerm }) => {
  const { state, cart, setCart, wishlist, setWishlist } = useContext(authContent);
  const [filt, setFilt] = useState("all");
  const [expanded, setExpanded] = useState({});

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

  const filtered = state.filter((item) => {
    const matchesCategory = filt === "all" || item.category === filt;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.item.id === item.id);
    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.item.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { item, quantity: 1 }]);
    }
  };

  const addToWishlist = (item) => {
    const existingWishlistItem = wishlist.find((wishlistItem) => wishlistItem.id === item.id);
    if (!existingWishlistItem) {
      setWishlist([...wishlist, item]);
    }
  };

  const toggleDescription = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCategoryClick = (category) => {
    setFilt(category);
  };

  return (
    <>
      <div className='container'>
        <h2 className="text-center mt-2 py-2 fs-1 fw-bold text-dark shadow-lg">Top Categories</h2>
      </div>
      
      <div className="d-flex justify-content-center flex-wrap mb-1">
        {/* Category Cards */}
        <div className="  category m-3" onClick={() => handleCategoryClick("all")}>
          <img src={img4} alt="All" className="category-img"  />
          <div class="tag">All</div>
        </div>
        <div className="  category m-3" onClick={() => handleCategoryClick("electronics")}>
          <img src={img} alt="Electronics" className="category-img" />
          <div class="tag">Electronics</div>
        </div>
        <div className="rounded-circle   category m-3" onClick={() => handleCategoryClick("men's clothing")}>
          <img src={img1} alt="Men's Clothing" className="category-img" />
          <div class="tag">Men's Clothing</div>
        </div>
        <div className="  category m-3" onClick={() => handleCategoryClick("women's clothing")}>
          <img src={img2} alt="Women's Clothing" className="category-img" />
          <div class="tag">Women's Clothing</div>
        </div>
        <div className="  category m-3" onClick={() => handleCategoryClick("jewelery")}>
          <img src={img3} alt="Jewelry" className="category-img" />
          <div class="tag">Jewelry</div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {filtered.map((item) => (
          <div className="col" key={item.id}>
            <div className="card">
              <img src={item.image} className="card-img-top my-3" alt={item.title} height="150px" width="100px" style={{objectFit:"contain"}} />
             
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">
                  {expanded[item.id] ? item.description : item.description.slice(0, 100) + '...'}
                  <span onClick={() => toggleDescription(item.id)} className="toggle-description text-primary">
                    {expanded[item.id] ? ' Show less' : ' Read more'}
                  </span>
                </p>
                <p className="card-text fw-bold">Price: ₹{item.price}</p>
                <Button variant="primary" onClick={() => addCart(item)}>Add to Cart</Button>
                <Button variant="warning" onClick={() => addToWishlist(item)} className="ms-2">Add to Wishlist</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
