import React from "react";
import { TouchableOpacity } from "react-native";
import { File, Folder, CheckSquare, Square } from "lucide-react-native";
import styled from "styled-components/native";

interface Props {
    item: FileSystem.FileInfo;
    selectedItems: Set<string>;
    setSelectedItems: (set: Set<string>) => void;
    onOpen: (item: FileSystem.FileInfo) => void;
}

const ItemList: React.FC<Props> = ({ item, selectedItems, setSelectedItems, onOpen }) => {
    const selected = selectedItems.has(item.uri);

    const toggleSelect = () => {
        const newSet = new Set(selectedItems);
        if (newSet.has(item.uri)) newSet.delete(item.uri);
        else newSet.add(item.uri);
        setSelectedItems(newSet);
    };

    const handlePress = () => {
        onOpen(item);
    };

    return (
        <ItemContainer>
            <ItemTouchable onPress={handlePress}>
                <ItemRow>
                    {item.isDirectory ? <Folder size={20} /> : <File size={20} />}
                    <ItemName>{item.uri.split("/").pop()}</ItemName>
                </ItemRow>
            </ItemTouchable>

            <CheckboxTouchable onPress={toggleSelect}>
                {selected ? <CheckSquare size={20} color="#007aff" /> : <Square size={20} color="#ccc" />}
            </CheckboxTouchable>
        </ItemContainer>
    );
};

export default ItemList;

const ItemContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 8px;
    background-color: #fff;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
    justify-content: space-between;
`;

const ItemTouchable = styled.TouchableOpacity`
    flex: 1;
`;

const ItemRow = styled.View`
    flex-direction: row;
    align-items: center;
`;

const ItemName = styled.Text`
    margin-left: 10px;
`;

const CheckboxTouchable = styled.TouchableOpacity`
    padding: 8px;
`;
