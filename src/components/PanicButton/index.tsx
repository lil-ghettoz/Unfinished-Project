import React, { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PanicRing from './PanicRing';

type Props = {
  onActivate: () => void | Promise<void>;
};

export default function PanicButton({ onActivate }: Props) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startHold = () => {
    timeoutRef.current = setTimeout(() => {
      onActivate();
    }, 1500);
  };

  const stopHold = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <View style={styles.wrapper}>
      <PanicRing />
      <Pressable onPressIn={startHold} onPressOut={stopHold} style={styles.button}>
        <Text style={styles.title}>HOLD</Text>
        <Text style={styles.subtitle}>panic mode</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24
  },
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#c81f39',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800'
  },
  subtitle: {
    color: '#ffe4e8',
    marginTop: 6,
    textTransform: 'uppercase'
  }
});
