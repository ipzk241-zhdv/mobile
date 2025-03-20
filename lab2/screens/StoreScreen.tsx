import React, { useState } from "react";
import { ScrollView, View, Text, ImageBackground, Image } from "react-native";
import styled from "styled-components/native";
import { FeatureScroll } from "../components/FeatureScroll";
import { TabList } from "../components/TabList";
import { GameRow } from "../components/GameRow";

const games = require("../assets/games.json");

const Page = () => {
    return (
        <Container>
            <ScrollView>
                <FeatureScroll></FeatureScroll>

                <TabList tabList={["Top Sellers", "Free to play", "Early Access"]}></TabList>

                <GameRow></GameRow>
            </ScrollView>
        </Container>
    );
};

export default Page;

const Container = styled.View`
    flex: 1;
    background-color: #121829;
    padding: 20px;
`;
