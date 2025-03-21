import React, { useState, useEffect } from "react";
import { View, Text, Animated, StyleSheet, ImageBackground } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

const generateCode = () => {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
};

const ProgressBar = ({ duration, trigger }) => {
    const progress = new Animated.Value(1);

    useEffect(() => {
        const animate = () => {
            progress.setValue(1);
            Animated.timing(progress, {
                toValue: 0,
                duration: duration,
                useNativeDriver: false,
            }).start();
        };
        animate();
    }, [trigger]);

    return (
        <ProgressContainer>
            <Animated.View
                style={{
                    width: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0%", "100%"],
                    }),
                    height: "100%",
                    backgroundColor: "#4a90e2",
                }}
            />
        </ProgressContainer>
    );
};

export default function GuardCode() {
    const [code, setCode] = useState(generateCode());
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCode(generateCode());
            setTrigger((prev) => prev + 1);
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    return (
        <ImageBack source={require("../assets/safety-background.png")} style={{zIndex:0}}>
            <GradientOverlayVertical />
            <GradientOverlayHorizontal />


            <Container>
                <Text style={styles.text}>Logged in as player</Text>
                <CodeText>{code}</CodeText>
                <ProgressBar duration={15000} trigger={trigger} />
            </Container>
        </ImageBack>
    );
}

const ImageBack = styled.ImageBackground`
    height: 167px;
    width: 100%;
    position: relative;
    background-color: red;
    `;
    // background-color: ${(props) => ((props.theme.background))}

/* Vertical gradient - fades at top and bottom */
const GradientOverlayVertical = styled(LinearGradient).attrs({
    colors: ["rgba(27, 31, 42, 1)", "rgba(27, 31, 42, 0)"],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 0.5 },
})`
    position: absolute;
    width: 100%;
    height: 100%;
`;

/* Horizontal gradient - fades at left and right */
const GradientOverlayHorizontal = styled(LinearGradient).attrs({
    colors: ["rgba(27, 31, 42, 1)", "rgba(27, 31, 42, 0)", "rgba(27, 31, 42, 1)"],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
})`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const ProgressContainer = styled.View`
    width: 200px;
    height: 8px;
    background-color: #333;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
`;

const CodeText = styled.Text`
    font-size: 32px;
    font-weight: bold;
    color: white;
    margin-top: 5px;
`;

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 16,
        opacity: 0.7,
    },
});
