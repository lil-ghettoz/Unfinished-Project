import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import AlertCard from '../components/AlertCard';

export default function AlertHistoryScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Alert History</Text>
      <AlertCard title="Emergency alert sent" subtitle="April 7, 2026 at 10:42 AM" />
      <AlertCard title="Location synced" subtitle="GPS coordinates uploaded successfully" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#040914' },
  content: { padding: 20 },
  heading: { color: '#fff', fontSize: 28, fontWeight: '800', marginBottom: 16 }
});
