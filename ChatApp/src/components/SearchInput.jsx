import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SearchInput = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={23} color="#000" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={'Search...'}
        // value={value}
        // onChangeText={onChangeText}
        // onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#e7e5e4',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
});

export default SearchInput;
