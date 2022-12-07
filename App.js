import * as React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Onboarding from './src/Onboarding';
import Signup from './src/Signup';
import Login from './src/Login';
import Home from './src/screens/Home';
import {DrawerContent} from './src/DrawerContent';
import MainTabScreen from './src/MainTabScreen';
import {View, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppContainer from './src/navigations/AppNavigation';
import {NativeBaseProvider} from 'native-base';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

const App = () => {
  // const renderHeader = headerProps => {
  //   return (
  //     <TouchableOpacity
  //       style={styles.hemMenuViewStyle}
  //       onPress={() => headerProps.navigation.openDrawer()}>
  //       <Image
  //         style={styles.hemMenuStyle}
  //         source={require('./src/assets/images/menu/ham.png')}
  //       />
  //     </TouchableOpacity>
  //   );
  // };

  // const AuthStack = createStackNavigator();
  // const RootStack = createStackNavigator();

  // const AuthStackScreen = () => (
  //   <AuthStack.Navigator>
  //     <AuthStack.Screen
  //       name="SignIn"
  //       component={Login}
  //       options={{headerShown: false}}
  //     />
  //     <AuthStack.Screen
  //       name="Welcome"
  //       component={Welcome}
  //       options={{headerShown: false}}
  //     />
  //   </AuthStack.Navigator>
  // );

  // const RootStackScreen = () => {
  //   const [isLoggedIn, setIsLoggedIn] = useState(true);

  //   return (
  //     <RootStack.Navigator initialRouteName="Main">
  //       <RootStack.Screen
  //         name="Main"
  //         component={DrawerNavigator}
  //         options={{
  //           animationEnabled: true,
  //           headerShown: false,
  //         }}
  //       />

  //       <RootStack.Screen
  //         name="Auth"
  //         component={AuthStackScreen}
  //         options={{
  //           animationEnabled: true,
  //           headerShown: false,
  //         }}
  //       />
  //     </RootStack.Navigator>
  //   );
  // };

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <SafeAreaView style={{flex: 1}}>
          <PaperProvider>
            <AppContainer />
            {/* <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
            {isAuth && (
              <Tab.Navigator
                initialRouteName="Feed"
                screenOptions={{
                  tabBarActiveTintColor: '#e91e63',
                }}>
                <Tab.Screen
                  name="Feed"
                  component={Home}
                  options={{
                    tabBarLabel: 'Home',
                    // tabBarIcon: ({color, size}) => (
                    //   <MaterialCommunityIcons
                    //     name="home"
                    //     color={color}
                    //     size={size}
                    //   />
                    // ),
                  }}
                />
                <Tab.Screen
                  name="Notifications"
                  component={Home}
                  options={{
                    tabBarLabel: 'Updates',
                    // tabBarIcon: ({color, size}) => (
                    //   <MaterialCommunityIcons
                    //     name="bell"
                    //     color={color}
                    //     size={size}
                    //   />
                    // ),
                    tabBarBadge: 3,
                  }}
                />
                <Tab.Screen
                  name="Profile"
                  component={Home}
                  options={{
                    tabBarLabel: 'Profile',
                    // tabBarIcon: ({color, size}) => (
                    //   <MaterialCommunityIcons
                    //     name="account"
                    //     color={color}
                    //     size={size}
                    //   />
                    // ),
                  }}
                />
              </Tab.Navigator>
              // <Stack.Screen
              //   options={{
              //     headerShown: true,
              //     headerBackVisible: false,
              //     header: renderHeader,
              //   }}
              //   name="Home"
              //   component={Home}
              // />
            )}
          </NavigationContainer> */}
          </PaperProvider>
        </SafeAreaView>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  hemMenuStyle: {
    height: 16,
    width: 20,
  },
  hemMenuViewStyle: {
    paddingLeft: 30,
    paddingRight: 15,
  },
});

export default App;
