import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { act, useState } from 'react';

const initialState = {
    products: [],
    filteredProducts: [],
    selectedProduct: {},
    loading: false
}

const dizi = []

const BASE_URL = "https://fakestoreapi.com";

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
})

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        filterProducts: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.filteredProducts = state.products.filter(product => product.title.toLowerCase().includes(searchTerm))
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {

            state.loading = false;
            state.products = action.payload;
            state.filteredProducts = action.payload;
        })
    }
})

export const { setSelectedProduct, filterProducts } = productSlice.actions
export default productSlice.reducer