import React, { useEffect, useState } from "react";
import { View, FlatList, Text, ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import api from "../../firebase/api";
import { useAuth } from "../../contexts/AuthContext";

const PostsList = () => {
    const { loggedInUser } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            if (!loggedInUser) return;
            try {
                const list = await fetchPosts(loggedInUser.uid);
                setPosts(list);
            } catch (err) {
                console.error("Error fetching posts:", err);
                Alert.alert("Помилка", "Не вдалося завантажити пости.");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [loggedInUser]);

    if (loading) {
        return (
            <Centered>
                <ActivityIndicator size="large" />
            </Centered>
        );
    }

    return (
        <Container>
            {posts.length === 0 ? (
                <EmptyText>Немає постів</EmptyText>
            ) : (
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <PostListItem post={item} />}
                    contentContainerStyle={{ paddingBottom: 16 }}
                />
            )}
        </Container>
    );
};

export default PostsList;

const Container = styled.View`
    flex: 1;
    background-color: #f2f2f2;
    padding: 16px;
`;
const Centered = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const EmptyText = styled.Text`
    text-align: center;
    color: #666;
    margin-top: 50px;
`;
const PostCard = styled.View`
    background-color: white;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
    elevation: 2;
`;
const PostTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
`;
const PostBody = styled.Text`
    font-size: 16px;
    color: #333;
`;
