import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Header from './Header';

// The Layout component that accepts children as props
const Layout = ({children}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Chat"
        onProfilePress={() => alert('Profile Pressed')}
        onAddContactPress={() => alert('Add Contact Pressed')}
      />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
});

export default Layout;
