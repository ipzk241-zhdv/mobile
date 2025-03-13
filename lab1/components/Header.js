import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import NavigationPanel from "./Navbar";

export default function Header({activeTitle, navigation}) {
    return (
        <View>
            <View style={styles.container}>
                <Image style={styles.logo} source={require("../assets/logo.png")} />
                <Text style={styles.title}>FirstMobileApp</Text>
            </View>
            <NavigationPanel activeTitle={activeTitle} navigation={navigation}></NavigationPanel>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 60,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginTop: 30
    },
    logo: {
        width: 150,
        height: 40,
        // marginRight: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
