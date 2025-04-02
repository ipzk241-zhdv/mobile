import React, { useEffect, useState, useRef } from "react";
import { Animated, Dimensions } from "react-native";
import {
    GestureHandlerRootView,
    TapGestureHandler,
    LongPressGestureHandler,
    PanGestureHandler,
    FlingGestureHandler,
    PinchGestureHandler,
    State,
    Directions,
} from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useProgress } from "../components/ProgressContext";

const { width, height } = Dimensions.get("window");

const MainScreen = ({ navigation }) => {
    const { updateProgress } = useProgress();
    const [score, setScore] = useState(0);

    const offsetX = useRef(0);
    const offsetY = useRef(0);

    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    const longPressRef = useRef(null);
    const doubleTapRef = useRef(null);
    const tapRef = useRef(null);
    const panRef = useRef(null);
    const swipeleft = useRef(null);
    const swiperight = useRef(null);

    const addPoints = (points, taskId) => {
        console.log(`Added ${points} points for ${taskId}`);
        setScore((prev) => prev + points);
        updateProgress(taskId);
    };

    useEffect(() => {
        if (score >= 100) {
            updateProgress("score100");
        }
    }, [score]);

    const onPanGestureEvent = Animated.event([{ nativeEvent: { translationX: translateX, translationY: translateY } }], { useNativeDriver: false });

    const onPanStateChange = (event) => {
        if (event.nativeEvent.state === State.BEGAN) {
            console.log("Pan started");
            translateX.setOffset(offsetX.current);
            translateY.setOffset(offsetY.current);
            translateX.setValue(0);
            translateY.setValue(0);
        }

        if (event.nativeEvent.state === State.END) {
            console.log("Pan ended");
            offsetX.current += event.nativeEvent.translationX;
            offsetY.current += event.nativeEvent.translationY;
            addPoints(6, "drag");

            translateX.flattenOffset();
            translateY.flattenOffset();
        }
    };

    const onPinchGestureEvent = Animated.event([{ nativeEvent: { scale } }], { useNativeDriver: false });

    const onPinchStateChange = ({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
            console.log(`Pinch active: Scale = ${nativeEvent.scale}`);
            addPoints(6, "pinch");
        }
        if (nativeEvent.state === State.END) {
            console.log("Pinch ended");
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: false,
            }).start();
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Container>
                <ScoreText>Score: {score}</ScoreText>

                <PinchGestureHandler onGestureEvent={onPinchGestureEvent} onHandlerStateChange={onPinchStateChange}>
                    <FlingGestureHandler
                        direction={Directions.RIGHT}
                        minDist={70}
                        onHandlerStateChange={({ nativeEvent }) => {
                            if (nativeEvent.state === State.ACTIVE) {
                                console.log("Swiped Right");
                                addPoints(Math.floor(Math.random() * 5) + 1, "swiperight");
                            }
                        }}
                        ref={swiperight}
                    >
                        <FlingGestureHandler
                            direction={Directions.LEFT}
                            minDist={70}
                            onHandlerStateChange={({ nativeEvent }) => {
                                if (nativeEvent.state === State.ACTIVE) {
                                    console.log("Swiped Left");
                                    addPoints(Math.floor(Math.random() * 5) + 1, "swipeleft");
                                }
                            }}
                        ref={swipeleft}
                        >
                            <LongPressGestureHandler
                                onHandlerStateChange={({ nativeEvent }) => {
                                    if (nativeEvent.state === State.ACTIVE) {
                                        console.log("Long press detected");
                                        addPoints(5, "longpress");
                                    }
                                }}
                                minDurationMs={3000}
                                shouldCancelWhenOutside={true}
                                ref={longPressRef}
                            >
                                <TapGestureHandler
                                    numberOfTaps={1}
                                    onHandlerStateChange={({ nativeEvent }) => {
                                        if (nativeEvent.state === State.ACTIVE) {
                                            console.log("Single tap detected");
                                            addPoints(1, "tenclicks");
                                        }
                                    }}
                                    waitFor={["doubleTapRef", "longPressRef"]}
                                    ref={tapRef}
                                >
                                    <TapGestureHandler
                                        numberOfTaps={2}
                                        onHandlerStateChange={({ nativeEvent }) => {
                                            if (nativeEvent.state === State.ACTIVE) {
                                                console.log("Double tap detected");
                                                addPoints(2, "doubletap");
                                            }
                                        }}
                                        waitFor="longPressRef"
                                        ref={doubleTapRef}
                                    >
                                        <PanGestureHandler
                                            minDist={100}
                                            onHandlerStateChange={onPanStateChange}
                                            onGestureEvent={onPanGestureEvent}
                                            activateAfterLongPress={50}
                                            ref={panRef}
                                            waitFor={[longPressRef, tapRef, doubleTapRef]}
                                        >
                                            <LongPressGestureHandler
                                                onHandlerStateChange={({ nativeEvent }) => {
                                                    if (nativeEvent.state === State.ACTIVE) {
                                                        console.log("Long press detected");
                                                        addPoints(5, "longpress");
                                                    }
                                                }}
                                                minDurationMs={3000}
                                                shouldCancelWhenOutside={true}
                                                ref={longPressRef}
                                            >
                                                <ButtonStyled
                                                    style={{
                                                        transform: [{ translateX }, { translateY }, { scale }],
                                                    }}
                                                >
                                                    <ButtonText>Click Me!</ButtonText>
                                                </ButtonStyled>
                                            </LongPressGestureHandler>
                                        </PanGestureHandler>
                                    </TapGestureHandler>
                                </TapGestureHandler>
                            </LongPressGestureHandler>
                        </FlingGestureHandler>
                    </FlingGestureHandler>
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
