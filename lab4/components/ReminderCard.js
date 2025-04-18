import React, { useState } from "react";
import styled from "styled-components/native";
import { Trash2, CheckCircle, Circle } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export const ReminderCard = ({ caption, description, datetime, onDelete }) => {
    const [completed, setCompleted] = useState(false);

    return (
        <Card>
            <IconButton onPress={() => setCompleted(!completed)}>
                {completed ? <CheckCircle color="green" size={24} strokeWidth={2.5} /> : <Circle color="#aaa" size={24} strokeWidth={2.5} />}
            </IconButton>
            <Content>
                <Caption>{caption}</Caption>
                <Description>{description}</Description>
                <Datetime>{datetime}</Datetime>
            </Content>
            <DeleteButton onPress={onDelete}>
                <Trash2 color="white" size={20} />
            </DeleteButton>
        </Card>
    );
};

const Card = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #fafafa;
    border-radius: 12px;
    padding: 12px;
    margin-vertical: 8px;
    elevation: 2;
    shadow-color: #000;
    shadow-opacity: 0.1;
    shadow-offset: 0px 2px;
    shadow-radius: 4px;
`;

const IconButton = styled(TouchableOpacity)`
    padding: 4px;
`;

const Content = styled.View`
    flex: 1;
    flex-direction: column;
    margin-left: 15px;
`;

const Caption = styled.Text`
    font-weight: bold;
    color: #222;
    font-size: 16px;
`;

const Description = styled.Text`
    font-size: 14px;
    color: #555;
    margin-top: 2px;
`;

const Datetime = styled.Text`
    font-size: 12px;
    color: #999;
    margin-top: 2px;
`;

const DeleteButton = styled(TouchableOpacity)`
    background-color: #e53935;
    border-radius: 20px;
    padding: 8px;
    justify-content: center;
    align-items: center;
`;
