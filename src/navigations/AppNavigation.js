import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Login';
import {StatusBar} from 'native-base';
import DrawerNavigator from './DrawerNavigator';
import Signup from '../Signup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthStack = createStackNavigator();
const RootStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="Signup"
      component={Signup}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

const RootStackScreen = ({active}) => {
  return (
    <RootStack.Navigator initialRouteName={'Auth'}>
      {active ? (
        <RootStack.Screen
          name="MainStack"
          // component={MainStack}
          component={DrawerNavigator}
          options={{
            animationEnabled: true,
            headerShown: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            animationEnabled: true,
            headerShown: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};

const AppContainer = ({isAuthenticated}) => {
  const [active, setActive] = useState(isAuthenticated);
  useEffect(() => {
    const isAuth = AsyncStorage.getItem('@storage_Key');
    setActive(isAuth);
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      <StatusBar translucent={true} />
      <RootStackScreen active={active} />
    </NavigationContainer>
  );
};

export default AppContainer;
