import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VerifyPhone from './VerifyPhone';
import BottomTabs from '../components/BottomTabs';

const StackScreen = () => {
  const [data, setData] = useState(null);
  const Stack = createNativeStackNavigator();
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        const data = JSON.parse(value);
        setData(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // if (!data) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size={'large'} />
  //     </View>
  //   );
  // }
  return (
    <Stack.Navigator initialRouteName={data ? 'BottomTabs' : 'VerifyPhone'}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
    </Stack.Navigator>
  );
};

export default StackScreen;

const styles = StyleSheet.create({});
