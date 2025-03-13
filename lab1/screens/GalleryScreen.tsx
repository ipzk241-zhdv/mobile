import React from "react";
import { View, Text, StyleSheet, FlatList, ImageSourcePropType } from "react-native";
import { Dimensions } from "react-native";
import { Image } from "react-native";

const images = [
    require("../assets/logo.png"),
    require("../assets/logo.png"),
    require("../assets/logo.png"),
    require("../assets/logo.png"),
    require("../assets/logo.png"),
    require("../assets/logo.png"),
    require("../assets/logo.png"),
    require("../assets/logo.png"),
    require("../assets/logo.png"),
    require("../assets/logo.png"),
    require("../assets/logo.png"),
];

const { width } = Dimensions.get("window");
const imageSize = width / 2 - 15;

export default function GalleryScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Image source={item} style={styles.image} />
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    listContainer: {
        paddingBottom: 20,
    },
    imageContainer: {
        flex: 1,
        marginBottom: 15,
        marginHorizontal: 5,
    },
    image: {
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        objectFit: "contain",
    },
});
