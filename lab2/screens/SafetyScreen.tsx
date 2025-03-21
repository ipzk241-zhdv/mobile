import React from "react";
import { View, Text } from "react-native";
import ThemedView from "../components/ThemedView";
import { SettingsButton } from "../components/SettingsButton";
import { OptionSelect } from "../components/OptionSelect";

export default function SafetyScreen() {
    return (
        <ThemedView>
            <OptionSelect optionsList={["Guard", "Confirmations"]}></OptionSelect>
            <SettingsButton buttonName="Remove Authenticator"></SettingsButton>
            <SettingsButton buttonName="My Recovery Code"></SettingsButton>
            <SettingsButton buttonName="Help"></SettingsButton>
        </ThemedView>
    );
}
