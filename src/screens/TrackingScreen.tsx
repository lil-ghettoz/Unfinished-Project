import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TrackingScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Tracking</Text>
      <Text style={styles.text}>Map view placeholder for live location tracking.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#040914', padding: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: '800' },
  text: { color: '#b5c5e0', marginTop: 12 }
});
