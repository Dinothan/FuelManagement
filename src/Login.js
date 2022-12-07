/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './constants/Constants';
import Field from './Field';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginFunction = (email, password) => {
    console.log('email: ', email);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async res => {
        console.log('res: ', res);
        const idTokenResult = await auth().currentUser.getIdTokenResult();
        console.log('idTokenResult: ', idTokenResult.token);
        await AsyncStorage.setItem('@storage_Key', idTokenResult.token);

        // props.auth(res.user.email);
        props.navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          // setState({
          //   error: 'That email address is already in use!',
          // });
        }

        if (error.code === 'auth/invalid-email') {
          // setState({error: 'That email address is invalid!'});
        }

        console.error(error);
      });
  };

  const onPressLogin = async () => {
    console.log('email: ', email);
    console.log('password: ', password);
    if (email && password) {
      loginFunction(email, password);
    } else if (email && password) {
      loginFunction(email, password);
    } else {
      // setState({error: 'Please enter email and password'});
    }
  };

  return (
    <Background>
      <View style={{alignItems: 'center', width: 460}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: darkGreen, fontWeight: 'bold'}}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
          <Field
            placeholder="Email / Username"
            keyboardType={'email-address'}
            onChangeText={setEmail}
            value={email}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
          <View
            style={{
              alignItems: 'flex-end',
              width: '78%',
              paddingRight: 16,
              marginBottom: 30,
            }}>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Forgot Password ?
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Login"
            Press={() => onPressLogin()}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Don't have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Signup')}>
              <Text
                style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;
