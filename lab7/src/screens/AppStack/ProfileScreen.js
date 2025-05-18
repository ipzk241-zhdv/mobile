import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import api from "../../firebase/api";
import { useAuth } from "../../contexts/AuthContext";
import { resetTo } from "../../navigation/NavigationService";
import PostsList from "../components/PostsList";

const REQUIRED_FIELDS = ["name", "lastname", "city", "yearsOld", "hobby"];

const ProfileScreen = () => {
    const { loggedInUser, loading, signOut } = useAuth();
    const [profile, setProfile] = useState(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!loggedInUser) return;
            try {
                const res = await api.get(`/users/${loggedInUser.uid}.json`);
                const data = res.data;
                setProfile(data);

                const incomplete = REQUIRED_FIELDS.some((field) => !data[field] || data[field].toString().trim() === "");
                if (incomplete) {
                    resetTo("EditProfile");
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                Alert.alert("Помилка", "Не вдалося завантажити профіль");
            } finally {
                setFetching(false);
            }
        };
        fetchProfile();
    }, [loggedInUser]);

    const handleSignOut = () => {
        Alert.alert(
            "Вийти з акаунту",
            "Ви впевнені, що хочете вийти?",
            [
                { text: "Скасувати", style: "cancel" },
                {
                    text: "Вийти",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await signOut();
                        } catch (err) {
                            console.error("Sign out error:", err);
                            Alert.alert("Помилка", "Не вдалося вийти з акаунту.");
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const getFieldValue = (value) => (value ? value : "-");

    if (loading || fetching) {
        return (
            <Centered>
                <ActivityIndicator size="large" />
            </Centered>
        );
    }

    return (
        <Container>
            <DeleteButton onPress={() => resetTo("DeleteProfile")}>
                <DeleteText>Видалити</DeleteText>
            </DeleteButton>

            <Content>
                <Title>Ваш профіль</Title>
                <Field>
                    Ім'я: <FieldValue>{getFieldValue(profile.name)}</FieldValue>
                </Field>
                <Field>
                    Прізвище: <FieldValue>{getFieldValue(profile.lastname)}</FieldValue>
                </Field>
                <Field>
                    Місто: <FieldValue>{getFieldValue(profile.city)}</FieldValue>
                </Field>
                <Field>
                    Вік: <FieldValue>{getFieldValue(profile.yearsOld)}</FieldValue>
                </Field>
                <Field>
                    Хоббі: <FieldValue>{getFieldValue(profile.hobby)}</FieldValue>
                </Field>
            </Content>

            <SectionContainer>
                <SectionHeader>
                    <TitleRow>
                        <SectionTitle>Пости</SectionTitle>
                        <NewButton onPress={() => navigator.replace("PostCreate")}>
                            <NewButtonText>Новий</NewButtonText>
                        </NewButton>
                    </TitleRow>
                </SectionHeader>
                <PostsList />
            </SectionContainer>

            <ButtonContainer>
                <ActionButton onPress={() => resetTo("EditProfile")}>
                    <ActionText>Редагувати</ActionText>
                </ActionButton>
                <RedButton onPress={handleSignOut}>
                    <ActionText>Вийти</ActionText>
                </RedButton>
            </ButtonContainer>
        </Container>
    );
};

export default ProfileScreen;

const TitleRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: 8px;
`;

const NewButton = styled.TouchableOpacity`
    background-color: #007bff;
    padding-vertical: 6px;
    padding-horizontal: 12px;
    border-radius: 6px;
`;

const NewButtonText = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 14px;
`;

const SectionContainer = styled.View`
    margin-top: 24px;
    padding: 16px;
    background-color: #f9f9f9;
    border-radius: 12px;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.05;
    shadow-radius: 6px;
    elevation: 1;
`;

const SectionHeader = styled.View`
    border-bottom-width: 1px;
    border-color: #ddd;
    padding-bottom: 8px;
    margin-bottom: 12px;
`;

const SectionTitle = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #333;
    text-align: center;
`;

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    padding: 16px;
    justify-content: space-between;
`;
const Centered = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const Content = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 80px;
`;
const Title = styled.Text`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 24px;
`;
const Field = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-vertical: 8px;
    text-align: center;
`;
const FieldValue = styled.Text`
    font-weight: normal;
`;
const ButtonContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
`;
const ActionButton = styled.TouchableOpacity`
    background-color: #007bff;
    padding: 12px 24px;
    border-radius: 10px;
    margin-bottom: 12px;
    width: 60%;
    align-items: center;
`;
const RedButton = styled(ActionButton)`
    background-color: #dc3545;
`;
const ActionText = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 16px;
`;
const DeleteButton = styled.TouchableOpacity`
    position: absolute;
    top: 40px;
    left: 24px;
`;
const DeleteText = styled.Text`
    color: #dc3545;
    font-weight: bold;
    font-size: 16px;
`;
