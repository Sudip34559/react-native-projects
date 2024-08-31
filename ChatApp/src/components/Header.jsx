// src/components/Header.jsx

import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Define the Header component
const Header = ({title, onProfilePress, onAddContactPress}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>WhatsApp</Text>
      <View style={styles.touchable}>
        <TouchableOpacity onPress={onProfilePress}>
          <MaterialIcons name="qr-code-scanner" size={25} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onProfilePress}>
          <Feather name="camera" size={25} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onProfilePress}>
          <Entypo name="dots-three-vertical" size={22} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Define the styles for the Header component
const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff', // WhatsApp green color
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  title: {
    color: '#16a34a',
    fontSize: 23,
    fontWeight: 'bold',
  },
  touchable: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150,
    alignItems: 'center',
  },
});

export default Header;
