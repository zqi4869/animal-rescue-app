import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Button, Input} from '@rneui/themed';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const NewPost = ({navigation}) => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');

  const onSave = () => {
    if (address && phone && username) {
      Alert.alert('Message', 'Save successfully');
      navigation.goBack();
    } else {
      Alert.alert('Message', 'Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input
          label="Your Name"
          placeholder="Type in name"
          value={username}
          onChangeText={name => setUsername(name)}
        />
        <Input
          label="Your Phone"
          placeholder="Type in phone"
          value={phone}
          onChangeText={phone => setPhone(phone)}
        />
        <Input
          label="Your Address"
          placeholder="Type in address"
          value={address}
          onChangeText={address => setAddress(address)}
        />
        <Button
          style={styles.button}
          icon={<AntDesignIcon name="save" size={24} color="#fff" />}
          onPress={onSave}
          title="Submit"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
  },
  button: {
    width: '100%',
  },
});

export default NewPost;
