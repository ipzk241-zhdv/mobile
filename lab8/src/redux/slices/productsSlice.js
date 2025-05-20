import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [
        {
            id: "1",
            name: "Кобзар",
            description: "Автор - Тарас Шевченко",
            price: 1600,
            image: "https://schoolbook.com.ua/wp-content/uploads/image_1c/v-drodzheniy-quotkobzarquot-naypovn-sha-zb-rka-un-kalne-kolekc-yne-vidannya-prem-um-klasu/f5f18986-3fe2-11ed-ac8e-9c5c8e4f23b9.png",
        },
        {
            id: "2",
            name: "Ручка модна",
            description: "Дійсно дорога як для ручки",
            price: 9000,
            image: "https://sunlight.net/wiki/wp-content/uploads/2021/05/samie_dorogie_ruchki_3.jpg",
        },
        {
            id: "3",
            name: "Навушники",
            description: "Безпроводні, 400 мАг",
            price: 579,
            image: "https://cma.ua/content/images/1/480x480l50nn0/76728680737657.jpeg",
        },
        {
            id: "4",
            name: "Футболка",
            description: "100% бавовна, розмір М",
            price: 20,
            image: "https://checkroom.com.ua/image/cache/catalog/odyah/zhinochyy-odyah/topy-mayky-ta-futbolky/49120-103-01-593x722.jpg",
        },
        {
            id: "5",
            name: "Рюкзак",
            description: "Місткий і водостійкий",
            price: 150,
            image: "https://naturehike-ua.com.ua/ua/wa-data/public/shop/products/58/18/9001858/images/9015702/9015702.970.jpg",
        },
        {
            id: "6",
            name: "USB Флешка 64GB",
            description: "Надійне сховище",
            price: 20,
            image: "https://api.e-server.com.ua/storage/238824/rs/U0889388_big_1704289658___rs_1200_1200.jpg",
        },
        {
            id: "7",
            name: "Лампа",
            description: "Настільна, з регульованим світлом",
            price: 150,
            image: "https://his.ua/img/products/fos3zvi1V8_500_500.jpg",
        },
        {
            id: "8",
            name: "Мишка",
            description: "Кльова дротова мишка",
            price: 20,
            image: "https://shop.sven.ua/image/cache/catalog/unixml/4236/23418/misha_a4tech_n_70fx_v_track_usb_optic_2_0_chorna-420x340.jpg",
        },
    ],
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
});

export default productsSlice.reducer;
