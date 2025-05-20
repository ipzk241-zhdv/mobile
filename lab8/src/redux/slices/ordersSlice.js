import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [], // { date, items, total }
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder(state, action) {
            const { items, total } = action.payload;
            const date = new Date().toISOString();
            state.orders.unshift({ date, items, total });
        },
    },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
