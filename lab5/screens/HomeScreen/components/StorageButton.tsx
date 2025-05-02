import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { LucideIcon } from "lucide-react-native";

interface Props {
    label: string;
    Icon: LucideIcon;
    color: string;
    onPress?: () => void;
}

export const StorageButton: React.FC<Props> = ({ label, Icon, color, onPress }) => {
    return (
        <ButtonContainer onPress={onPress} activeOpacity={0.7}>
            <IconWrapper style={{ backgroundColor: color }}>
                <Icon color="#fff" size={28} />
            </IconWrapper>
            <Label>{label}</Label>
        </ButtonContainer>
    );
};

const ButtonContainer = styled(TouchableOpacity)`
    align-items: center;
    margin: 10px;
    width: 100px;
`;

const IconWrapper = styled.View`
    padding: 16px;
    border-radius: 50px;
    margin-bottom: 8px;
`;

const Label = styled.Text`
    color: #000;
    font-size: 14px;
    text-align: center;
`;
