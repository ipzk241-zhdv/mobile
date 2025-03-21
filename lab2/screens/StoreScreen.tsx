import React, { useState } from "react";
import { ScrollView, View, Text, ImageBackground, Image } from "react-native";
import styled from "styled-components/native";
import { FeatureScroll } from "../components/FeatureScroll";
import { TabList } from "../components/TabList";
import { GameRow } from "../components/GameRow";
import ThemedView from "../components/ThemedView";

const StoreScreen = () => {
    return (
        <ThemedView>
            <ScrollView>
                <FeatureScroll></FeatureScroll>

                <TabList tabList={["Top Sellers", "Free to play", "Early Access", "Simulator"]}></TabList>

                <GameRow></GameRow>
            </ScrollView>
        </ThemedView>
    );
};

export default StoreScreen;