import styled from "styled-components/native";
import React, { useState } from "react";
import { useTheme } from "styled-components";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { ImageBackground } from "react-native";

export const TabList = ({tabList}) => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState("Top Sellers");

    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };
    return (
        <Tabs>
            {tabList.map((tab) => (
                <Tab key={tab} selected={activeTab === tab} onPress={() => handleTabPress(tab)}>
                    <TabText>{tab}</TabText>
                </Tab>
            ))}
        </Tabs>
    );
};

const Tabs = styled.View`
    flex-direction: row;
    margin-bottom: 10px;
`;

const Tab = styled.TouchableOpacity<{ selected?: boolean }>`
    background-color: ${(props) => (props.selected ? "#2d6cdf" : "#1f2430")};
    padding: 6px 12px;
    border-radius: 16px;
    margin-right: 10px;
`;

const TabText = styled.Text`
    color: white;
    font-size: 12px;
`;