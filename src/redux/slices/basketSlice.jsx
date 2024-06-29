import { createSlice } from '@reduxjs/toolkit'
import { ReactReduxContext } from 'react-redux'
import productSlice from './productSlice'
import { FaStaylinked } from 'react-icons/fa'
import { LiaArtstation } from 'react-icons/lia'
import { accordionActionsClasses } from '@mui/material'
import { act } from 'react'

const getBasketFromStorage = () => {
    if (localStorage.getItem("basket")) {
        return JSON.parse(localStorage.getItem("basket"))
    }
    return []
}

const initialState = {
    basketProducts: getBasketFromStorage(),
    drawer: false,
    totalAmount: 0
}

const writeFromBasketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket))
}


export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findProduct = state.basketProducts && state.basketProducts.find((product) => product.id === action.payload.id)
            if (findProduct) {
                // daha önceden eklenmiştir
                const extractedbasketProducts = state.basketProducts.filter((product) => product.id !== action.payload.id)
                findProduct.count += action.payload.count
                state.basketProducts = [...extractedbasketProducts, findProduct]
                writeFromBasketToStorage(state.basketProducts)

            }
            else {
                // daha önceden eklenmemiş
                state.basketProducts = [...state.basketProducts, action.payload];
                writeFromBasketToStorage(state.basketProducts)
            }

        },
        setDrawer: (state) => {
            state.drawer = !state.drawer;
        },
        calculateBasket: (state) => {
            state.totalAmount = 0
            state.basketProducts && state.basketProducts.map((product) => {
                state.totalAmount += product.price * product.count
            })
        },
        deleteBasket: (state, action) => {

            const findProduct = state.basketProducts.find((product) => product.id === action.payload.id);
            if (findProduct) {
                state.basketProducts = state.basketProducts.filter((product) => product.id !== action.payload.id);
                writeFromBasketToStorage(state.basketProducts)

            }
        }
    },
})


export const { addToBasket, setDrawer, calculateBasket, deleteBasket } = basketSlice.actions
export default basketSlice.reducer