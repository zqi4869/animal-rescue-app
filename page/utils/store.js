import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalStorage = (key, dataType = 'string') => {
  return new Promise(async (resolve) => {
    const value = await AsyncStorage.getItem(key) || '';
    if(dataType === 'json') {
      resolve(JSON.parse(value))
    } else {
      resolve(value)
    }
  })
}

export { GlobalStorage }
