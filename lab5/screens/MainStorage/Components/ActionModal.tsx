import React, { useState } from "react";
import { Modal, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components/native";
import * as FileSystem from "expo-file-system";

interface Props {
    visible: boolean;
    onClose: () => void;
    createEntry: (isFolder: boolean) => void;
    deleteSelected: () => void;
    renameItem: (oldUri: string, newName: string) => void;
    selectedItems: Set<string>;
}

const ActionModal: React.FC<Props> = ({ visible, onClose, createEntry, deleteSelected, renameItem, selectedItems }) => {
    const [renameInput, setRenameInput] = useState("");

    const handleRename = () => {
        if (selectedItems.size !== 1) return;
        const uri = Array.from(selectedItems)[0];
        renameItem(uri, renameInput);
        setRenameInput("");
        onClose();
    };

    const showInfo = async () => {
        if (selectedItems.size !== 1) return;
        const uri = Array.from(selectedItems)[0];
        try {
            const info = await FileSystem.getInfoAsync(uri, { size: true, md5: false });
            const parts = uri.split("/");
            const name = parts[parts.length - 1];

            let type: string;
            if (info.isDirectory) {
                type = "Folder";
            } else {
                const extMatch = name.match(/\.([^.]+)$/);
                const ext = extMatch ? extMatch[1].toLowerCase() : "";
                if (ext === "txt") {
                    type = "Text file";
                } else if (["img", "bmp", "png"].includes(ext)) {
                    type = "Image file";
                } else if (ext === "mp3") {
                    type = "Audio file";
                } else if (ext) {
                    type = `${ext.toUpperCase()} file`;
                } else {
                    type = "Without extension";
                }
            }

            const size = info.size ?? 0;
            const mtime = info.modificationTime ? new Date(info.modificationTime * 1000).toLocaleString() : "Unknown";
            const message = `Назва: ${name}\nТип: ${type}\nРозмір: ${size} байт\nОстаннє змінення: ${mtime}`;
            Alert.alert("Інформація", message, [{ text: "OK" }]);
        } catch (error) {
            console.error("showInfo error", error);
            Alert.alert("Помилка", "Не вдалося отримати інформацію");
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <TouchableWithoutFeedback onPress={onClose}>
                <Background />
            </TouchableWithoutFeedback>

            <ContentContainer>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <Content>
                        <ActionButton
                            onPress={() => {
                                createEntry(true);
                                onClose();
                            }}
                        >
                            <ActionText>Створити папку</ActionText>
                        </ActionButton>
                        <ActionButton
                            onPress={() => {
                                createEntry(false);
                                onClose();
                            }}
                        >
                            <ActionText>Створити файл</ActionText>
                        </ActionButton>

                        {selectedItems.size === 1 && (
                            <>
                                <Input value={renameInput} onChangeText={setRenameInput} placeholder="Нове ім’я" autoFocus />
                                <ActionButton onPress={handleRename}>
                                    <ActionText>Перейменувати</ActionText>
                                </ActionButton>
                                <ActionButton onPress={showInfo}>
                                    <ActionText>Інформація</ActionText>
                                </ActionButton>
                            </>
                        )}

                        {selectedItems.size > 0 && (
                            <ActionButton
                                onPress={() => {
                                    Alert.alert("Видалити", "Ви впевнені?", [
                                        { text: "Скасувати", style: "cancel" },
                                        {
                                            text: "Видалити",
                                            style: "destructive",
                                            onPress: () => {
                                                deleteSelected();
                                                onClose();
                                            },
                                        },
                                    ]);
                                }}
                            >
                                <ActionText style={{ color: "red" }}>Видалити</ActionText>
                            </ActionButton>
                        )}
                    </Content>
                </TouchableWithoutFeedback>
            </ContentContainer>
        </Modal>
    );
};

export default ActionModal;

const Background = styled.View`
    flex: 1;
    background: rgba(0, 0, 0, 0.5);
`;

const ContentContainer = styled.View`
    justify-content: flex-end;
`;

const Content = styled.View`
    background: white;
    padding: 16px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`;

const ActionButton = styled.TouchableOpacity`
    padding: 12px 0;
`;

const ActionText = styled.Text`
    font-size: 16px;
    color: #333;
`;

const Input = styled.TextInput`
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    margin-bottom: 8px;
`;
