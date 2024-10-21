import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './page/home/HomeScreen';
import MeScreen from './page/me/MeScreen';
import PetDetail from './page/home/PetDetail';
import BbsScreen from './page/bbs/BbsScreen';
import NewPost from './page/bbs/NewPost';

// doc: https://reactnavigation.org/docs/bottom-tab-navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PetDetail" component={PetDetail} />
      <Stack.Screen name="PetAdopt" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const BbsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BbsScreen" component={BbsScreen} />
      <Stack.Screen name="NewPost" component={NewPost} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            // ref-Ionicons: https://icons.expo.fyi/Index
            let iconName = 'settings';
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'BBS') {
              iconName = 'chatbox';
            } else if (route.name === 'Pets') {
              iconName = 'basket';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ffba41',
        })}>
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="BBS"
          component={BbsNavigator}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Me" component={MeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
