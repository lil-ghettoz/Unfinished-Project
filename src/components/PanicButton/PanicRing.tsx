import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function PanicRing() {
  return <View style={styles.ring} />;
}

const styles = StyleSheet.create({
  ring: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 4,
    borderColor: 'rgba(255, 76, 97, 0.35)'
  }
});
