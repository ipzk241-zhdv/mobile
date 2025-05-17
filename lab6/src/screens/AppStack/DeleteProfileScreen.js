import React, { useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { EmailAuthProvider, deleteUser, reauthenticateWithCredential, signOut } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const DeleteProfileScreen = () => {
    const navigation = useNavigation();
    const { loggedInUser } = useAuth();

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

        const credential = EmailAuthProvider.credential(email, password);
        console.log(email, password);
        try {
            await reauthenticateWithCredential(loggedInUser, credential);
            await deleteDoc(doc(db, "users", loggedInUser.uid));
            await deleteUser(loggedInUser);
        } catch (error) {
            Alert.alert("Помилка", "Не вдалося видалити акаунт. Перевірте дані.");
            console.log("Delete error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Title>Підтвердження видалення</Title>
            <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
            <Input placeholder="Пароль" secureTextEntry value={password} onChangeText={setPassword} />

            <ButtonGroup>
                <BackButton onPress={() => navigation.replace("Profile")}>
                    <ButtonText>Назад</ButtonText>
                </BackButton>

                <DeleteButton onPress={handleDelete}>
                    <ButtonText>Видалити акаунт</ButtonText>
                </DeleteButton>
            </ButtonGroup>
        </Container>
    );
};

export default DeleteProfileScreen;

// ========== styled ==========

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
