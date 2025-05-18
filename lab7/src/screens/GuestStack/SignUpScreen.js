import React, { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import { signUp as signUpApi } from "../../firebase/authApi";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../firebase/api";
import { resetTo } from "../../navigation/NavigationService";

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();

    const handleSignUp = async () => {
        setError("");
        if (!email || !password) {
            setError("Будь ласка, заповніть усі поля");
            return;
        }
        if (password !== confirmPassword) {
            setError("Паролі не співпадають");
            return;
        }

        setLoading(true);
        try {
            const data = await signUpApi(email.trim(), password);
            const userId = data.user.uid;
            const userData = {
                uid: userId,
                email: data.user.email,
                role: "user",
                createdAt: new Date().toISOString(),
            };
            await api.put(`/users/${userId}.json`, userData);
            Alert.alert("Успішно зареєстровано!", "Щоб продовжити, авторизуйтесь...");
            resetTo("Login");
        } catch (err) {
            console.error("Sign up error:", err);
            setError("Не вдалося зареєструватися");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Title>Реєстрація</Title>

            <StyledInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#666"
            />
            <StyledInput placeholder="Пароль" secureTextEntry value={password} onChangeText={setPassword} placeholderTextColor="#666" />
            <StyledInput
                placeholder="Підтвердження паролю"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor="#666"
            />

            {error ? <ErrorText>{error}</ErrorText> : null}

            <Button onPress={handleSignUp} disabled={loading}>
                {loading ? <ActivityIndicator size="small" color="white" /> : <ButtonText>Зареєструватись</ButtonText>}
            </Button>

            <Footer>
                <FooterText>Вже маєте акаунт?</FooterText>
                <LoginLink onPress={() => navigation.replace("Login")}>
                    <LoginLinkText>Увійти</LoginLinkText>
                </LoginLink>
            </Footer>
        </Container>
    );
};

export default SignUpScreen;

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f2f2f2;
`;
const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #2c2c7c;
    margin-bottom: 24px;
`;
const StyledInput = styled.TextInput`
    width: 100%;
    height: 50px;
    background-color: white;
    border-radius: 8px;
    padding: 0 16px;
    margin-bottom: 12px;
    font-size: 16px;
`;
const ErrorText = styled.Text`
    color: red;
    margin-bottom: 10px;
`;
const Button = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    background-color: #2c2c7c;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-top: 12px;
    opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;
const ButtonText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
`;
const Footer = styled.View`
    margin-top: 24px;
    flex-direction: row;
    align-items: center;
`;
const FooterText = styled.Text`
    color: #333;
`;
const LoginLink = styled.TouchableOpacity`
    margin-left: 6px;
`;
const LoginLinkText = styled.Text`
    color: #2c2c7c;
    font-weight: bold;
`;
