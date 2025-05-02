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
                Alert.alert("Error", "Path not found.");
                return;
            }
            setCurrentPath(newPath);
        } catch (error) {
            console.error("goToPath error", error);
            Alert.alert("Error", "Failed to check path.");
        }
    };

    const createEntry = async (isFolder: boolean, name: string, content: string = "") => {
        const fullDir = resolvePath(currentPath);
        const existing = await FileSystem.readDirectoryAsync(fullDir).catch(() => []);
        let unique = name;
        let counter = 1;
        while (existing.includes(unique)) {
            unique = name.replace(/(\(\d+\))?$/, `(${counter})`);
            counter++;
        }
        const uri = `${fullDir}/${unique}`.replace(/\/\//g, "/");

        try {
            if (isFolder) {
                await FileSystem.makeDirectoryAsync(uri, { intermediates: true });
            } else {
                await FileSystem.writeAsStringAsync(uri, content);
            }
            await loadDirectory(currentPath);
        } catch {
            Alert.alert("Error", `Failed to create ${isFolder ? "folder" : "file"}`);
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
            Alert.alert("Error", "Failed to rename.");
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
