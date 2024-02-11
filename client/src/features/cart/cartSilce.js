import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, action) => {
            const find = state.cart.find(item => item._id === action.payload._id)
            if (find) {
                state.cart = state.cart.map(item => {
                    if (item._id === action.payload._id) {
                        return {
                            ...item,
                            quantityInCart: item.quantityInCart + action.payload.quantityInCart < item.quantity ? item.quantityInCart + action.payload.quantityInCart : item.quantity
                        }
                    }
                    else return item
                })
            }
            else {
                state.cart = [...state.cart, { ...action.payload }]
            }
        },
        incrementQuantity: (state, action) => {
            state.cart = state.cart.map(item => {
                if (item._id === action.payload._id) {
                    return {
                        ...item,
                        quantityInCart: item.quantityInCart + 1 < item.quantity ? item.quantityInCart + 1 : item.quantity
                    }
                }
                else return item
            })
        },
        decrementQuantity: (state, action) => {
            state.cart = state.cart.map(item => {
                if (item._id === action.payload._id) {
                    return {
                        ...item,
                        quantityInCart: item.quantityInCart - 1 > 1 ? item.quantityInCart - 1 : 1
                    }
                }
                else return item
            })
        },
        changeQuantity: (state, action) => {
            state.cart = state.cart.map(item => {
                if (item._id === action.payload._id) {
                    return {
                        ...item,
                        quantityInCart: action.payload.quantityInCart < item.quantity ? action.payload.quantityInCart : item.quantity
                    }
                }
                else return item
            })
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item._id !== action.payload._id)
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    changeQuantity,
    removeItem
} = cartSlice.actions

export default cartSlice.reducer