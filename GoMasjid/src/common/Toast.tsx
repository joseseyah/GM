import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const Toast = ({ visible, message, duration = 2000, onDismiss }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Fade in
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Set timeout to fade out
      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          if (onDismiss) onDismiss();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, opacity, onDismiss]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.toastContainer}>
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  toastContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 40,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Toast;