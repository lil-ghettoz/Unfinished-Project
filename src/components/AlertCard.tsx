import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  subtitle: string;
};

export default function AlertCard({ title, subtitle }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0c1424',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#17304d'
  },
  title: {
    color: '#f4f7fb',
    fontWeight: '700'
  },
  subtitle: {
    color: '#9cb4d7',
    marginTop: 6
  }
});
