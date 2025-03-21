import React, { useState } from "react";
import styled from "styled-components/native";

type TabsProps = {
    optionsList: string[];
    onChange?: (selected: string) => void;
};

export const OptionSelect = ({ optionsList, onChange }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(optionsList[0]);

    const handlePress = (option: string) => {
        setActiveTab(option);
        onChange?.(option);
    };

    return (
        <TabsContainer>
            {optionsList.map((option, index) => (
                <TabButton
                    key={index}
                    active={activeTab === option}
                    onPress={() => handlePress(option)}
                >
                    <TabText active={activeTab === option}>{option}</TabText>
                </TabButton>
            ))}
        </TabsContainer>
    );
};

const TabsContainer = styled.View`
    flex-direction: row;
    background-color: rgb(45,50,70);
    border-radius: 12px;
    padding: 4px;
    align-self: center;
    margin-bottom: 16px;
`;

const TabButton = styled.TouchableOpacity<{ active: boolean }>`
    flex: 1;
    padding: 10px 16px;
    background-color: ${({ active }) => (active ? (props) => ((props.theme.background)) : "transparent")};
    border-radius: 10px;
    align-items: center;
    justify-content: center;
`;

const TabText = styled.Text<{ active: boolean }>`
    color: ${({ active }) => (active ? "white" : "#888")};
    font-weight: 600;
    font-size: 14px;
`;
