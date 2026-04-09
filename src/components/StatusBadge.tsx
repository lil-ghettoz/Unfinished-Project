import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

type Props = {
  label: string;
  tone?: 'safe' | 'danger' | 'info';
};

export default function StatusBadge({ label, tone = 'info' }: Props) {
  return (
    <View style={[styles.badge, styles[tone]]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999
  },
  safe: {
    backgroundColor: '#184f3f'
  },
  danger: {
    backgroundColor: '#5d1824'
  },
  info: {
    backgroundColor: '#173d68'
  },
  text: {
    color: '#fff',
    fontWeight: '700'
  }
});
