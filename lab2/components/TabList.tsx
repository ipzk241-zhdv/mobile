import styled from "styled-components/native";
import React, { useState } from "react";
import { useTheme } from "styled-components";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { ImageBackground } from "react-native";
import { GetIcon } from "../utils/LoadIcons";

export const TabList = ({tabList}) => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(tabList[1]);

    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };
    return (
        <Tabs horizontal showsHorizontalScrollIndicator={false}>
            {tabList.map((tab) => (
                <Tab key={tab} selected={activeTab === tab} onPress={() => handleTabPress(tab)}>
                    {/* якщо іконка з назвою tab існує, підставиться іконка, а інакше просто текст tab */}
                    <TabText>{GetIcon(tab, 16, "transparent", "transparent") ?? tab}</TabText>
                </Tab>
            ))}
        </Tabs>
    );
};

const Tabs = styled.ScrollView`
    flex-direction: row;
    margin-bottom: 10px;
`;

const Tab = styled.TouchableOpacity<{ selected?: boolean }>`
    background-color: ${(props) => (props.selected ? "#2d6cdf" : "#1f2430")};
    padding: 12px 18px;
    border-radius: 12px;
    margin-right: 10px;
`;

const TabText = styled.Text`
    color: white;
    font-size: 13px;
`;