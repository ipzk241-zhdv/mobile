import React from "react";
import { View, Text, ScrollView } from "react-native";
import { TabList } from "../components/TabList";
import Feed from "../components/NewsFeed";
import ThemedView from "../components/ThemedView";

export default function CommunityScreen() {
    return (
        <ThemedView padding={"0px"}>
            <Text style={{ fontSize: 20, paddingHorizontal: 20, marginBottom: 20, color: "#7B8D9D" }}>
                Community and official content for all games and software
            </Text>
            <ScrollView>
                <View style={{ marginLeft: 25 }}>
                    <TabList tabList={["search", "All", "Screenshots", "Artworks", "Works"]}></TabList>
                </View>
                <Feed></Feed>
            </ScrollView>
        </ThemedView>
    );
}
