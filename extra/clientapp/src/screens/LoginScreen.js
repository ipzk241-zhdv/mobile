import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, KeyboardAvoidingView, View } from "react-native";

export default function LoginScreen({ onSubmit }) {
    const [username, setUsername] = useState("");
    const [chatId, setChatId] = useState("");

    const handlePress = () => {
        const name = username.trim();
        const chat = chatId.trim();
        if (name && chat) {
            onSubmit({ name, chatId: chat });
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.box}>
                <Text style={styles.label}>Введіть ім'я користувача:</Text>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus
                    placeholder="Username"
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                />
                <Text style={styles.label}>Введіть ID чату:</Text>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Chat ID"
                    style={styles.input}
                    value={chatId}
                    onChangeText={setChatId}
                />
                <Button title="Підключитися" onPress={handlePress} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f4f8",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    box: {
        width: "100%",
        maxWidth: 320,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: "#333",
        fontWeight: "600",
        alignSelf: "flex-start",
    },
    input: {
        width: "100%",
        height: 44,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: "#fafafa",
        color: "#333",
    },
});
