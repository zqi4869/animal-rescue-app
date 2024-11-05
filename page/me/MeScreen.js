import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground, Alert, Image} from 'react-native';
import {Button, ListItem, Input} from '@rneui/themed';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getImageUri, fetchPost, fetchGet, simplePost } from "../utils/http";

const MeScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false)
  const [loginUser, setLoginUser] = useState({})
  const [menus, setMenus] = useState([
    {id: 2, label: 'My Adoption', desc: 'See', icon: 'menuunfold'},
    {id: 3, label: 'About', desc: 'About Us', icon: 'idcard'},
    {id: 4, label: 'Version', desc: '1.0.0', icon: 'exclamationcircleo'},
  ]);


  const checkLogin = async () => {
    const loginUser = await AsyncStorage.getItem('loginUser')
    setIsLogin(!!loginUser)
    if(loginUser) {
      setIsLogin(true)
      setLoginUser(JSON.parse(loginUser))
    }
  };

  useEffect(() => {
    checkLogin()
  }, []);

  const onPress = item => {
      switch (item.id) {
        case 2:
          navigation.navigate('MyAdoption', {userId: loginUser.id});
          break;
        case 3:
          Alert.alert('About Us', 'This is a pet adoption app');
          break;
        default:
          break;
      }
  }

  const onLogin = () => {
    if(!username || !password) {
      Alert.alert('Message', 'Username or password is incorrect');
      return
    }

    simplePost('/login', {
      username,
      password,
      role: 'user,'
    }, (data) => {
      setIsLogin(true)
      AsyncStorage.setItem('token', data)

      fetchGet('/user/info?username='+username, (loginUser) => {
        setLoginUser(loginUser)
        AsyncStorage.setItem('loginUser', JSON.stringify(loginUser))
      })
    })

  }
  const onExit = () => {
    setIsLogin(false)
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('loginUser')
  }

  const listItemComponent = menus.map((item, index) => (
    <ListItem
      key={index}
      bottomDivider
      style={{width: '100%'}}
      onPress={() => onPress(item)}>
      <ListItem.Content>
        <ListItem.Title>
          <AntDesignIcon name={item.icon} size={16} />
          <Text> {item.label}</Text>
        </ListItem.Title>
      </ListItem.Content>
      <View style={{flexDirection: 'row'}}>
        <Text>{item.desc}</Text>
      </View>
    </ListItem>
  ));
  const settingComponent = (
    <View style={styles.setting}>
      <View style={styles.information}>
        <Text style={styles.text}>{loginUser.first_name + ' ' + loginUser.last_name}</Text>
        <Image style={styles.avatar} source={{uri: getImageUri(loginUser.avatar)}} />
        <Text style={styles.text}>{loginUser.phone}</Text>
      </View>
      <View>
        {listItemComponent}
      </View>
      <Button
        containerStyle={{padding: 20}}
        color="error"
        icon={<AntDesignIcon name="save" size={24} color="#fff" />}
        onPress={onExit}
        title="Exit"
      />
    </View>
  )

  const loginComponent = (
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
      <Button
        color="warning"
        icon={<AntDesignIcon name="login" size={20} color="#fff" />}
        onPress={onLogin}
      >  Login</Button>
      <Button
        buttonStyle={{marginTop: 10}}
        type="outline"
        icon={<AntDesignIcon name="user" size={20} color="#fff" />}
        onPress={() => navigation.navigate('SignUp')}
      >  Sign Up</Button>
    </View>
  )

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../image/bg.png')}
        resizeMode="cover"
        style={styles.bg}
        imageStyle={{}}>
        {isLogin ? settingComponent : loginComponent}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  bg: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  form: {
    padding: 20,
  },
  setting: {
    flex: 1,
    borderWidth: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 20,
  },
  information: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 200,
    borderWidth: 4,
    borderColor: '#ffc124',
    elevation: 2,
    padding: 10,
    margin: 10,
  },
  avatar: {
    resizeMode: 'contain', // ?
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});

export default MeScreen;
