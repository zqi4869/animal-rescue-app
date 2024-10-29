import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Button, ListItem, Input} from '@rneui/themed';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const onRegister = () => {
    console.log('Login with username:', username, 'and password:', password);
  };

  const onUpload = () => {
    console.log('Upload profile picture');
  };


  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input
          label="Username"
          value={username}
          onChangeText={name => setUsername(name)}
        />
        <Input
          label="Password"
          value={password}
          type="password"
          onChangeText={pwd => setPassword(pwd)}
        />
        <Input
          label="Phone Number"
          value={phone}
          type="number"
          keyboardType="numeric"
          onChangeText={phone => setPhone(phone)}
        />
        <TouchableOpacity onPress={onUpload}>
          <View style={styles.upload}>
            <AntDesignIcon name="upload" size={50}  />
            <Text>Upload Profile Picture</Text>
          </View>
        </TouchableOpacity>
        <Button
          color="warning"
          icon={<AntDesignIcon name="save" size={20} color="#fff" />}
          onPress={onRegister}
        >  Submit</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 10,
  },
  form: {
    width: '100%',
  },
  upload: {
    borderWidth: 1,
    borderColor: '#4b4141',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default SignUp;
