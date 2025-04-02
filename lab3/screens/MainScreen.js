import React, { useState } from "react";
import { Animated, Button } from "react-native";
import {
    GestureHandlerRootView,
    TapGestureHandler,
    LongPressGestureHandler,
    PanGestureHandler,
    FlingGestureHandler,
    PinchGestureHandler,
    State,
} from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useProgress } from "../components/ProgressContext";

const MainScreen = ({ navigation }) => {
    const { updateProgress } = useProgress();
    const [score, setScore] = useState(0);
    const scale = new Animated.Value(1);
    const translateX = new Animated.Value(0);
    const translateY = new Animated.Value(0);

    const addPoints = (points, taskId) => {
        setScore((prev) => prev + points);
        updateProgress(taskId, score + points);
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Container>
                <ScoreText>Score: {score}</ScoreText>
                <PinchGestureHandler onGestureEvent={Animated.event([{ nativeEvent: { scale } }], { useNativeDriver: false })}>
                    <PanGestureHandler
                        onGestureEvent={Animated.event([{ nativeEvent: { translationX: translateX, translationY: translateY } }], {
                            useNativeDriver: false,
                        })}
                    >
                        <FlingGestureHandler direction={4} onHandlerStateChange={() => addPoints(Math.floor(Math.random() * 5) + 1, "flick")}>
                            <LongPressGestureHandler
                                onHandlerStateChange={({ nativeEvent }) => {
                                    if (nativeEvent.state === State.ACTIVE) addPoints(5, "longpress");
                                }}
                                minDurationMs={500}
                            >
                                <TapGestureHandler onHandlerStateChange={() => addPoints(1, "tenclicks")} numberOfTaps={1}>
                                    <TapGestureHandler onHandlerStateChange={() => addPoints(2, "doubletap")} numberOfTaps={2}>
                                        <ButtonStyled style={{ transform: [{ scale }, { translateX }, { translateY }] }}>
                                            <ButtonText>Click Me!</ButtonText>
                                        </ButtonStyled>
                                    </TapGestureHandler>
                                </TapGestureHandler>
                            </LongPressGestureHandler>
                        </FlingGestureHandler>
                    </PanGestureHandler>
                </PinchGestureHandler>
            </Container>
        </GestureHandlerRootView>
    );
};

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #fff;
`;

const ScoreText = styled.Text`
    font-size: 24px;
    margin-bottom: 20px;
`;

const ButtonStyled = styled(Animated.View)`
    width: 150px;
    height: 150px;
    border-radius: 75px;
    background-color: red;
    justify-content: center;
    align-items: center;
    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.3;
    shadow-radius: 5px;
    elevation: 10;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: bold;
`;

export default MainScreen;
