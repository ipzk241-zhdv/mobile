import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { authentication, db } from "../../firebase/config";
import { useAuth } from "../../contexts/AuthContext";

const REQUIRED_FIELDS = ["name", "lastname", "city", "yearsOld", "hobby"];

const ProfileScreen = () => {
    const { loggedInUser, setLoggedInUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!loggedInUser) return;

                const userRef = doc(db, "users", loggedInUser.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const data = userSnap.data();
                    setProfile(data);

                    const isIncomplete = REQUIRED_FIELDS.some(
                        (field) => !data[field] || data[field].toString().trim() === ""
                    );

                    if (isIncomplete) {
                        navigation.replace("EditProfile");
                    }
                } else {
                    console.log("Користувач не знайдений у Firestore");
                }
            } catch (err) {
                console.log("Помилка при отриманні профілю:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [loggedInUser]);

    const handleSignOut = async () => {
        try {
            await signOut(authentication);
            setLoggedInUser(null);
        } catch (err) {
            Alert.alert("Помилка", "Не вдалося вийти з акаунту.");
            console.log(err);
        }
    };

    const getField = (value) => (value ? value : "-");

    if (loading) {
        return (
            <Centered>
                <ActivityIndicator size="large" />
            </Centered>
        );
    }

    return (
        <Container>
            <DeleteButton onPress={() => navigation.replace("DeleteProfile")}>
                <DeleteText>Видалити</DeleteText>
            </DeleteButton>

            <Content>
                <Title>Ваш профіль</Title>

                <Field>
                    Ім'я: <FieldValue>{getField(profile?.name)}</FieldValue>
                </Field>
                <Field>
                    Прізвище: <FieldValue>{getField(profile?.lastname)}</FieldValue>
                </Field>
                <Field>
                    Місто: <FieldValue>{getField(profile?.city)}</FieldValue>
                </Field>
                <Field>
                    Вік: <FieldValue>{getField(profile?.yearsOld)}</FieldValue>
                </Field>
                <Field>
                    Хоббі: <FieldValue>{getField(profile?.hobby)}</FieldValue>
                </Field>
            </Content>

            <ButtonContainer>
                <ActionButton onPress={() => navigation.replace("EditProfile")}>
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


// ================= styled components =================

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
    margin-top: 200px;
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
