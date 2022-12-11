import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import MainStack from './HomeTabScreen';
import {colors} from '../config/colors';
import {VStack} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView
      {...props}
      style={styles.drawerContentStyle}
      contentContainerStyle={{justifyContent: 'space-between', flex: 1}}>
      <TouchableOpacity
        onPress={() => props.navigation.closeDrawer()}
        style={styles.closeDrawerViewStyle}>
        <Icon name="close" size={25} color={colors.neutral[700]} />
      </TouchableOpacity>
      <View style={styles.drawerItemViewStyle}>
        <DrawerItem label={() => <VStack></VStack>} />
      </View>
      <DrawerItem
        label="Sign Out"
        onPress={() => {
          AsyncStorage.removeItem('@storage_Key');
          props.navigation.navigate('Login');
        }}
        labelStyle={{color: colors.neutral[700], fontSize: 12}}
      />
    </DrawerContentScrollView>
  );
};
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({logout}) => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={props => (
        <CustomDrawerContent {...props} logout={logout} />
      )}>
      <Drawer.Screen
        name="Main"
        component={MainStack}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  notificationBtnViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerContentStyle: {backgroundColor: colors.dark[900]},
  closeDrawerViewStyle: {marginLeft: 15, width: 50, height: 30},
  drawerItemViewStyle: {flex: 1},
  labelTextStyle: {color: colors.neutral[700], fontSize: 18},
  labelEmailStyle: {color: colors.dark[700], fontSize: 12},
});

export default DrawerNavigator;
