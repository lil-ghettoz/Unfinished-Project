import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.text}>Panic PIN, permissions, fake mode, and subscription controls go here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#040914', padding: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: '800' },
  text: { color: '#b5c5e0', marginTop: 12 }
});
