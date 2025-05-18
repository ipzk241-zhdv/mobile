import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import api from "../../firebase/api";
import { useAuth } from "../../contexts/AuthContext";
import { resetTo } from "../../navigation/NavigationService";

const REQUIRED_FIELDS = ["name", "lastname", "city", "yearsOld", "hobby"];

const EditProfileScreen = () => {
    const { loggedInUser, token } = useAuth();
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
            if (!loggedInUser || !token) return;
            try {
                const response = await api.get(`/users/${loggedInUser.uid}.json`);
                const data = response.data || {};
                setForm({
                    name: data.name || "",
                    lastname: data.lastname || "",
                    city: data.city || "",
                    yearsOld: data.yearsOld?.toString() || "",
                    hobby: data.hobby || "",
                });
            } catch (err) {
                Alert.alert("Помилка", "Не вдалося завантажити дані.");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [loggedInUser, token]);

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
            await api.patch(`/users/${loggedInUser.uid}.json`, {
                name,
                lastname,
                city,
                yearsOld: age,
                hobby,
            });
            resetTo("Profile");
        } catch (err) {
            Alert.alert("Помилка", "Не вдалося зберегти зміни.");
            console.log(err);
        }
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
            <Title>Редагування профілю</Title>

            <Input placeholder="Ім'я" value={form.name} onChangeText={(text) => handleChange("name", text)} />
            <Input placeholder="Прізвище" value={form.lastname} onChangeText={(text) => handleChange("lastname", text)} />
            <Input placeholder="Місто" value={form.city} onChangeText={(text) => handleChange("city", text)} />
            <Input placeholder="Вік" keyboardType="numeric" value={form.yearsOld} onChangeText={(text) => handleChange("yearsOld", text)} />
            <Input placeholder="Хобі" value={form.hobby} onChangeText={(text) => handleChange("hobby", text)} />

            <ButtonGroup>
                <SaveButton onPress={handleSave}>
                    <ButtonText>Зберегти</ButtonText>
                </SaveButton>
                <BackButton onPress={() => resetTo("Profile")}>
                    <ButtonText>Назад</ButtonText>
                </BackButton>
            </ButtonGroup>
        </Container>
    );
};

export default EditProfileScreen;

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
