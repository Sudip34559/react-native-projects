import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

const SlidingBox = () => {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 10,
          right: 10,
          backgroundColor: '#15803d',
          borderRadius: 20,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        },
        {transform: [{translatey: slideAnim}]},
      ]}>
      <Text>+</Text>
    </Animated.View>
  );
};

export default SlidingBox;
