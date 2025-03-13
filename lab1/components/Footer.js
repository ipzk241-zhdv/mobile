import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Footer() {
  return (
      <Text style={styles.title}>Жеребцов Дмитро Вікторович, ІПЗк-24-1</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: "gray",
    textAlign: "center",
    paddingVertical: 10,
    backgroundColor: "lightgray"
  },
});
