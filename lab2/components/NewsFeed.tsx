import React from "react";
import { ScrollView, Image, Text, View } from "react-native";
import styled from "styled-components/native";
import { GetIcon } from "../utils/LoadIcons";

export default function Feed() {
    const news = require("../assets/news.json");

    return (
        <>
            {news.map((item, index) => (
                <View key={index}>
                    <Strip></Strip>
                    <Card>
                        <Header style={{ display: "flex", justifyContent: "space-between" }}>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <Avatar source={{ uri: item.avatar }} />
                                <View>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <Author>{item.author}</Author>
                                        <News style={{ marginLeft: 10 }}>{item.category}</News>
                                    </View>
                                    <PostDate>{item.postDate}</PostDate>
                                </View>
                            </View>
                            <Options>···</Options>
                        </Header>
                        <NewsImage source={{ uri: item.image }} />
                        <Content>
                            <Topic>{item.topic}</Topic>
                            <Description>{item.description}</Description>
                        </Content>
                        <Strip height={"1px"} style={{ marginBottom: 14 }}></Strip>
                        <Footer>
                            <Activity>
                                {GetIcon("like", 24, "transparent", "rgb(160,160,160)")}
                                <Reaction>{item.likes}</Reaction>
                                {GetIcon("comment", 24, "rgb(160,160,160)", "transparent")}
                                <Reaction>{item.comments}</Reaction>
                            </Activity>
                            {GetIcon("share", 24, "", "transparent")}
                        </Footer>
                    </Card>
                    <Strip></Strip>
                </View>
            ))}
        </>
    );
}

const Card = styled.View`
    background-color: transparent;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 10px 20px;
`;

const Strip = styled.View`
    background-color: ${(props) => ((props.theme.strip))};
    width: 100%;
    height: ${(props) => props.height || "8px"};
`;

const Header = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;

const Options = styled.Text`
    font-size: 30px;
    color: ${(props) => ((props.theme.text))};
`;

const Activity = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;
const News = styled.Text`
    text-transform: uppercase;
    background-color: rgb(182, 62, 181);
    color: white;
    padding: 1px 5px;
    border-radius: 4px;
    margin-bottom: 2px;
`;

const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 10px;
`;

const Author = styled.Text`
    color: ${(props) => ((props.theme.text))};
    font-weight: bold;
`;

const PostDate = styled.Text`
    color: #888;
    font-size: 12px;
`;

const NewsImage = styled.Image`
    width: 100%;
    height: 250px;
    border-radius: 10px;
    margin-bottom: 10px;
`;

const Content = styled.View`
    margin-bottom: 10px;
`;

const Topic = styled.Text`
    color: ${(props) => ((props.theme.text))};
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Description = styled.Text`
    color: #aaaaaa;
    font-size: 14px;
`;

const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const Reaction = styled.Text`
    color: #888;
    margin: 0px 36px 0px 8px;
`;
