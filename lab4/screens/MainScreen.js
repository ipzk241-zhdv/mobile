import React, { useEffect, useState, useRef } from "react";
import { Text } from "react-native";

import styled from "styled-components/native";
import { ReminderCard } from "../components/ReminderCard";

const MainScreen = ({}) => {
    return (
        <Container>
            <Caption>📝 To-Do Reminder</Caption>
            <ReminderCard caption={"test"} description={"test"} datetime={"test"}></ReminderCard>
        </Container>
    );
};

const Container = styled.View`
    padding: 20px;
`;

const Caption = styled.Text`
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    margin-vertical: 25px;
`;

export default MainScreen;
