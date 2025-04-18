import styled from "styled-components/native";
import React, { useState } from "react";
import { GetIcon } from "../utils/LoadIcons";

export const TabList = ({tabList}) => {
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
    background-color: ${(props) => (props.selected ? "#2d6cdf" : props.theme.tabList)};
    padding: 12px 18px;
    border-radius: 12px;
    margin-right: 10px;
`;

const TabText = styled.Text`
    color: ${(props) => ((props.theme.text))};
    font-size: 13px;
`;