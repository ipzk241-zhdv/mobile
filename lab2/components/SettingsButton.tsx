import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

type SettingsButtonProps = {
    buttonName: string;
    onPress?: () => void;
};

export const SettingsButton = ({ buttonName, onPress }: SettingsButtonProps) => {
    return (
        <ButtonContainer onPress={onPress}>
            <ButtonText>{buttonName}</ButtonText>
            <Feather name="chevron-right" size={18} color="#7f8499" />
        </ButtonContainer>
    );
};

const ButtonContainer = styled(TouchableOpacity)`
    background-color: ${(props) => ((props.theme.strip))};
    padding: 20px;
    border-radius: 12px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3px;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 15px;
    font-weight: 500;
`;
