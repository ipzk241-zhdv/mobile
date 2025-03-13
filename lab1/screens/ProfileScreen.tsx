import React from "react";
import { View, Text, StyleSheet, Button, TextInput, ScrollView } from "react-native";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Реєстрація</Text>
            <ScrollView contentContainerStyle={styles.fields}>
                {["Електронна пошта", "Пароль", "Підтвердити пароль", "Прізвище", "Ім'я"].map((label, index) => (
                    <View key={index} style={styles.inputContainer}>
                        <Text style={styles.caption}>{label}</Text>
                        <TextInput style={styles.input} />
                    </View>
                ))}
                <Button title="Зареєструватись" onPress={() => {}} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },
    fields: {
        flexGrow: 1,
        justifyContent: "center",
    },
    inputContainer: {
        marginBottom: 12,
    },
    caption: {
        fontSize: 14,
        marginBottom: 8,
        fontWeight: "500",
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        fontSize: 16,
    },
    confirm: {
        marginTop: 20,
    },
});
