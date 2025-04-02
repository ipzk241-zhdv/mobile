import React from "react";
import { View, FlatList } from "react-native";
import TaskButton from "../components/TaskButton";
import { useProgress } from "../components/ProgressContext";
import goalsData from "../assets/goals.json";

export default function GoalsScreen() {
    const { progress } = useProgress();

    const renderItem = ({ item, index }) => {
        const id = Object.keys(goalsData)[index];
        return (
            <TaskButton
                title={item.title}
                subtitle={item.subtitle}
                isChecked={progress[id] >= (goalsData[id]?.progressbar || 100)}
                progress={(progress[id] / (goalsData[id]?.progressbar || 100)) * 100}
            />
        );
    };

    return (
        <View>
            <FlatList data={Object.values(goalsData)} renderItem={renderItem} keyExtractor={(item, index) => Object.keys(goalsData)[index]} />
        </View>
    );
}
