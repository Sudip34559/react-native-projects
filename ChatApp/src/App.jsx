import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from './components/BottomTabs';
import VerifyPhone from './screen/VerifyPhone';
import Register from './screen/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './components/SplashScreen';
import AddContacts from './screen/AddContacts';

function App() {
  const Stack = createNativeStackNavigator();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          const data = JSON.parse(value);
          setData(data);
        }
      } catch (e) {
        console.log(e);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Set a timeout for 5 seconds
    const timeoutId = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    // Cleanup timeout
    return () => clearTimeout(timeoutId);
  }, []);

  if (showSplash) {
    return <SplashScreen />; // Show the splash screen
  }

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={data ? 'BottomTabs' : 'VerifyPhone'}
        backButtonEnabled={false}>
        {data ? (
          <>
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
            <Stack.Screen name="AddContacts" component={AddContacts} />
            <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
          </>
        ) : (
          <>
            <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
