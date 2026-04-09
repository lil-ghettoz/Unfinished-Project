import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import PanicButton from '../components/PanicButton';
import StatusBadge from '../components/StatusBadge';
import { usePanic } from '../hooks/usePanic';

export default function HomeScreen() {
  const { triggerPanic } = usePanic();

  const handleActivate = async () => {
    try {
      await triggerPanic();
      Alert.alert('Panic mode active', 'Emergency workflow has started.');
    } catch (error) {
      Alert.alert('Activation failed', 'Unable to start panic mode.');
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Z Shield</Text>
      <Text style={styles.subheading}>Personal safety and cybersecurity protection</Text>
      <View style={styles.badges}>
        <StatusBadge label="Protected" tone="safe" />
        <StatusBadge label="GPS Ready" tone="info" />
      </View>
      <PanicButton onActivate={handleActivate} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#040914' },
  content: { padding: 20 },
  heading: { color: '#fff', fontSize: 32, fontWeight: '800' },
  subheading: { color: '#8ea2c3', marginTop: 8 },
  badges: { flexDirection: 'row', gap: 10, marginTop: 20 }
});
