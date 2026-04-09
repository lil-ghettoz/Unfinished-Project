import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function StatusCard({ label, value, tone = 'neutral' }) {
  const toneStyles = tones[tone] || tones.neutral;

  return (
    <View style={[styles.card, toneStyles.card]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, toneStyles.value]}>{value}</Text>
    </View>
  );
}

const tones = {
  neutral: {
    card: { borderColor: '#1B2742' },
    value: { color: '#F4F7FB' }
  },
  safe: {
    card: { borderColor: '#1D8F6C' },
    value: { color: '#62F0BF' }
  },
  danger: {
    card: { borderColor: '#8F2331' },
    value: { color: '#FF8793' }
  },
  info: {
    card: { borderColor: '#2457A5' },
    value: { color: '#8BC5FF' }
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0C1222',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    minWidth: '48%',
    marginBottom: 14
  },
  label: {
    color: '#9BA8C7',
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  value: {
    fontSize: 18,
    fontWeight: '700'
  }
});
