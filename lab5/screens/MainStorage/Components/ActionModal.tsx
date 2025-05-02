import React, { useState } from "react";
import { Modal, Alert } from "react-native";
import styled from "styled-components/native";

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

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <Overlay onTouchEnd={onClose}>
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
                            <Input value={renameInput} onChangeText={setRenameInput} placeholder="Нове ім’я" />
                            <ActionButton onPress={handleRename}>
                                <ActionText>Перейменувати</ActionText>
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
            </Overlay>
        </Modal>
    );
};

export default ActionModal;

const Overlay = styled.View`
    flex: 1;
    background: rgba(0, 0, 0, 0.5);
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
