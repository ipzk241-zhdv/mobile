import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], // { id, name, price, quantity }
    total: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            const existing = state.items.find((item) => item.id === product.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }

            cartSlice.caseReducers.updateTotal(state);
        },
        removeFromCart(state, action) {
            state.items = state.items.filter((item) => item.id !== action.payload);
            cartSlice.caseReducers.updateTotal(state);
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
            cartSlice.caseReducers.updateTotal(state);
        },
        clearCart(state) {
            state.items = [];
            state.total = 0;
        },
        updateTotal(state) {
            state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
