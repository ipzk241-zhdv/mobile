import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity } from "react-native";
import Pusher from "pusher-js";
import pusherConfig from "../../pusher.json";

export default function ChatClientScreen({ name, chatId, onLogout }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const pusherRef = useRef(null);
    const channelRef = useRef(null);

    useEffect(() => {
        const channelName = `chat_${chatId}`;
        pusherRef.current = new Pusher(pusherConfig.key, {
            cluster: pusherConfig.cluster,
        });

        const channel = pusherRef.current.subscribe(channelName);
        channelRef.current = channel;
        
        channel.bind("pusher:subscription_succeeded", () => {
            channel.bind("join", (data) => {
                setMessages((prev) => [...prev, { action: "join", name: data.name }]);
            });

            channel.bind("part", (data) => {
                setMessages((prev) => [...prev, { action: "part", name: data.name }]);
            });
            
            channel.bind("message", (data) => {
                setMessages((prev) => [...prev, { action: "message", name: data.name, message: data.message }]);
            });
        });
        
        fetch(`${pusherConfig.restServer}/chats/${chatId}/users/${name}`, { method: "PUT" });
        getMessages();

        return () => {
            fetch(`${pusherConfig.restServer}/chats/${chatId}/users/${name}`, { method: "DELETE" });

            channel.unbind_all();
            channel.unsubscribe();
            pusherRef.current.disconnect();
        };
    }, [name, chatId]);

    const sendMessage = () => {
        if (!input.trim()) return;

        fetch(`${pusherConfig.restServer}/chats/${chatId}/users/${name}/messages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input }),
        });
        setInput("");
    };

    const getMessages = () => {
        fetch(`${pusherConfig.restServer}/chats/${chatId}/history`)
            .then((res) => res.json())
            .then((data) => setMessages(data))
            .catch(console.error);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.header}>
                <Text style={styles.title}>Чат: {chatId}</Text>
                <TouchableOpacity onPress={onLogout}>
                    <Text style={styles.logout}>Вийти</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.chatContainer}>
                {messages.map((msg, i) => {
                    if (msg.action === "message") {
                        const isOwn = msg.name === name;
                        return (
                            <View key={i} style={[styles.messageBubble, isOwn ? styles.ownMessageBubble : null]}>
                                <Text style={styles.senderName}>{msg.name}</Text>
                                <Text style={styles.messageText}>{msg.message}</Text>
                            </View>
                        );
                    } else {
                        return (
                            <View key={i} style={styles.statusMessage}>
                                <Text style={styles.statusText}>
                                    {msg.name} {msg.action === "join" ? "приєднався" : "вийшов"}
                                </Text>
                            </View>
                        );
                    }
                })}
            </ScrollView>

            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Введіть повідомлення..."
                    onSubmitEditing={sendMessage}
                />
                <Button title="Надіслати" onPress={sendMessage} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    logout: {
        color: "red",
        fontWeight: "bold",
    },
    chatContainer: {
        flex: 1,
        marginBottom: 10,
    },
    messageBubble: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        alignSelf: "flex-start",
        maxWidth: "80%",
        elevation: 1,
    },
    ownMessageBubble: {
        backgroundColor: "#DCF8C6",
        alignSelf: "flex-end",
    },
    senderName: {
        color: "#388e3c",
        fontWeight: "bold",
    },
    messageText: {
        fontSize: 16,
    },
    statusMessage: {
        alignSelf: "center",
        marginVertical: 4,
    },
    statusText: {
        fontStyle: "italic",
        color: "#666",
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 35,
    },
    input: {
        flex: 1,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 8,
        marginRight: 5,
        borderRadius: 4,
        backgroundColor: "#fff",
    },
});
