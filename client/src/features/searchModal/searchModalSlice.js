import { createSlice } from '@reduxjs/toolkit'

export const searchModalSlice = createSlice({
    name: 'searchModal',
    initialState: {
        isOpen: false
    },
    reducers: {
        openSearchModal: (state) => {
            state.isOpen = true
        },
        closeSearchModal: (state) => {
            state.isOpen = false
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    openSearchModal,
    closeSearchModal
} = searchModalSlice.actions

export default searchModalSlice.reducer