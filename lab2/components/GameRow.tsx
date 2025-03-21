import styled from "styled-components/native";
import React, { useState } from "react";
import { GetIcon } from "../utils/LoadIcons";

export const GameRow = () => {
    const games = require("../assets/games.json");

    return (
        <>
        {games.slice(1).map((game, index) => (
            <GameRows key={index}>
                <Cover source={{ uri: game.background }} />
                <Info>
                    <GameTitle>{game.name}</GameTitle>
                    <PlatformsContainer>
                        {game.platforms.includes("Windows") && GetIcon("windows", 12)}
                        {game.platforms.includes("Mac") && GetIcon("mac", 12)}
                        <Platforms>{game.platforms.join(", ")}</Platforms>
                    </PlatformsContainer>
                </Info>
                <PriceBlock>
                    {game.currentPrice !== game.originalPrice && <Strike>{game.originalPrice}</Strike>}
                    <NewPrice>{game.currentPrice}</NewPrice>
                    {game.discountPercent !== "0%" && <SmallDiscount>-{game.discountPercent}</SmallDiscount>}
                </PriceBlock>
            </GameRows>
        ))}
        </>
    );
};

const GameRows = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: transparent;
    padding: 10px;
    border-radius: 12px;
    margin-bottom: 10px;
`;

const PlatformsContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
    gap: 5px;
`

const Cover = styled.Image`
    width: 72px;
    height: 50px;
    border-radius: 10px;
`;

const Info = styled.View`
    flex: 1;
    margin-left: 10px;
`;

const GameTitle = styled.Text`
    color: ${(props) => ((props.theme.text))};
    font-size: 14px;
    font-weight: bold;
`;

const Platforms = styled.Text`
    color: #aaa;
    font-size: 12px;
`;

const PriceBlock = styled.View`
    align-items: flex-end;
`;

const Strike = styled.Text`
    text-decoration: line-through;
    color: #aaa;
    font-size: 12px;
`;

const NewPrice = styled.Text`
    color: ${(props) => ((props.theme.text))};
    font-size: 14px;
    font-weight: bold;
`;

const SmallDiscount = styled.Text`
    color: #00c851;
    font-size: 12px;
    margin-top: 2px;
`;