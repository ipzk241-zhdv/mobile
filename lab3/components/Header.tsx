import { GetIcon } from "../utils/LoadIcons";
import styled from "styled-components/native";
import React from "react";
import { useTheme } from "styled-components";
import { View } from "react-native";

interface HeaderProps {
    caption: string;
}

export const HeaderWithoutSearchView: React.FC<HeaderProps> = ({ caption }) => {
    const theme = useTheme();
    return (
        <HeaderStyles>
            <HeaderTitle>
                <View style={{display:"flex", flexDirection:"row"}}>
                    {GetIcon("steam", 36, "none", theme.text)}
                    <CaptionText>{caption}</CaptionText>
                </View>
            </HeaderTitle>
        </HeaderStyles>
    );
};

export const HeaderWithSearchView: React.FC<HeaderProps> = ({ caption }) => {
    const theme = useTheme();
    return (
        <HeaderStyles>
            <HeaderTitle>
                <View style={{display:"flex", flexDirection:"row"}}>
                    {GetIcon("steam", 36, "none", theme.text)}
                    <CaptionText>{caption}</CaptionText>
                </View>
                {GetIcon("search", 16, "transparent", "transparent")}
            </HeaderTitle>
        </HeaderStyles>
    );
};

const HeaderStyles = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 25px 25px 10px 25px;
    margin-top: 0px;
    background-color: ${(props) => props.theme.background};
`;

const HeaderTitle = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
    width: 100%;
    justify-content: space-between;
`;

const CaptionText = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: 25px;
    margin-left: 15px;
`;