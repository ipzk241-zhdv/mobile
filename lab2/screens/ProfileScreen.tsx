import React from "react";
import { Button, View } from "react-native";
import styled from "styled-components/native";

interface ProfileScreenProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

// Themed контейнер
const ThemedView = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  padding: 20px;
`;

// Themed текст
const ThemedText = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 20px;
  margin-bottom: 20px;
`;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ toggleTheme, isDarkMode }) => {
  return (
    <ThemedView>
      <ThemedText>ProfileScreen</ThemedText>
      <Button
        title={isDarkMode ? "toggle theme" : "toggle theme"}
        onPress={toggleTheme}
        color={isDarkMode ? "#ccc" : "#333"}
      />
    </ThemedView>
  );
};

export default ProfileScreen;
