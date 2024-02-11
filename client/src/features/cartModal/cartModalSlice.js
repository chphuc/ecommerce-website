import { createSlice } from '@reduxjs/toolkit'

export const cartModalSlice = createSlice({
    name: 'cartModal',
    initialState: {
        isOpen: false
    },
    reducers: {
        openCartModal: (state) => {
            state.isOpen = true
        },
        closeCartModal: (state) => {
            state.isOpen = false
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    openCartModal,
    closeCartModal
} = cartModalSlice.actions

export default cartModalSlice.reducer