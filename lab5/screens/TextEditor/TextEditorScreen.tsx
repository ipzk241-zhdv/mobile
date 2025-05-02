import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, Platform } from "react-native";
import styled from "styled-components/native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import EditorModal from "./Components/EditorModal";
import * as FileSystem from "expo-file-system";
import { EllipsisVertical } from "lucide-react-native";

type TextEditorRouteProp = RouteProp<RootStackParamList, "TextEditor">;
type TextEditorNavProp = NativeStackNavigationProp<RootStackParamList, "TextEditor">;

const TextEditorScreen: React.FC = () => {
    const route = useRoute<TextEditorRouteProp>();
    const navigation = useNavigation<TextEditorNavProp>();
    const { uri, caption } = route.params;

    const [text, setText] = useState<string>("");
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const content = await FileSystem.readAsStringAsync(uri);
                setText(content);
            } catch (e) {
                Alert.alert("Error", "Failed to read.");
            }
        })();

        navigation.setOptions({
            headerLeft: () => (
                <BackButton onPress={() => navigation.goBack()}>
                    <Text>Back</Text>
                </BackButton>
            ),
            headerTitle: () => <Caption>{caption}</Caption>,
            headerRight: () => (
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ paddingHorizontal: 12 }}>
                    <EllipsisVertical color="#000" size={24} />
                </TouchableOpacity>
            ),
            headerTitleAlign: "center",
            headerLeftContainerStyle: { paddingLeft: 12 },
            headerTitleContainerStyle: { paddingHorizontal: 16 },
            headerRightContainerStyle: { paddingRight: 12 },
        });
    }, [uri, caption]);

    const handleSave = async () => {
        try {
            await FileSystem.writeAsStringAsync(uri, text);
            Alert.alert("Success", "File saved.");
        } catch {
            Alert.alert("Error", "Failed to save.");
        }
    };

    return (
        <Container>
            <EditorTextInput multiline value={text} onChangeText={setText} />
            <SaveButton onPress={handleSave}>
                <SaveButtonText>Save</SaveButtonText>
            </SaveButton>
            <EditorModal visible={modalVisible} onClose={() => setModalVisible(false)} uri={uri} />
        </Container>
    );
};

export default TextEditorScreen;

const Container = styled.View`
    flex: 1;
    padding: 16px;
    background-color: #fff;
`;

const EditorTextInput = styled.TextInput`
    flex: 1;
    text-align-vertical: top;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
`;

const SaveButton = styled.TouchableOpacity`
    padding: 12px;
    margin-top: 8px;
    background-color: #007bff;
    border-radius: 4px;
    align-items: center;
`;

const SaveButtonText = styled.Text`
    color: white;
    font-weight: bold;
`;

const BackButton = styled.TouchableOpacity`
    margin-left: 12px;
`;

const Caption = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;
