import { Alert } from 'react-native';

const baseUrl = 'http://192.168.1.169:8080'

const getImageUri = (imageName) => {
  return baseUrl + '/' + imageName
}

function fetchPost({ routeName, dataJson, method = 'POST', success }) {
  return fetch(baseUrl + routeName, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataJson)
  })
    .then(response => response.json())
    .then(data => {
      if (data.code === 0) {
        success(data.data);
      } else {
        Alert.alert('Error', data.msg);
      }
    }).catch(error => {
      Alert.alert('Error', error);
    })
}


function fetchGet(routeName, success) {
  return fetch(baseUrl + routeName)
    .then(response => response.json())
    .then(data => {
      if (data.code === 0) {
        console.log(data.data) // todo: debug
        success(data.data);
      } else {
        Alert.alert('Error', data.msg);
      }
    }).catch(error => {
      Alert.alert('Error', error);
    })
}

export { fetchPost, fetchGet, getImageUri }
