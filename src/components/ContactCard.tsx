import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  name: string;
  phone: string;
};

export default function ContactCard({ name, phone }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.phone}>{phone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0c1424',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12
  },
  name: {
    color: '#f4f7fb',
    fontWeight: '700',
    fontSize: 16
  },
  phone: {
    color: '#9cb4d7',
    marginTop: 6
  }
});
