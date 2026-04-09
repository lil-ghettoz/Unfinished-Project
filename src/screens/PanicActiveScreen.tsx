import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePanicStore } from '../store/usePanicStore';

export default function PanicActiveScreen() {
  const { alertId, lastLocation, isRecording } = usePanicStore();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Panic Active</Text>
      <Text style={styles.text}>Alert ID: {alertId ?? 'pending'}</Text>
      <Text style={styles.text}>Recording: {isRecording ? 'On' : 'Off'}</Text>
      <Text style={styles.text}>
        Location: {lastLocation ? `${lastLocation.latitude}, ${lastLocation.longitude}` : 'N/A'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#040914', padding: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: '800' },
  text: { color: '#b5c5e0', marginTop: 12 }
});
