import { createSlice } from "@reduxjs/toolkit";

// Function to load the cart from local storage
const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        return serializedCart ? JSON.parse(serializedCart) : [];
    } catch (e) {
        console.error('Could not load cart from local storage', e);
        return [];
    }
};

// Function to save the cart to local storage
const saveCartToLocalStorage = (cart) => {
    try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem('cart', serializedCart);
    } catch (e) {
        console.error('Could not save cart to local storage', e);
    }
};

// Initial state with cart loaded from local storage
const initialState = {
    carts: loadCartFromLocalStorage()
};

// Cart slice
const cartSlice = createSlice({
    name: "cartslice",
    initialState,
    reducers: {
        // Add to cart
        addToCart: (state, action) => {
            const itemIndex = state.carts.findIndex(item => item._id === action.payload._id);
            
            if (itemIndex >= 0) {
                state.carts[itemIndex].qnty += 1;
            } else {
                const temp = { ...action.payload, qnty: 1 };
                state.carts = [...state.carts, temp];
            }

            saveCartToLocalStorage(state.carts);
        },

        // Remove from cart
        removeToCart: (state, action) => {
        
            state.carts = state.carts.filter(element => {
                if (element && element._id) {
                    return element._id !== action.payload;
                } 
            });
            saveCartToLocalStorage(state.carts);
        },

        // Remove single item
        removeSingleItem: (state, action) => {
            const itemIndex_dec = state.carts.findIndex(item => item._id === action.payload._id);
            if (state.carts[itemIndex_dec].qnty >= 1) {
                state.carts[itemIndex_dec].qnty -= 1;
            }

            saveCartToLocalStorage(state.carts);
        },

        // Empty all cart
        emptyAllCard: (state, action) => {
            state.carts = [];

            saveCartToLocalStorage(state.carts);
        }
    }
});

export const { addToCart, removeToCart, removeSingleItem, emptyAllCard } = cartSlice.actions;
export default cartSlice.reducer;
