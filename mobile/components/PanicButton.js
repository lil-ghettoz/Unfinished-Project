import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

const HOLD_DURATION = 1800;

export default function PanicButton({ disabled, onActivate }) {
  const [pressed, setPressed] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const holdTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (holdTimer.current) {
        clearTimeout(holdTimer.current);
      }
    };
  }, []);

  const startHold = () => {
    if (disabled) {
      return;
    }

    setPressed(true);
    Animated.timing(progress, {
      toValue: 1,
      duration: HOLD_DURATION,
      useNativeDriver: false
    }).start();

    holdTimer.current = setTimeout(() => {
      onActivate?.();
      setPressed(false);
      progress.setValue(0);
    }, HOLD_DURATION);
  };

  const endHold = () => {
    setPressed(false);
    progress.stopAnimation();
    progress.setValue(0);

    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const ringScale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08]
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.outerRing, { transform: [{ scale: ringScale }] }]} />
      <Pressable
        onPressIn={startHold}
        onPressOut={endHold}
        disabled={disabled}
        style={({ pressed: isPressed }) => [
          styles.button,
          disabled && styles.disabled,
          (pressed || isPressed) && styles.buttonPressed
        ]}
      >
        <Text style={styles.title}>HOLD</Text>
        <Text style={styles.subtitle}>to trigger panic mode</Text>
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
  outerRing: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 3,
    borderColor: 'rgba(255, 90, 107, 0.35)',
    shadowColor: '#FF5A6B',
    shadowOpacity: 0.6,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 }
  },
  button: {
    width: 220,
    height: 220,
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C01B2F',
    borderWidth: 8,
    borderColor: '#FF7586',
    shadowColor: '#FF5A6B',
    shadowOpacity: 0.7,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 }
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }]
  },
  disabled: {
    opacity: 0.6
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 2
  },
  subtitle: {
    marginTop: 6,
    color: '#FFE7EB',
    fontSize: 14,
    textTransform: 'uppercase'
  }
});
