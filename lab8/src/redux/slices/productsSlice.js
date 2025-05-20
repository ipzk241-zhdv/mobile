import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [
        {
            id: "1",
            name: "Книга",
            description: "Гарна книжка",
            price: 150,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmgkix4DEJoToCFKP-g8ztCYa9bIuxAC3pA&s",
        },
        {
            id: "2",
            name: "Ручка",
            description: "Синя ручка",
            price: 20,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmgkix4DEJoToCFKP-g8ztCYa9bIuxAC3pA&s",
        },
        {
            id: "3",
            name: "Книга",
            description: "Гарна книжка",
            price: 150,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmgkix4DEJoToCFKP-g8ztCYa9bIuxAC3pA&s",
        },
        {
            id: "4",
            name: "Ручка",
            description: "Синя ручка",
            price: 20,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmgkix4DEJoToCFKP-g8ztCYa9bIuxAC3pA&s",
        },
        {
            id: "5",
            name: "Книга",
            description: "Гарна книжка",
            price: 150,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmgkix4DEJoToCFKP-g8ztCYa9bIuxAC3pA&s",
        },
        {
            id: "6",
            name: "Ручка",
            description: "Синя ручка",
            price: 20,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmgkix4DEJoToCFKP-g8ztCYa9bIuxAC3pA&s",
        },
        {
            id: "7",
            name: "Книга",
            description: "Гарна книжка",
            price: 150,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmgkix4DEJoToCFKP-g8ztCYa9bIuxAC3pA&s",
        },
        {
            id: "8",
            name: "Ручка",
            description: "Синя ручка",
            price: 20,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmgkix4DEJoToCFKP-g8ztCYa9bIuxAC3pA&s",
        },
    ],
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
});

export default productsSlice.reducer;
