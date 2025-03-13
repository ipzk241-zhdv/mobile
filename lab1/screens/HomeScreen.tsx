import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import NewsCard from "../components/NewsCard"

export default function HomeScreen() {
    const newsData = require("../assets/news.json");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Новини</Text>
            <FlatList
                data={newsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NewsCard title={item.title} date={item.date} shortText={item.shortText} image={item.image} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        margin: 16,
        textAlign: "center",
    },
});
