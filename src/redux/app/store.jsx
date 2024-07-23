import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../feautures/CartSlice"

// create store
export const store = configureStore({
    reducer:{
        allCart:cartSlice
    }
})