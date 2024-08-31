import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Layout from '../components/Layout';
import {useIsFocused} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Status = () => {
  const isFocused = useIsFocused();
  return (
    <Layout>
      <View style={styles.container}>
        <Text>Status</Text>
      </View>
      {isFocused && (
        <Pressable style={[styles.animatedBox]}>
          <MaterialCommunityIcons
            name="pencil-outline"
            size={25}
            color="#fff"
          />
        </Pressable>
      )}
    </Layout>
  );
};

export default Status;

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
