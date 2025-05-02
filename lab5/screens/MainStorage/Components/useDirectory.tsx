import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

export const ROOT_DIR = FileSystem.documentDirectory + "AppData";

const resolvePath = (path: string): string => {
    if (path.startsWith("file:")) return path;
    if (path.startsWith(ROOT_DIR)) return path;
    const cleaned = path.replace(/^\/?AppData\/?/, "");
    return `${ROOT_DIR}/${cleaned}`.replace(/\/\//g, "/");
};

export const useDirectory = () => {
    const [items, setItems] = useState<FileSystem.FileInfo[]>([]);
    const [currentPath, setCurrentPath] = useState<string>(ROOT_DIR);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

    useEffect(() => {
        loadDirectory(currentPath);
    }, [currentPath]);

    const loadDirectory = async (path: string) => {
        const fullPath = resolvePath(path);
        try {
            const dirNames = await FileSystem.readDirectoryAsync(fullPath);
            const files = await Promise.all(
                dirNames.map(async (name) => {
                    const uri = `${fullPath}/${name}`;
                    return FileSystem.getInfoAsync(uri);
                })
            );
            setItems(files);

            let rel = path.replace(ROOT_DIR, "");
            rel = rel.replace(/^\/?AppData\/?/, "");
            const crumbs = rel.split("/").filter(Boolean);
            setBreadcrumb(crumbs);
        } catch (error) {
            console.error("loadDirectory error", error);
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
        } catch (error) {
            console.error("goToPath error", error);
            Alert.alert("Помилка", "Не вдалось перевірити шлях");
        }
    };

    const createEntry = async (isFolder: boolean) => {
        const fullDir = resolvePath(currentPath);
        const defaultName = isFolder ? "NewFolder" : "file.txt";

        let existing: string[] = [];
        try {
            existing = await FileSystem.readDirectoryAsync(fullDir);
        } catch {
            existing = [];
        }

        let base: string;
        let ext: string;
        if (isFolder) {
            base = defaultName;
            ext = "";
        } else {
            const idx = defaultName.lastIndexOf(".");
            if (idx !== -1) {
                base = defaultName.substring(0, idx);
                ext = defaultName.substring(idx);
            } else {
                base = defaultName;
                ext = "";
            }
        }

        let uniqueName = defaultName;
        let counter = 1;
        while (existing.includes(uniqueName)) {
            uniqueName = `${base}(${counter})${ext}`;
            counter++;
        }

        const newUri = decodeURIComponent(`${fullDir}/${uniqueName}`.replace(/\/\//g, "/"));

        try {
            if (isFolder) {
                await FileSystem.makeDirectoryAsync(newUri, { intermediates: true });
            } else {
                await FileSystem.writeAsStringAsync(newUri, "");
            }
            await loadDirectory(currentPath);
        } catch (error) {
            console.error("createEntry error", error);
            Alert.alert("Помилка", `Не вдалось створити ${isFolder ? "папку" : "файл"}`);
        }
    };

    const deleteSelected = async () => {
        for (const uri of selectedItems) {
            try {
                await FileSystem.deleteAsync(uri, { idempotent: true });
            } catch (error) {
                console.warn("deleteSelected error", error);
            }
        }
        setSelectedItems(new Set());
        await loadDirectory(currentPath);
    };

    const renameItem = async (oldUri: string, newName: string) => {
        const parts = oldUri.split("/");
        const newUri = [...parts.slice(0, -1), newName].join("/");
        try {
            await FileSystem.moveAsync({ from: oldUri, to: newUri });
            await loadDirectory(currentPath);
            setSelectedItems(new Set());
        } catch (error) {
            console.error("renameItem error", error);
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
