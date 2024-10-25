import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authContent = createContext();

export function Store({ children }) {
    const [state, setState] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]); // Initialize wishlist

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('https://fakestoreapi.com/products');
                setState(res.data);
            } catch (error) {
                console.log('error');
            }
        };
        getData();
    }, []);

    return (
        <authContent.Provider value={{ state, cart, setCart, wishlist, setWishlist }}>
            {children}
        </authContent.Provider>
    );
}
