import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import * as FileSystem from "expo-file-system";
import { Smartphone, HardDrive, Download, FileSliders, Trash, Image, Video } from "lucide-react-native";
import { StorageButton } from "./components/StorageButton";
import { useNavigation } from "@react-navigation/native";

const localButtons = [
    { label: "Main storage", icon: Smartphone, color: "#FFA500", key: "main" },
    { label: "SD card", icon: HardDrive, color: "#6A5ACD", key: "sd" },
    { label: "Downloads", icon: Download, color: "#1E90FF", key: "downloads" },
    { label: "Apps", icon: FileSliders, color: "#90EE90", key: "apps" },
    { label: "Recycle Bin", icon: Trash, color: "#708090", key: "recycle" },
];

const libraryButtons = [
    { label: "Images", icon: Image, color: "#FF69B4", key: "images" },
    { label: "Videos", icon: Video, color: "#FF4500", key: "videos" },
];

export const HomeScreen = () => {
    const navigation = useNavigation();

    const appDataDir = FileSystem.documentDirectory + "AppData";
    const [totalSpace, setTotalSpace] = useState<number | null>(null);
    const [freeSpace, setFreeSpace] = useState<number | null>(null);

    useEffect(() => {
        const prepareStorage = async () => {
            const dirInfo = await FileSystem.getInfoAsync(appDataDir);
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(appDataDir, { intermediates: true });
            }

            const total = await FileSystem.getTotalDiskCapacityAsync();
            const free = await FileSystem.getFreeDiskStorageAsync();
            setTotalSpace(total);
            setFreeSpace(free);
        };

        prepareStorage();
    }, []);

    const usedPercentage = totalSpace && freeSpace
        ? Math.round(((totalSpace - freeSpace) / totalSpace) * 100)
        : 0;

    const handleMainStorage = () => {
        navigation.navigate("MainStorage" as never);
    };

    const renderSection = (title: string, data: typeof localButtons) => (
        <>
            <SectionTitle>{title}</SectionTitle>
            <FlatList
                data={data}
                keyExtractor={(item) => item.key}
                numColumns={3}
                contentContainerStyle={{ alignItems: "center" }}
                renderItem={({ item }) => (
                    <StorageButton
                        label={item.label}
                        Icon={item.icon}
                        color={item.color}
                        onPress={item.key === "main" ? handleMainStorage : undefined}
                    />
                )}
            />
        </>
    );

    return (
        <Container>
            <Header>
                <Title>File Explorer</Title>
                {totalSpace === null || freeSpace === null ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : (
                    <StorageInfo>
                        <Percentage>{usedPercentage}%</Percentage>
                        <Text style={{ color: "#fff" }}>Main storage</Text>
                        <Text style={{ color: "#fff" }}>
                            {((totalSpace - freeSpace) / 1e9).toFixed(1)} GB / {(totalSpace / 1e9).toFixed(1)} GB
                        </Text>
                        <StorageBar>
                            <StorageFill width={`${usedPercentage}%`} />
                        </StorageBar>
                    </StorageInfo>
                )}
            </Header>

            {renderSection("LOCAL", localButtons)}
            {renderSection("LIBRARY", libraryButtons)}
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;

const Header = styled.View`
    background-color: #00aaff;
    padding: 32px 16px;
    align-items: center;
`;

const Title = styled.Text`
    color: white;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 8px;
`;

const StorageInfo = styled.View`
    align-items: center;
`;

const Percentage = styled.Text`
    font-size: 24px;
    color: #fff;
    font-weight: bold;
`;

const StorageBar = styled.View`
    height: 6px;
    width: 200px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    margin-top: 8px;
`;

const StorageFill = styled.View<{ width: string }>`
    height: 100%;
    width: ${(props) => props.width};
    background-color: #ffffff;
    border-radius: 3px;
`;

const SectionTitle = styled.Text`
    margin: 16px;
    font-size: 16px;
    font-weight: bold;
    color: #444;
`;
