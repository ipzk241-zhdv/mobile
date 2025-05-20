import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [], // { date, items: [{ productId, quantity }], total }
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder(state, action) {
            const { items, total, user} = action.payload;
            const date = new Date().toISOString();
            const simplifiedItems = items.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
            }));
            state.orders.unshift({ date, items: simplifiedItems, total, user });
        },
        clearOrders(state) {
            state.orders = [];
        },
    },
});

export const { addOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
