import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Alert} from 'react-native';
import {Button, ListItem, Input} from '@rneui/themed';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const PetDetail = ({navigation}) => {

  const tags = ['成都', '弟弟', '3个月'].map((t, index) => (
    <View style={styles.card.tag} key={'tag-' + index}>
      <Text style={{color: 'white'}}>{t}</Text>
    </View>
  ));

  const onSave = () => {
    if (address && phone && username) {
      Alert.alert('Message', 'Adopt successfully');
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.card.cardTop}>
          <Image
            style={styles.card.avatar}
            source={require('../image/cat-1.png')}
          />
          <View>
            <Text style={styles.card.title}>短耳</Text>
            <Text style={styles.card.text}>家猫的崽崽</Text>
            <Text style={styles.card.text}>上门领养，按时疫苗，适龄绝育</Text>
          </View>
        </View>

        <View style={styles.card.tagContainer}>{tags}</View>
      </View>

      <Text style={styles.quote}>Pet story</Text>
      <View style={styles.story}>
        <Text style={styles.story.content}>
          它是在2年前，在xxx出生的，性格温顺，可以自己吃饭睡觉啥的          它喜欢玩耍，喜欢跟小朋友一起玩，也喜欢跟其他小猫玩。
          它很聪明，也很可爱，可爱到你会想把它抱起来亲一口。
          它喜欢玩耍，喜欢跟小朋友一起玩，也喜欢跟其他小猫玩。
        </Text>
        <Image
          style={styles.story.img}
          source={require('../image/cat-1.png')}
        />
      </View>

      <Button
        color="warning"
        buttonStyle={styles.submit}
        onPress={onSave}
      >I want to adopt</Button>
    </ScrollView>
  );
};

const commonColor = '#6c5cd3';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    height: '100%',
  },
  card: {
    flexDirection: 'column',
    backgroundColor: commonColor,
    padding: 18,
    borderRadius: 20,
    marginBottom: 20,
    cardTop: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginRight: 20,
    },
    title: {
      color: 'white',
      fontSize: 26,
    },
    text: {
      color: 'white',
    },
    tagContainer: {
      flexDirection: 'row',
    },
    tag: {
      color: 'white',
      margin: 5,
      padding: 5,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'white',
    },
  },
  story: {
    alignItems: 'center',
    content: {
      fontSize: 20,
      lineHeight: 24,
    },
    img: {
      width: 200,
    },
  },
  quote: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: commonColor,
    color: commonColor,
    paddingLeft: 10,
  },
  submit: {
    marginTop: 20,
    marginBottom: 30,
  }
});

export default PetDetail;
