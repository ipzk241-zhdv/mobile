import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

interface SettingsScreenProps {
    toggleTheme: () => void;
    isDarkMode: boolean;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ toggleTheme, isDarkMode }) => {
    return (
        <View><Text>Settings Screen</Text></View>
    );
};


export default SettingsScreen;
