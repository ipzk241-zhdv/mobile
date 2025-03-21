import React from "react";
import { View, Text, ScrollView } from "react-native";
import ThemedView from "../components/ThemedView";
import { ChatScroll } from "../components/ChatScroll";
import { OptionSelect } from "../components/OptionSelect";

export default function ChatScreen() {
    return (
        <ScrollView>
            <ThemedView>
                <OptionSelect optionsList={["Open chats", "My friends"]}></OptionSelect>
                <ChatScroll></ChatScroll>
            </ThemedView>
        </ScrollView>
    );
}
