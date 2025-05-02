import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

export const ROOT_DIR = FileSystem.documentDirectory + "AppData";

const resolvePath = (path: string): string => {
    if (path.startsWith("file:")) return path;
    if (path.startsWith(ROOT_DIR)) return path;
    const cleanedPath = path.replace(/^AppData\/?/, "");
    return `${ROOT_DIR}/${cleanedPath}`.replace(/\/+/g, "/");
};

export const useDirectory = () => {
    const [items, setItems] = useState<FileSystem.FileInfo[]>([]);
    const [currentPath, setCurrentPath] = useState(ROOT_DIR);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

    useEffect(() => {
        loadDirectory(currentPath);
    }, [currentPath]);

    const loadDirectory = async (path: string) => {
        const fullPath = resolvePath(path);
        try {
            const dirContents = await FileSystem.readDirectoryAsync(fullPath);
            const files = await Promise.all(
                dirContents.map(async (name) => {
                    const filePath = `${fullPath}/${name}`;
                    return await FileSystem.getInfoAsync(filePath);
                })
            );
            setItems(files);
            console.log("load path", path);
            const rel = path.replace(ROOT_DIR, "");
            console.log("replaced path", rel);
            setBreadcrumb(rel.split("/").filter(Boolean));
        } catch {
            Alert.alert("Error", "Cannot access directory.");
        }
    };

    const goToPath = async (newPath: string) => {
        const fullPath = resolvePath(newPath);
        try {
            const info = await FileSystem.getInfoAsync(fullPath);
            if (!info.exists) {
                Alert.alert("Помилка", "Шлях не знайдено");
                return;
            }
            setCurrentPath(newPath);
        } catch {
            Alert.alert("Помилка", "Не вдалось перевірити шлях");
        }
    };

    const createEntry = async (isFolder: boolean) => {
        const name = isFolder ? "NewFolder" : "file.txt";
        const newUri = `${currentPath}/${name}`;
        try {
            if (isFolder) await FileSystem.makeDirectoryAsync(newUri);
            else await FileSystem.writeAsStringAsync(newUri, "");
            await loadDirectory(currentPath);
        } catch {
            Alert.alert("Помилка", `Не вдалось створити ${isFolder ? "папку" : "файл"}`);
        }
    };

    const deleteSelected = async () => {
        for (let uri of selectedItems) {
            try {
                await FileSystem.deleteAsync(uri, { idempotent: true });
            } catch {}
        }
        setSelectedItems(new Set());
        await loadDirectory(currentPath);
    };

    const renameItem = async (oldUri: string, newName: string) => {
        const parts = oldUri.split("/");
        const newUri = parts.slice(0, -1).join("/") + "/" + newName;
        try {
            await FileSystem.moveAsync({ from: oldUri, to: newUri });
            await loadDirectory(currentPath);
            setSelectedItems(new Set());
        } catch {
            Alert.alert("Помилка", "Не вдалося перейменувати.");
        }
    };

    return {
        items,
        currentPath,
        breadcrumb,
        selectedItems,
        setSelectedItems,
        loadDirectory,
        goToPath,
        createEntry,
        deleteSelected,
        renameItem,
        ROOT_DIR,
        setCurrentPath,
    };
};
