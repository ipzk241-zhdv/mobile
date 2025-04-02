import React from "react";
import styled from "styled-components/native";
import { CheckCircle, Circle, ThumbsUp } from "lucide-react-native";
import { View } from "react-native";

const TaskButton = ({ title, subtitle, isChecked, progress }) => {
    return (
        <Container checked={isChecked}>
            <TextContainer>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
                {progress !== undefined && (
                    <ProgressBarContainer>
                        <ProgressBarFill progress={progress} />
                    </ProgressBarContainer>
                )}
            </TextContainer>
            {isChecked && <CheckCircle color="#4CAF50" size={24} />}
            {!isChecked && <Circle color="gray" size={24} />}
        </Container>
    );
};

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${(props) => (props.checked ? "rgb(240,247,240)" : "rgb(240,240,250)")};;
    padding: 12px 18px;
    border-radius: 12px;
    margin: 8px;
    border: ${(props) => (props.checked ? "1px solid #4CAF50" : "1px solid lightgray")};
`;

const TextContainer = styled.View`
    flex: 1;
    margin-left: 10px;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const Subtitle = styled.Text`
    font-size: 14px;
    color: gray;
`;

const ProgressBarContainer = styled.View`
    width: 90%;
    height: 6px;
    background-color: #ccc;
    border-radius: 3px;
    margin-top: 10px;
`;

const ProgressBarFill = styled.View`
    height: 100%;
    background-color: #4caf50;
    border-radius: 3px;
    width: ${(props) => props.progress}%;
`;

export default TaskButton;
