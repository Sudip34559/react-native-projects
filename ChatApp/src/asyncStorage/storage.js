import AsyncStorage from '@react-native-async-storage/async-storage';

const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const getData = async key => {
  const data = await AsyncStorage.getItem(key).then(val => {
    const value = JSON.parse(val);
    // console.log('ss', value);
    return value;
  });
  // console.log('gg', data);
  return data;
};

const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export {saveData, getData, removeData};
