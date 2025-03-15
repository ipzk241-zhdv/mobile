import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const NewsCard = ({ title, date, shortText, image }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.shortText}>{shortText}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 110,
        borderRadius: 10,
        marginBottom: 10,
        marginRight: 20,
        objectFit: "contain",
        tintColor: "gray"
    },
    textContainer: {
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        color: "gray",
        marginBottom: 10,
    },
    shortText: {
        fontSize: 14,
        color: "#333",
    },
});

export default NewsCard;
