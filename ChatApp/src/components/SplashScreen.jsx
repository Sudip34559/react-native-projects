import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <FontAwesome
        name="whatsapp"
        size={60}
        color="#15803d"
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set your background color
  },
});

export default SplashScreen;
