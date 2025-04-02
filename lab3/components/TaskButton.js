import React from "react";
import styled from "styled-components/native";
import {
    ArrowDownFromLine,
    CheckCircle,
    ChevronsLeft,
    ChevronsRight,
    Circle,
    Fingerprint,
    MapPinCheck,
    MousePointerClick,
    Scaling,
    ScanHeart,
} from "lucide-react-native";
import { View } from "react-native";

const iconMapping = {
    tenclicks: [Fingerprint, "orange"],
    doubletap: [MousePointerClick, "blue"],
    longpress: [MapPinCheck, "purple"],
    drag: [ArrowDownFromLine, "lightgreen"],
    swiperight: [ChevronsRight, "orange"],
    swipeleft: [ChevronsLeft, "blue"],
    pinch: [Scaling, "magenta"],
    score100: [ScanHeart, "orange"],
};

const getIcon = (iconName) => {
    const iconData = iconMapping[iconName];

    return iconData ? iconData : null;
};

const TaskButton = ({ goalKey, title, subtitle, isChecked, progress }) => {
    const iconData = getIcon(goalKey);
    const Icon = iconData ? iconData[0] : null;
    const iconColor = iconData ? iconData[1] : "gray";

    return (
        <Container checked={isChecked}>
            {Icon && <Icon color={iconColor} size={26} />}
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
    background-color: ${(props) => (props.checked ? "rgb(240,247,240)" : "rgb(240,240,250)")};
    padding: 12px 16px;
    border-radius: 12px;
    margin: 8px;
    border: ${(props) => (props.checked ? "1px solid #4CAF50" : "1px solid lightgray")};
`;

const TextContainer = styled.View`
    flex: 1;
    margin-left: 15px;
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
