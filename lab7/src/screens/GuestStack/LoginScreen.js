import React, { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import { signIn as signInApi } from "../../firebase/authApi"; // Adjust path
import { useAuth } from "../../contexts/AuthContext";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const handleLogin = async () => {
        if (!email || !password) {
            setError("Будь ласка, введіть email та пароль.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const data = await signInApi(email.trim(), password);
            await signIn(data);
        } catch (err) {
            console.error("Login error:", err);
            setError("Невірний email або пароль.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Title>Вхід</Title>
            <StyledInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#666"
            />
            <StyledInput placeholder="Пароль" secureTextEntry value={password} onChangeText={setPassword} placeholderTextColor="#666" />
            {error ? <ErrorText>{error}</ErrorText> : null}

            <Button onPress={handleLogin} disabled={loading}>
                {loading ? <ActivityIndicator size="small" color="white" /> : <ButtonText>Увійти</ButtonText>}
            </Button>

            <Footer>
                <FooterGroup>
                    <FooterText>Ще не маєте акаунта?</FooterText>
                    <LoginLink onPress={() => navigation.replace("SignUp")}>
                        <LoginLinkText>Зареєструватися</LoginLinkText>
                    </LoginLink>
                </FooterGroup>
            </Footer>
        </Container>
    );
};

export default LoginScreen;

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

const FooterGroup = styled.View`
    flex-direction: row;
`;

const Footer = styled.View`
    margin-top: 24px;
    flex-direction: column;
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
