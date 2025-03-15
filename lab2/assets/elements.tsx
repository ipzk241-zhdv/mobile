import React from "react";
import styled from "styled-components/native"; // Use native styled-components
import { View, Text } from "react-native";
import { LoadIcons } from "../utils/LoadIcons";
import { NumberProp } from "react-native-svg";

// Load icons
const Icons = LoadIcons();

export const colors = {
  lightBackground: "white",
  darkBackground: "rgb(28, 32, 44)",
  lightText: "black",
  darkText: "white",
};

const GetIcon = (icon: string, size: NumberProp, stroke: string, fill: string) => {
  const steamIconEntry = Icons.find((icon) => icon.name === "steam");
  const Icon = steamIconEntry?.Icon;

  return Icon ? <Icon width={size} height={size} stroke={stroke} fill={fill} /> : null;
};

export const HeaderStyles = styled.View`
  background-color: ${(props) => (props.theme.darkMode ? "rgb(28, 32, 44)" : "white")};
  color: ${(props) => (props.theme.darkMode ? "white" : "black")};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 25px;
  margin-top: 20px;
`;

const HeaderTitle = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

// Main Header component with props destructuring
interface HeaderProps {
  caption: string;
}

// Main Header component
export const HeaderWithoutSearchView: React.FC<HeaderProps> = ({ caption }) => {
  
  return (
    <HeaderStyles>
      <HeaderTitle>
        {GetIcon("steam", 36, "transparent", "green")}
        <Text>{caption}</Text>
      </HeaderTitle>
    </HeaderStyles>
  );
};
