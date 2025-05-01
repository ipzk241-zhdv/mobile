import React, { useState, useEffect } from "react";
import { View, FlatList, TextInput, TouchableOpacity, Alert, Modal, Text as RNText } from "react-native";
import styled from "styled-components/native";
import * as FileSystem from "expo-file-system";
import { Pencil, EllipsisVertical } from "lucide-react-native";
import { Text } from "react-native";

const ROOT_DIR = FileSystem.documentDirectory + "AppData";

export const MainStorageScreen: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [currentPath, setCurrentPath] = useState(ROOT_DIR);
    const [isEditing, setIsEditing] = useState(false);
    const [pathInput, setPathInput] = useState("");
    const [items, setItems] = useState<FileSystem.FileInfo[]>([]);
    const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
    const [actionsVisible, setActionsVisible] = useState(false);

    useEffect(() => {
        loadDirectory(currentPath);
    }, [currentPath]);

    const loadDirectory = async (path: string) => {
        try {
            const dirContents = await FileSystem.readDirectoryAsync(path);
            const files = await Promise.all(
                dirContents.map(async (name) => {
                    const fullPath = path + "/" + name;
                    return await FileSystem.getInfoAsync(fullPath);
                })
            );
            setItems(files);
            const rel = path.replace(ROOT_DIR, "");
            setBreadcrumb(rel.split("/").filter(Boolean));
        } catch (error) {
            Alert.alert("Error", "Cannot access directory.");
        }
    };

    // Перевірка існування шляху перед навігацією
    const goToPath = async (newPath: string) => {
        try {
            const info = await FileSystem.getInfoAsync(newPath);
            if (!info.exists) {
                Alert.alert("Помилка", "Шлях не знайдено");
                return;
            }
            setCurrentPath(newPath);
            setIsEditing(false);
            setActionsVisible(false);
        } catch {
            Alert.alert("Помилка", "Не вдалось перевірити шлях");
        }
    };

    const handlePathSubmit = () => {
        // конвертуємо відносний у абсолютний
        let candidate = pathInput;
        if (candidate.startsWith("AppData")) {
            const tail = candidate.slice("AppData".length);
            candidate = ROOT_DIR + tail;
        }
        goToPath(candidate);
    };

    const handleBreadcrumbPress = (index: number) => {
        const segs = breadcrumb.slice(0, index + 1);
        const newPath = ROOT_DIR + (segs.length ? "/" + segs.join("/") : "");
        goToPath(newPath);
    };

    // Автоматично заповнюємо поле вводу при вході в режим редагування
    useEffect(() => {
        if (isEditing) {
            const rel = currentPath.replace(ROOT_DIR, "");
            setPathInput("AppData" + rel);
        }
    }, [isEditing]);

    // Створення нового файлу/папки
    const createEntry = async (isFolder: boolean) => {
        const name = isFolder ? "NewFolder" : "file.txt";
        const newUri = `${currentPath}/${name}`;
        try {
            if (isFolder) {
                await FileSystem.makeDirectoryAsync(newUri);
            } else {
                await FileSystem.writeAsStringAsync(newUri, "");
            }
            await loadDirectory(currentPath);
        } catch {
            Alert.alert("Помилка", `Не вдалось створити ${isFolder ? "папку" : "файл"}`);
        } finally {
            setActionsVisible(false);
        }
    };

    const renderItem = ({ item }: { item: FileSystem.FileInfo }) => {
        const parts = item.uri.split("/");
        const name = parts[parts.length - 1] || "Unnamed";
        const isSelected = selectedItems.has(item.uri);

        const toggleSelection = () => {
            setSelectedItems((prev) => {
                const newSet = new Set(prev);
                if (newSet.has(item.uri)) newSet.delete(item.uri);
                else newSet.add(item.uri);
                return newSet;
            });
        };

        return (
            <ItemContainer>
                <ItemRow>
                    <ItemText>{name}</ItemText>
                    <TouchableOpacity onPress={toggleSelection}>
                        <Checkbox>{isSelected ? "☑" : "☐"}</Checkbox>
                    </TouchableOpacity>
                </ItemRow>
            </ItemContainer>
        );
    };

    return (
        <Container>
            <BreadcrumbBar>
                {isEditing ? (
                    <PathInput value={pathInput} onChangeText={setPathInput} onSubmitEditing={handlePathSubmit} returnKeyType="done" />
                ) : (
                    <BreadcrumbText>
                        <BreadcrumbButton onPress={() => handleBreadcrumbPress(-1)}>
                            <BreadcrumbSegment>AppData</BreadcrumbSegment>
                        </BreadcrumbButton>
                        {breadcrumb.map((folder, i) => (
                            <BreadcrumbButton key={i} onPress={() => handleBreadcrumbPress(i)}>
                                <BreadcrumbSeparator>›</BreadcrumbSeparator>
                                <BreadcrumbSegment>{folder}</BreadcrumbSegment>
                            </BreadcrumbButton>
                        ))}
                    </BreadcrumbText>
                )}
                <ActionsWrapper>
                    <EditButton onPress={() => setIsEditing(!isEditing)}>
                        <Pencil color="#000" size={20} />
                    </EditButton>
                    <EditButton onPress={() => setActionsVisible(true)}>
                        <EllipsisVertical color="#000" size={20} />
                    </EditButton>
                </ActionsWrapper>
            </BreadcrumbBar>

            <FlatList data={items} keyExtractor={(item) => item.uri} renderItem={renderItem} contentContainerStyle={{ padding: 8 }} />

            {/* Модальне меню для створення */}
            <Modal transparent visible={actionsVisible} animationType="fade" onRequestClose={() => setActionsVisible(false)}>
                <ModalOverlay onPress={() => setActionsVisible(false)}>
                    <ModalContent>
                        <ActionButton onPress={() => createEntry(true)}>
                            <RNText>Створити папку</RNText>
                        </ActionButton>
                        <ActionButton onPress={() => createEntry(false)}>
                            <RNText>Створити файл</RNText>
                        </ActionButton>
                        <ActionButton
                            disabled={selectedItems.size === 0}
                            onPress={() => {
                                // видалити всі вибрані
                                selectedItems.forEach(async (uri) => {
                                    try {
                                        await FileSystem.deleteAsync(uri, { idempotent: true });
                                    } catch (e) {}
                                });
                                setSelectedItems(new Set());
                                //await
                                loadDirectory(currentPath);
                                setActionsVisible(false);
                            }}
                        >
                            <RNText style={{ color: selectedItems.size ? "black" : "#aaa" }}>Видалити</RNText>
                        </ActionButton>
                        <ActionButton
                            disabled={selectedItems.size !== 1}
                            onPress={() => {
                                const uri = Array.from(selectedItems)[0];
                                const parts = uri.split("/");
                                const oldName = parts[parts.length - 1];
                                Alert.prompt("Перейменувати", `Старе ім'я: ${oldName}`, async (newName) => {
                                    if (!newName) return;
                                    const newUri = parts.slice(0, -1).join("/") + "/" + newName;
                                    try {
                                        await FileSystem.moveAsync({ from: uri, to: newUri });
                                        setSelectedItems(new Set());
                                        await loadDirectory(currentPath);
                                    } catch (e) {
                                        Alert.alert("Помилка", "Не вдалося перейменувати.");
                                    }
                                });
                                setActionsVisible(false);
                            }}
                        >
                            <RNText style={{ color: selectedItems.size === 1 ? "black" : "#aaa" }}>Перейменувати</RNText>
                        </ActionButton>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </Container>
    );
};

// Styled components
const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;

const BreadcrumbBar = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 12px 16px;
    background-color: #f0f0f0;
`;

const BreadcrumbText = styled.View`
    flex-direction: row;
    flex: 1;
    flex-wrap: wrap;
`;

const BreadcrumbButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

const BreadcrumbSegment = styled.Text`
    font-weight: bold;
`;

const BreadcrumbSeparator = styled.Text`
    margin: 0 4px;
    color: #666;
`;

const ActionsWrapper = styled.View`
    flex-direction: row;
`;

const EditButton = styled.TouchableOpacity`
    margin-left: 8px;
`;

const PathInput = styled.TextInput`
    flex: 1;
    border: 1px solid #ccc;
    padding: 4px 8px;
    border-radius: 4px;
`;

const ItemContainer = styled.View`
    padding: 12px;
    border-bottom-width: 1px;
    border-color: #eee;
`;

const ItemText = styled.Text`
    font-size: 16px;
`;

const ModalOverlay = styled.TouchableOpacity`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.3);
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.View`
    background: #fff;
    padding: 16px;
    border-radius: 8px;
    width: 200px;
`;

const ActionButton = styled.TouchableOpacity`
    padding: 12px;
    align-items: center;
`;

const ItemRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Checkbox = styled.Text`
  font-size: 20px;
  margin-left: 8px;
`;