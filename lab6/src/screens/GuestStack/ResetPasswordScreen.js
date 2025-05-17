import React, { useRef, useState } from "react";
import { TextInput, ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import { authentication } from "../../firebase/config";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";

const ResetPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setLoggedInUser } = useAuth();

    const handlePasswordReset = async () => {
        if (!email) {
            setError("Введіть email");
            return;
        }

        setError("");
        setLoading(true);

        try {
            await sendPasswordResetEmail(authentication, email);
            Alert.alert("Лист надіслано", "Перевірте свою пошту для відновлення паролю");
            navigation.replace("Login");
        }
        catch (e) {
            console.log(e);
            setError("Не вдалося надіслати лист. Перевірте email.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Title>Відновлення паролю</Title>

            <StyledInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#666"
            />

            {error !== "" && <ErrorText>{error}</ErrorText>}

            <Button onPress={handlePasswordReset}>{loading ? <ActivityIndicator size="small" color="white" /> : <ButtonText>Надіслати лист</ButtonText>}</Button>

            <Footer>
                <LoginLink onPress={() => navigation.replace("SignUp")}>
                    <LoginLinkText>← Повернутись до входу</LoginLinkText>
                </LoginLink>
            </Footer>
        </Container>
    );
};

export default ResetPasswordScreen;

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
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
`;

const Footer = styled.View`
    margin-top: 24px;
    flex-direction: row;
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
