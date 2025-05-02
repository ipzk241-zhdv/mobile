import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface EditorModalProps {
    visible: boolean;
    onClose: () => void;
    uri: string;
}

const EditorModal: React.FC<EditorModalProps> = ({ visible, onClose, uri }) => {
    const handleInfo = () => {
        onClose();
    };

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <Overlay onPress={onClose} />
            <ModalContent>
                <OptionButton onPress={handleInfo}>
                    <OptionText>Info</OptionText>
                </OptionButton>
                <OptionButton onPress={onClose}>
                    <OptionText>OK</OptionText>
                </OptionButton>
            </ModalContent>
        </Modal>
    );
};

export default EditorModal;

const Overlay = styled.TouchableOpacity`
    flex: 1;
    background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
    background: white;
    padding: 16px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`;

const OptionButton = styled.TouchableOpacity`
    padding: 12px 0;
`;

const OptionText = styled.Text`
    font-size: 16px;
    text-align: center;
`;
