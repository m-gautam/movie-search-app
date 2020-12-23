import AsyncStorage from '@react-native-async-storage/async-storage';

export const getInitialState = async () => {
  const keys = await AsyncStorage.getAllKeys();

  let savedList = [];

  for (let i = 0; i < keys.length; i++) {
    const data = await AsyncStorage.getItem(keys[i]);
    savedList.push(JSON.parse(data));
  }

  return savedList;
};
