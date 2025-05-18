import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "../../contexts/AuthContext";
import { createPost, updatePost } from "../../firebase/postsApi";
import { resetTo } from "../../navigation/NavigationService";

const CreatePostScreen = ({ navigation, route }) => {
    const { loggedInUser } = useAuth();
    const existingPost = route.params?.post || null;
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (existingPost) {
            setTitle(existingPost.title);
            setBody(existingPost.body);
        }
    }, [existingPost]);

    const handleSave = async () => {
        if (!title.trim() || !body.trim()) {
            Alert.alert("Помилка", "Будь ласка, заповніть усі поля.");
            return;
        }
        setLoading(true);
        try {
            const payload = {
                title: title.trim(),
                body: body.trim(),
                createdAt: Date.now(),
            };
            if (existingPost) {
                await updatePost(loggedInUser.uid, existingPost.id, payload);
            } else {
                await createPost(loggedInUser.uid, { ...payload, createdAt: Date.now() });
            }
            resetTo("Profile");
        } catch (err) {
            console.error(existingPost ? "Error updating post:" : "Error creating post:", err);
            Alert.alert("Помилка", existingPost ? "Не вдалося оновити пост." : "Не вдалося створити пост.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <TitleInput placeholder="Заголовок" value={title} onChangeText={setTitle} editable={!loading} />
            <BodyInput placeholder="Текст посту" value={body} onChangeText={setBody} multiline editable={!loading} />

            <ButtonRow>
                <Button onPress={() => navigation.goBack()} disabled={loading}>
                    <ButtonText>Назад</ButtonText>
                </Button>
                <Button onPress={handleSave} disabled={loading}>
                    {loading ? <ActivityIndicator /> : <ButtonText>{existingPost ? "Зберегти" : "Створити"}</ButtonText>}
                </Button>
            </ButtonRow>
        </Container>
    );
};

export default CreatePostScreen;

const Container = styled.View`
    flex: 1;
    padding: 64px 32px;
    background-color: #fff;
`;
const TitleInput = styled.TextInput`
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 16px;
`;
const BodyInput = styled.TextInput`
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px;
    font-size: 16px;
    text-align-vertical: top;
    margin-bottom: 12px;
`;
const ButtonRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
const Button = styled.TouchableOpacity`
    flex: 1;
    margin: 0 4px;
    padding: 12px;
    background-color: #2c2c7c;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;
const ButtonText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
`;
