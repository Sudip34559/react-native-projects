import {
  StyleSheet,
  Text,
  View,
  Model,
  TextInput,
  Pressable,
  Animated,
  LogBox,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logoutUser} from '../API/backendAPI';
import {getData, removeData} from '../asyncStorage/storage';

const Chats = () => {
  const isFocused = useIsFocused();
  const navigetor = useNavigation();
  const logOut = async () => {
    const user = await AsyncStorage.getItem('user').then(user => {
      console.log(user);
      return JSON.parse(user);
    });
    // // // const data = JSON.parse(user);
    // console.log(user);
    const phoneNumber = user.phoneNumber;
    // console.log(phoneNumber);
    logoutUser(phoneNumber)
      .then(res => {
        if (res.data.success) {
          removeData('user');
          navigetor.replace('VerifyPhone');
        } else {
          Alert('Failed to Logout');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <SearchInput />
      <View style={styles.container}>
        <Text>Chats</Text>
        <Pressable
          style={[styles.animatedBox]}
          onPress={() => {
            logOut();
            // removeData('user');
          }}
        />
      </View>
      {isFocused && (
        <Pressable
          style={[styles.animatedBox]}
          onPress={() => {
            navigetor.navigate('AddContacts');
          }}>
          <MaterialIcons name="chat" size={25} color="#fff" />
        </Pressable>
      )}
    </Layout>
  );
};

export default Chats;

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
