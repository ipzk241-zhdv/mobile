import styled from "styled-components/native";
import React from "react";
import { useTheme } from "styled-components";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { ImageBackground } from "react-native";

export const ChatScroll = () => {
    const theme = useTheme();

    const chats = require("../assets/chats.json");

    return (
        <ChatList vertical showsVerticalScrollIndicator={false}>
            {chats.map((chat, index) => (
                <ChatCard key={index}>
                    <AvatarContainer>
                        <AvatarWrapper>
                            <Avatar source={{ uri: chat.avatar }} />
                            {chat.online != "none" && <OnlineIndicator color={chat.online} />}
                        </AvatarWrapper>
                    </AvatarContainer>

                    <TextContainer>
                        <ChatName>{chat.name}</ChatName>
                        <ChatMessage>
                            {(chat.status.sended || chat.status.sendedAndReaded) && <Sender>You: </Sender>}
                            {chat.lastMessage} <ChatTime>{chat.sendedTime}</ChatTime>
                        </ChatMessage>
                    </TextContainer>

                    <StatusContainer>
                        {chat.status.sended && <WhiteCircle />}
                        {chat.status.recieved && (
                            <BlueBadge>
                                <BadgeText>1</BadgeText>
                            </BlueBadge>
                        )}
                    </StatusContainer>
                </ChatCard>
            ))}
        </ChatList>
    );
};

const ChatList = styled.ScrollView`
    margin-bottom: 0px;
    width: 100%;
    background-color: ${(props) => props.theme.background};
`;

const ChatCard = styled.View`
    height: 72px;
    width: 100%;
    background-color: #1e1f2b;
    border-radius: 12px;
    flex-direction: row;
    align-items: center;
    margin-right: 0px;
    padding: 0px;
`;

const AvatarContainer = styled.View`
    margin-right: 15px;
`;

const AvatarWrapper = styled.View`
    position: relative;
    width: 48px;
    height: 48px;
`;

const Avatar = styled.Image`
    width: 48px;
    height: 48px;
    border-radius: 24px;
`;

const OnlineIndicator = styled.View<{ color: string }>`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    border: 2px solid #1e1f2b;
    background-color: ${({ color }) => color};
`;

const TextContainer = styled.View`
    flex: 1;
`;

const ChatName = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 16px;
`;

const ChatMessage = styled.Text`
    color: #b0b0b0;
    font-size: 13px;
    margin-top: 5px;
`;

const Sender = styled.Text`
    color: white;
`;

const ChatTime = styled.Text`
    color: #b0b0b0;
`;

const StatusContainer = styled.View`
    margin-left: 6px;
`;

const WhiteCircle = styled.View`
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 5px;
    margin-right: 4px;
`;

const BlueBadge = styled.View`
    background-color: #2471eb;
    width: 18px;
    height: 18px;
    border-radius: 9px;
    justify-content: center;
    align-items: center;
`;

const BadgeText = styled.Text`
    color: white;
    font-size: 12px;
    font-weight: bold;
`;
