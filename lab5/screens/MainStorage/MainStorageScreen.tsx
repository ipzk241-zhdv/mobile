import React, { useState, useEffect } from "react";
import { View, FlatList, Alert, Modal } from "react-native";
import { Pencil, EllipsisVertical } from "lucide-react-native";
import { Text } from "react-native";
import styled from "styled-components/native";

import { useDirectory } from "./Components/useDirectory";
import Breadcrumb from "./Components/Breadcrumb";
import ItemList from "./Components/ItemList";
import ActionModal from "./Components/ActionModal";

const MainStorageScreen: React.FC = () => {
    const {
        items,
        currentPath,
        breadcrumb,
        selectedItems,
        loadDirectory,
        goToPath,
        createEntry,
        renameItem,
        deleteSelected,
        setSelectedItems,
        ROOT_DIR,
        setCurrentPath,
    } = useDirectory();

    const [isEditing, setIsEditing] = useState(false);
    const [pathInput, setPathInput] = useState("");
    const [actionsVisible, setActionsVisible] = useState(false);

    useEffect(() => {
        if (isEditing) {
            const rel = currentPath.replace(ROOT_DIR, "");
            setPathInput("AppData" + rel);
        }
    }, [isEditing]);

    const handlePathSubmit = () => {
        let candidate = pathInput;
        if (candidate.startsWith("AppData")) {
            const tail = candidate.slice("AppData".length);
            candidate = ROOT_DIR + tail;
        }
        goToPath(candidate);
        setIsEditing(false);
    };

    return (
        <Container>
            <Breadcrumb
                isEditing={isEditing}
                pathInput={pathInput}
                onChangeInput={setPathInput}
                onSubmit={handlePathSubmit}
                breadcrumb={breadcrumb}
                onBreadcrumbPress={goToPath}
                toggleEdit={() => setIsEditing(!isEditing)}
                openActions={() => setActionsVisible(true)}
            />

            <FlatList
                data={items}
                keyExtractor={(item) => item.uri}
                renderItem={({ item }) => (
                    <ItemList
                        item={item}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        onOpen={(item) => {
                            if (item.isDirectory) {
                                setCurrentPath(item.uri);
                            } else {
                                readFileAsync(item.uri);
                            }
                        }}
                    />
                )}
                contentContainerStyle={{ padding: 8 }}
            />

            <ActionModal
                visible={actionsVisible}
                onClose={() => setActionsVisible(false)}
                createEntry={createEntry}
                deleteSelected={deleteSelected}
                renameItem={renameItem}
                selectedItems={selectedItems}
            />
        </Container>
    );
};

export default MainStorageScreen;

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;
