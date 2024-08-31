import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '../components/Layout';
import {useIsFocused} from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Calls = () => {
  const isFocused = useIsFocused();
  return (
    <Layout>
      <View style={styles.container}>
        <Text>Calls</Text>
      </View>
      {isFocused && (
        <Pressable style={[styles.animatedBox]}>
          <MaterialIcons name="add-call" size={25} color="#fff" />
        </Pressable>
      )}
    </Layout>
  );
};

export default Calls;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  animatedBox: {
    height: 50,
    width: 50,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: '#15803d',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
