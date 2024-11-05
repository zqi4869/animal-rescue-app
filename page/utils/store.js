import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalStorage = (key, dataType = 'string') => {
  return new Promise(async (resolve, reject) => {
    const value = await AsyncStorage.getItem(key) || '';
    if(value) {
      if(dataType === 'json') {
        resolve(JSON.parse(value))
      } else {
        resolve(value)
      }
    } else {
      reject()
    }
  })
}

const checkLogin = (success) => {
  GlobalStorage('loginUser', 'json').then(loginUser => {
    success()
  }).catch(() => {
    Alert.alert('Message','Please login first')
  })
}

export { GlobalStorage, checkLogin }
