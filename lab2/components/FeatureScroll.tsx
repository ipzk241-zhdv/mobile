import styled from "styled-components/native";
import React from "react";
import { useTheme } from "styled-components";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { ImageBackground } from "react-native";


export const FeatureScroll = () => {
    const theme = useTheme();

    const games = require("../assets/games.json");

    return (
        <FeaturedScroll horizontal showsHorizontalScrollIndicator={false}>
            {games.map((game, index) => (
                <FeaturedCard key={index}>
                    <ImageBackground
                        source={{ uri: game.background }}
                        style={{ width: "100%", height: "100%", borderRadius: 16, overflow: "hidden" }}
                    >
                        <FeaturedOverlay>
                            <FeaturedTitle>{game.name}</FeaturedTitle>
                            <FeaturedSubtitle>Recommended by your friend, Player</FeaturedSubtitle>
                            <PriceRow>
                                <DiscountTag>-{game.discountPercent}</DiscountTag>
                                {game.currentPrice !== game.originalPrice && <Strike>{game.originalPrice}</Strike>}
                                <NewPrice>{game.currentPrice}</NewPrice>
                            </PriceRow>
                        </FeaturedOverlay>
                    </ImageBackground>
                </FeaturedCard>
            ))}
        </FeaturedScroll>
    );
};

const FeaturedScroll = styled.ScrollView`
    margin-bottom: 20px;
`;

const FeaturedCard = styled.View`
    width: 330px;
    height: 230px;
    margin-right: 12px;
    border-radius: 16px;
    overflow: hidden;
`;

const FeaturedOverlay = styled.View`
    flex: 1;
    justify-content: flex-end;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.4);
`;

const FeaturedTitle = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: bold;
`;

const FeaturedSubtitle = styled.Text`
    color: #ccc;
    font-size: 12px;
`;

const PriceRow = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-top: 6px;
`;

const DiscountTag = styled.Text`
    background-color: transparent;
    color: #00c851;
    font-size: 14px;
    font-weight: bold;
`;

const Strike = styled.Text`
    text-decoration: line-through;
    color: #aaa;
    font-size: 12px;
`;

const NewPrice = styled.Text`
    color: white;
    font-size: 14px;
    font-weight: bold;
`;