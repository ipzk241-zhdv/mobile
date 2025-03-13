import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const navItems = [
  { title: "Головна", icon: require("../assets/icons/home.png") },
  { title: "Галерея", icon: require("../assets/icons/Gallery.png") },
  { title: "Профіль", icon: require("../assets/icons/Profile.png") },
];

const Navbar = ({ activeTitle, navigation }) => {
  return (
    <View style={styles.headerNav}>
      {navItems.map((item) => {
        const isActive = activeTitle === item.title;
        return (
          <TouchableOpacity
            key={item.title}
            style={[styles.navElement, isActive && styles.activeNavElement]}
            onPress={() => navigation.push(item.title)}
          >
            <Image
              style={[styles.headerNavIcon, isActive && styles.activeNavElement]}
              source={item.icon}
            />
            <Text style={styles.headerNavText}>{item.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  headerNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "lightgray",
  },
  navElement: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  activeNavElement: {
    borderBottomWidth: 2,
    borderBottomColor: "blue",
    tintColor: "blue", // для iOS працює на Image
  },
  headerNavIcon: {
    width: 30,
    height: 30,
  },
  headerNavText: {
    fontSize: 12,
  },
});

export default Navbar;
