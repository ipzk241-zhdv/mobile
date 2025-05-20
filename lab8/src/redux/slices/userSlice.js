import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            const { name, email } = action.payload;
            state.name = name;
            state.email = email;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
