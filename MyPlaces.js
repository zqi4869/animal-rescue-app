import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Button, ListItem} from '@rneui/themed';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {Input} from '@rneui/base';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('map.db');

const MyPlaces = ({navigation}) => {
  const [address, setAddress] = useState('');
  const [addressList, setAddressList] = useState([]);

  const onRemove = item => {
    db.exec(
      [
        {
          sql: `delete from address where id = ?`,
          args: [item.id],
        },
      ],
      false,
      function (err, result) {
        Alert.alert('Delete place [' + item.address + '] success!');
        selectList();
      },
    );
  };

  const showOnMap = address => {
    navigation.navigate('Map', {
      address: address,
    });
  };

  const selectList = async () => {
    db.exec(
      [
        {
          sql: `SELECT * from address`,
          args: [],
        },
      ],
      true,
      function (err, result) {
        console.log('db select: ', result[0].rows);
        setAddressList(result[0].rows);
      },
    );
  };

  const onSave = () => {
    db.exec(
      [
        {
          sql: `INSERT INTO address VALUES (?, ?)`,
          args: [null, address],
        },
      ],
      false,
      function (err, result) {
        selectList();
        setAddress('');
      },
    );
  };

  const initialize = async () => {
    db.exec(
      [
        {
          sql: `
      CREATE TABLE IF NOT EXISTS address (
      id INTEGER PRIMARY KEY NOT NULL, 
      address TEXT);`,
          args: [],
        },
      ],
      false,
      function (err, result) {
        console.log('db init success');
        selectList();
      },
    );
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Input
          label="PLACEFINDER"
          placeholder="Type in address"
          value={address}
          onChangeText={address => setAddress(address)}
        />

        <View style={{width: '100%'}}>
          <Button
            disabled={address.length === 0}
            icon={<AntDesignIcon name="save" size={24} color="#fff" />}
            onPress={onSave}
            title="SAVE"
          />
        </View>

        {addressList.map((item, index) => (
          <ListItem
            key={index}
            bottomDivider
            style={{width: '100%'}}
            onPress={() => showOnMap(item.address)}
            onLongPress={() => onRemove(item)}>
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                {item.address}
              </ListItem.Title>
            </ListItem.Content>
            <View style={{flexDirection: 'row'}}>
              <Text>show on map </Text>
              <AntDesignIcon name="right" size={24} />
            </View>
          </ListItem>
        ))}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 5,
  },
  title: {
    color: 'black',
    fontSize: 16,
  },
});

export default MyPlaces;
