import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Pencil, EllipsisVertical } from "lucide-react-native";
import styled from "styled-components/native";

interface Props {
    isEditing: boolean;
    pathInput: string;
    onChangeInput: (val: string) => void;
    onSubmit: () => void;
    breadcrumb: string[];
    onBreadcrumbPress: (path: string) => void;
    toggleEdit: () => void;
    openActions: () => void;
}

const Breadcrumb: React.FC<Props> = ({ isEditing, pathInput, onChangeInput, onSubmit, breadcrumb, onBreadcrumbPress, toggleEdit, openActions }) => {
    const fullPath = ["AppData", ...breadcrumb];

    return (
        <BreadcrumbContainer>
            {isEditing ? (
                <Input value={pathInput} onChangeText={onChangeInput} onSubmitEditing={onSubmit} autoFocus />
            ) : (
                <PathRow>
                    {fullPath.map((name, index) => (
                        <TouchableOpacity key={index} onPress={() => onBreadcrumbPress("AppData/" + fullPath.slice(1, index + 1).join("/"))}>
                            <PathSegment>{name} / </PathSegment>
                        </TouchableOpacity>
                    ))}
                </PathRow>
            )}
            <IconRow>
                <IconTouchable onPress={toggleEdit}>
                    <Pencil color="#000" size={20} />
                </IconTouchable>
                <IconTouchable onPress={openActions}>
                    <EllipsisVertical color="#000" size={20} />
                </IconTouchable>
            </IconRow>
        </BreadcrumbContainer>
    );
};

export default Breadcrumb;

const BreadcrumbContainer = styled.View`
    padding: 8px;
    background: #f0f0f0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const PathRow = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
`;

const PathSegment = styled.Text`
    font-weight: bold;
    color: #333;
`;

const IconRow = styled.View`
    flex-direction: row;
`;

const IconTouchable = styled.TouchableOpacity`
    margin-left: 8px;
`;

const Input = styled.TextInput`
    flex: 1;
    padding: 4px 8px;
    border: 1px solid #ccc;
    background: white;
    border-radius: 4px;
`;
