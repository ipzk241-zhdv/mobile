import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../firebase/api";
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
                if (incomplete) resetTo("EditProfile");
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
            "Ви впевнені?",
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
                            Alert.alert("Помилка", "Не вдалося вийти");
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    if (loading || fetching) {
        return (
            <Centered>
                <ActivityIndicator size="large" />
            </Centered>
        );
    }

    const RenderHeader = () => (
        <>
            <TopButtons>
                <ActionButton onPress={handleSignOut}>
                    <ActionText>Вийти</ActionText>
                </ActionButton>
                <ActionButton onPress={() => resetTo("EditProfile")}>
                    <ActionText>Редагувати</ActionText>
                </ActionButton>
                <ActionButton onPress={() => resetTo("DeleteProfile")}>
                    <ActionText>Видалити</ActionText>
                </ActionButton>
            </TopButtons>

            {profile && (
                <ProfileContainer>
                    <Title>Ваш профіль</Title>
                    <Field>
                        Ім'я: <FieldValue>{profile.name || "-"}</FieldValue>
                    </Field>
                    <Field>
                        Прізвище: <FieldValue>{profile.lastname || "-"}</FieldValue>
                    </Field>
                    <Field>
                        Місто: <FieldValue>{profile.city || "-"}</FieldValue>
                    </Field>
                    <Field>
                        Вік: <FieldValue>{profile.yearsOld || "-"}</FieldValue>
                    </Field>
                    <Field>
                        Хоббі: <FieldValue>{profile.hobby || "-"}</FieldValue>
                    </Field>
                </ProfileContainer>
            )}

            <SectionHeader>
                <SectionTitle>Пости</SectionTitle>
                <ActionButton onPress={() => resetTo("PostCreate")}>
                    <ActionText>Новий</ActionText>
                </ActionButton>
            </SectionHeader>
        </>
    );

    return <PostsList headerComponent={RenderHeader()} />;
};

export default ProfileScreen;

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    padding: 32px 16px;
`;
const Centered = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const TopButtons = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 16px;
`;
const ActionButton = styled.TouchableOpacity`
    padding: 8px 12px;
    background-color: #007bff;
    border-radius: 6px;
`;
const ActionText = styled.Text`
    color: white;
    font-weight: bold;
`;
const ProfileContainer = styled.View`
    padding: 16px;
`;
const Title = styled.Text`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 8px;
`;
const Field = styled.Text`
    font-size: 16px;
    margin-vertical: 4px;
`;
const FieldValue = styled.Text`
    font-weight: normal;
`;
const SectionHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-top-width: 1px;
    border-color: #ddd;
`;
const SectionTitle = styled.Text`
    font-size: 22px;
    font-weight: bold;
`;
