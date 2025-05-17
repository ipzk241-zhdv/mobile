import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase/config";
import { useAuth } from "../../contexts/AuthContext";

const EditProfileScreen = () => {
    const { loggedInUser } = useAuth();
    const navigation = useNavigation();
    const [form, setForm] = useState({
        name: "",
        lastname: "",
        city: "",
        yearsOld: "",
        hobby: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ref = doc(db, "users", loggedInUser.uid);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    const data = snap.data();
                    setForm({
                        name: data.name || "",
                        lastname: data.lastname || "",
                        city: data.city || "",
                        yearsOld: data.yearsOld?.toString() || "",
                        hobby: data.hobby || "",
                    });
                }
            } catch (err) {
                Alert.alert("Помилка", "Не вдалося завантажити дані.");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        if (loggedInUser) fetchData();
    }, [loggedInUser]);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        const { name, lastname, city, yearsOld, hobby } = form;
        if (!name || !lastname || !city || !yearsOld || !hobby) {
            Alert.alert("Помилка", "Усі поля обов'язкові для заповнення.");
            return;
        }

        const age = Number(yearsOld);
        if (isNaN(age) || age < 1 || age > 150) {
            Alert.alert("Помилка", "Вік має бути числом від 1 до 150.");
            return;
        }

        try {
            const ref = doc(db, "users", loggedInUser.uid);
            await updateDoc(ref, {
                name,
                lastname,
                city,
                yearsOld: parseInt(yearsOld),
                hobby,
            });
            navigation.replace("Profile");
        } catch (err) {
            Alert.alert("Помилка", "Не вдалося зберегти зміни.");
            console.log(err);
        }
    };

    if (loading)
        return (
            <Centered>
                <LoadingText>Завантаження...</LoadingText>
            </Centered>
        );

    return (
        <Container>
            <Title>Редагування профілю</Title>

            <Input placeholder="Ім'я" value={form.name} onChangeText={(text) => handleChange("name", text)} />
            <Input placeholder="Прізвище" value={form.lastname} onChangeText={(text) => handleChange("lastname", text)} />
            <Input placeholder="Місто" value={form.city} onChangeText={(text) => handleChange("city", text)} />
            <Input placeholder="Вік" value={form.yearsOld} keyboardType="numeric" onChangeText={(text) => handleChange("yearsOld", text)} />
            <Input placeholder="Хобі" value={form.hobby} onChangeText={(text) => handleChange("hobby", text)} />

            <ButtonGroup>
                <SaveButton onPress={handleSave}>
                    <ButtonText>Зберегти</ButtonText>
                </SaveButton>
                <BackButton onPress={() => navigation.replace("Profile")}>
                    <ButtonText>Назад</ButtonText>
                </BackButton>
            </ButtonGroup>
        </Container>
    );
};

export default EditProfileScreen;

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

const SaveButton = styled.TouchableOpacity`
    background-color: #28a745;
    padding: 12px 24px;
    border-radius: 10px;
    margin-bottom: 12px;
    width: 60%;
    align-items: center;
`;

const BackButton = styled(SaveButton)`
    background-color: #007bff;
`;

const ButtonText = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 16px;
`;

const Centered = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const LoadingText = styled.Text`
    font-size: 18px;
`;
