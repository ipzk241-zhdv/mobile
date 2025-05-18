import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "../../contexts/AuthContext";
import { fetchPosts, deletePost } from "../../firebase/postsApi";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

const PostsList = ({ headerComponent = null }) => {
    const { loggedInUser } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const loadPosts = async () => {
        if (!loggedInUser) return;
        setLoading(true);
        try {
            const list = await fetchPosts();
            list.sort((a, b) => b.createdAt - a.createdAt);
            setPosts(list);
        } catch (err) {
            console.error("Error fetching posts:", err);
            Alert.alert("Помилка", "Не вдалося завантажити пости.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, [loggedInUser]);

    const handleEdit = (post) => {
        navigation.navigate("PostCreate", { post });
    };

    const handleDelete = (post) => {
        Alert.alert(
            "Видалення",
            `Ви впевнені, що хочете видалити пост «${post.title}»?`,
            [
                { text: "Повернутись", style: "cancel" },
                {
                    text: "Видалити",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deletePost(post.userId, post.id);
                            setPosts((prev) => prev.filter((p) => p.id !== post.id));
                        } catch (err) {
                            console.error("Error deleting post:", err);
                            Alert.alert("Помилка", "Не вдалося видалити пост.");
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    if (loading) {
        return (
            <Centered>
                <ActivityIndicator size="large" />
            </Centered>
        );
    }

    return (
        <Container>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={headerComponent}
                renderItem={({ item }) => (
                    <PostCard>
                        <PostHeader>
                            <PostDate>{format(new Date(item.createdAt), "dd.MM.yyyy HH:mm")}</PostDate>
                            {item.userId === loggedInUser.uid && (
                                <ButtonGroup>
                                    <DeleteButton onPress={() => handleDelete(item)}>
                                        <ButtonText>Видалити</ButtonText>
                                    </DeleteButton>
                                    <EditButton onPress={() => handleEdit(item)}>
                                        <ButtonText>Редагувати</ButtonText>
                                    </EditButton>
                                </ButtonGroup>
                            )}
                        </PostHeader>
                        <PostTitle>{item.title}</PostTitle>
                        <PostAuthor>
                            @{item.authorName} {item.authorLastname}
                        </PostAuthor>
                        <PostBody>{item.body}</PostBody>
                    </PostCard>
                )}
                contentContainerStyle={{ paddingBottom: 16, paddingTop: headerComponent ? 0 : 16 }}
            />
        </Container>
    );
};

export default PostsList;

const Container = styled.View`
    flex: 1;
    background-color: #f2f2f2;
    padding: 32px 16px;
`;
const Centered = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const ButtonGroup = styled.View`
    flex-direction: row;
`;
const EditButton = styled.TouchableOpacity`
    margin-left: 8px;
    padding: 4px 6px;
    background-color: #007bff;
    border-radius: 6px;
`;
const DeleteButton = styled.TouchableOpacity`
    padding: 4px 6px;
    background-color: #dc3545;
    border-radius: 6px;
`;
const ButtonText = styled.Text`
    color: white;
    font-weight: bold;
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
const PostHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const PostDate = styled.Text`
    font-size: 12px;
    color: #999;
`;
const PostTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-top: 8px;
`;
const PostAuthor = styled.Text`
    margin-vertical: 8px;
    color: #555;
`;
const PostBody = styled.Text`
    font-size: 16px;
    color: #333;
`;
