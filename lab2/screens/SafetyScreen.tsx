import React from "react";
import { View, Text } from "react-native";
import ThemedView from "../components/ThemedView";
import { SettingsButton } from "../components/SettingsButton";
import { OptionSelect } from "../components/OptionSelect";
import styled from "styled-components/native";
import GuardCode from "../components/GuardCode";


export default function SafetyScreen() {
    return (
        <ThemedView>
            <OptionSelect optionsList={["Guard", "Confirmations"]}></OptionSelect>
            <GuardCode></GuardCode>
            <RegularText>You'll enter your code each time you enter your password to sign in to your Steam account.</RegularText>
            <BlueText>Tip: If you don't share your PC, you can select "Remember my password" when you sign in to the PC client to enter your password and authenticator code less often.</BlueText>
            <SettingsButton buttonName="Remove Authenticator"></SettingsButton>
            <SettingsButton buttonName="My Recovery Code"></SettingsButton>
            <SettingsButton buttonName="Help"></SettingsButton>
        </ThemedView>
    );
}

const RegularText = styled.Text`
    color: ${(props) => ((props.theme.text))};
    line-height: 20px;
    margin-top: 20px;
`

const BlueText = styled.Text`
    color: rgb(47,180,241);
    line-height: 20px;
    margin: 14px 0px 24px 0px;
`