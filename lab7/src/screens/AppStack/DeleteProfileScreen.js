import React, { useState } from "react";
import { Alert, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { resetTo } from "../../navigation/NavigationService";
import { useAuth } from "../../contexts/AuthContext";
import authApi from "../../firebase/authApi";
import api from "../../firebase/api";

const DeleteProfileScreen = () => {
    const { token, logout, loggedInUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!email || !password) {
            Alert.alert("Помилка", "Будь ласка, введіть email та пароль.");
            return;
        }

        if (email !== loggedInUser.email) {
            Alert.alert("Помилка", "Email не співпадає з вашим обліковим записом.");
            return;
        }

        setLoading(true);
        try {
            const signInRes = await authApi.post(':signInWithPassword', {
                email,
                password,
                returnSecureToken: true,
            });
            const idToken = signInRes.data.idToken;
            await api.delete(`/users/${loggedInUser.uid}.json?auth=${idToken}`);
            await authApi.post(':delete', { idToken });
            await logout();
        } catch (err) {
            console.log("Delete error:", err.response?.data || err.message);
            Alert.alert("Помилка", "Не вдалося видалити акаунт. Перевірте дані.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Title>Підтвердження видалення</Title>
            <Input
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <Input
                placeholder="Пароль"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <ButtonGroup>
                    <BackButton onPress={() => resetTo("Profile")}>                    
                        <ButtonText>Назад</ButtonText>
                    </BackButton>

                    <DeleteButton onPress={handleDelete}>
                        <ButtonText>Видалити акаунт</ButtonText>
                    </DeleteButton>
                </ButtonGroup>
            )}
        </Container>
    );
};

export default DeleteProfileScreen;

const Container = styled.ScrollView`
    flex: 1;
    padding: 48px 24px;
    background-color: #fff;
`;
const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 24px;
`;
const Input = styled.TextInput`
    border: 1px solid #ccc;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 16px;
    font-size: 16px;
`;
const ButtonGroup = styled.View`
    margin-top: 32px;
    align-items: center;
`;
const DeleteButton = styled.TouchableOpacity`
    background-color: #dc3545;
    padding: 12px 24px;
    border-radius: 10px;
    margin-top: 12px;
    width: 60%;
    align-items: center;
`;
const BackButton = styled(DeleteButton)`
    background-color: #6c757d;
`;
const ButtonText = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 16px;
`;
