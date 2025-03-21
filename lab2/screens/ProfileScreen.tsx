import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import ThemedView from "../components/ThemedView";
import { SettingsButton } from "../components/SettingsButton";

interface ProfileScreenProps {
    toggleTheme: () => void;
    isDarkMode: boolean;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ toggleTheme, isDarkMode }) => {
    return (
        <ThemedView>
            <AvatarContainer>
                <AvatarWrapper>
                    <Avatar
                        source={{ uri: "https://images.dwncdn.net/images/t_app-icon-l/p/e8326516-9b2c-11e6-9634-00163ec9f5fa/2059490507/rust-logo" }}
                    />
                    <OnlineIndicator color={"green"} />
                </AvatarWrapper>
                <Name>Жеребцов Дмитро</Name>
                <Name>ІПЗк-24-1</Name>
            </AvatarContainer>
            <TouchableOpacity>
                <SettingsButton buttonName="Toggle Theme" onPress={toggleTheme}></SettingsButton>
            </TouchableOpacity>
            <SettingsButton buttonName="Settings"></SettingsButton>
            <SettingsButton buttonName="Logout"></SettingsButton>
        </ThemedView>
    );
};

const AvatarContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    padding: 69px 0px 15px 0px;
`;

const AvatarWrapper = styled.View`
    position: relative;
    width: 98px;
    height: 98px;
    margin-bottom: 15px;
`;

const Avatar = styled.Image`
    width: 98px;
    height: 98px;
    border-radius: 48px;
`;

const OnlineIndicator = styled.View<{ color: string }>`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 27px;
    height: 27px;
    border-radius: 14px;
    border: 2px solid #1e1f2b;
    background-color: ${({ color }) => color};
`;

const Name = styled.Text`
    color: ${(props) => props.theme.text};
    text-align: center;
    font-size: 20px;
`;

export default ProfileScreen;
