/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {db} from '../config/real-time-db';
import {ref, onValue, update} from 'firebase/database';
import {useState} from 'react';
import {
  Alert,
  ScrollView,
  // Switch,
  HStack,
  Box,
  IconButton,
  VStack,
  CloseIcon,
  Button,
} from 'native-base';
import moment from 'moment';

const HomeScreen = ({navigation}) => {
  const [deviceData, setDeviceData] = useState([]);
  const [obj, setObj] = useState({});
  const [alert, setAlert] = useState(false);
  const [sw, setSw] = useState(false);

  useEffect(() => {
    const readData1 = ref(db, '/');
    // console.log('readData: ', readData1);

    onValue(readData1, snapshot => {
      const data = snapshot.val();
      setObj(data);

      // const obj = Object.keys(data);
      // console.log('data: ', Object.keys(data));
      // setObjArray(obj);

      // const {
      //   availableFuelCapacity,
      //   fuelTheftDetect,
      //   fuelTheftDetectRecTimeUTC,
      //   isIgnitionOff,
      //   isMute,
      //   lowFuelDitect,
      //   newFuelAmount,
      //   newFuelAmountRecTimeUTC,
      //   notifyMe,
      //   tankDiameter,
      //   tankHeight,
      //   tankLength,
      //   tankShape,
      //   tankWidth,
      // } = data;
    });
    // setDeviceData(arr);
  }, []);

  useEffect(() => {
    const arr = [];
    obj &&
      Object.entries(obj).map(([key, value]) => {
        // console.log('value: ', value);
        arr.push({key, value});
      });
    setDeviceData(arr);
    arr.length > 0 &&
      arr?.map((res, index) => {
        if (res?.value?.tankShape === 'VRT_CYLINDER') {
          const {availableFuelCapacity, tankDiameter, tankHeight} = res?.value;
          const total =
            (3.14 * ((tankDiameter / 2) * (tankDiameter / 2)) * tankHeight) /
            1000;
          const test = [...arr];
          test[index].value.total = total;
          const level = parseFloat((availableFuelCapacity / total) * 100);
          const fuelLevel = Math.round(level * 100) / 100;

          // console.log('test: ', test);
          test[index].value.fuel = fuelLevel;

          if (res?.value?.fuelTheftDetect) {
            setAlert(true);
          } else {
            if (res?.value?.lowFuelDitect && fuelLevel < res?.value?.notifyMe) {
              setAlert(true);
            } else {
              setAlert(false);
            }
          }

          setDeviceData(test);
        }
      });
  }, [obj]);

  // console.log('deviceData: ', deviceData);
  // console.log('obj: ', obj);
  // console.log('fuel: ', fuel);

  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = fuel => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#009FFF')}
            <Text style={{color: 'white'}}>Fuel: {fuel}%</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#93FCF8')}
            <Text style={{color: 'white'}}>
              No fuel: {parseFloat(100 - fuel).toFixed(2)}%
            </Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <ScrollView style={{backgroundColor: '#34448B'}}>
      {deviceData &&
        deviceData.length > 0 &&
        deviceData.map(res => (
          <View
            key={res.key}
            style={{
              // paddingVertical: 100,

              flex: 1,
            }}>
            {alert && (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Alert maxW="400" status="error">
                  <VStack space={1} flexShrink={1} w="100%">
                    <HStack
                      flexShrink={1}
                      space={2}
                      alignItems="center"
                      justifyContent="space-between">
                      <HStack flexShrink={1} space={2} alignItems="center">
                        <Alert.Icon />
                        <Text
                          fontSize={18}
                          fontWeight={'bold'}
                          _dark={{
                            color: 'coolGray.800',
                          }}>
                          Alert!
                        </Text>
                      </HStack>
                      <IconButton
                        variant="unstyled"
                        _focus={{
                          borderWidth: 0,
                        }}
                        icon={<CloseIcon size="3" />}
                        _icon={{
                          color: 'coolGray.600',
                        }}
                        onPress={() => setAlert(false)}
                      />
                    </HStack>

                    <Text style={{color: 'black', fontSize: 18}}>
                      {res?.value?.fuelTheftDetect
                        ? `Threft detected on ${moment(
                            res?.value?.newFuelAmountRecTimeUTC,
                            's',
                          ).format('DD/MM/YYYY')}`
                        : `Your fuel percentage is less than ${res?.value?.notifyMe}%`}
                    </Text>
                  </VStack>
                </Alert>
              </View>
            )}
            <View
              style={{
                margin: 20,
                // padding: 16,
                borderRadius: 20,
                // backgroundColor: '#232B5D',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 26,
                  fontWeight: 'bold',
                  paddingBottom: 15,
                }}>
                Fuel tank ID: {res.key}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingBottom: 15,
                }}>
                Engine
              </Text>
              <View
                style={{
                  display: 'flex',
                  paddingBottom: 20,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 44,
                    width: 215,
                    backgroundColor: 'white',
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: 'green',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 2,
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    // onPress={() => updatedSwitchData(1)}
                    style={{
                      flex: 1,

                      backgroundColor: 'green',
                      borderRadius: 25,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                      }}>
                      On
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    // onPress={() => updatedSwitchData(2)}
                    style={{
                      flex: 1,

                      backgroundColor: 'white',
                      borderRadius: 25,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                      }}>
                      Off
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Fuel capacity
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                  Total fuel:{' '}
                </Text>
                <Text style={{color: 'white'}}>
                  {parseFloat(res?.value?.total / 1000).toFixed(2)} liters
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                  Available fuel:{' '}
                </Text>
                <Text style={{color: 'white'}}>
                  {parseFloat(res?.value?.availableFuelCapacity).toFixed(2)}{' '}
                  liters
                </Text>
              </View>
              <View style={{padding: 20, alignItems: 'center'}}>
                <PieChart
                  data={[
                    {
                      value: res?.value?.fuel ? res?.value?.fuel : 0,
                      color: '#009FFF',
                      gradientCenterColor: '#006DFF',
                      focused: true,
                    },
                    {
                      value: res?.value?.fuel ? 100 - res?.value?.fuel : 100,
                      color: '#93FCF8',
                      gradientCenterColor: '#3BE9DE',
                    },
                  ]}
                  donut
                  showGradient
                  sectionAutoFocus
                  radius={90}
                  innerRadius={60}
                  innerCircleColor={'#232B5D'}
                  centerLabelComponent={() => {
                    return (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 22,
                            color: 'white',
                            fontWeight: 'bold',
                          }}>
                          {res?.value?.fuel}%
                        </Text>
                        <Text style={{fontSize: 14, color: 'white'}}>Fuel</Text>
                      </View>
                    );
                  }}
                />
              </View>
              {renderLegendComponent(res?.value?.fuel)}

              <View>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Alarm
                </Text>
                <View style={{display: 'flex', alignItems: 'center'}}>
                  {/* <Switch
                    // size="lg"
                    // colorScheme="primary"
                    // value={res?.value?.isMute}
                    value={sw}
                    onValueChange={rrr => isCheckAlarm(res, rrr)}
                  /> */}
                  <Button
                    key={'md'}
                    size={'md'}
                    width={200}
                    borderRadius={15}
                    onPress={() => {
                      update(ref(db, `${res?.key}/`), {
                        ...res.value,
                        isMute: !res?.value?.isMute,
                      })
                        .then(re => {
                          console.log('re: ', re);
                        })
                        .catch(err => {
                          console.log('err:', err);
                        });
                      // if (res?.value?.isMute) {
                      // }
                    }}>
                    {res?.value?.isMute ? 'Alarm' : 'Stop'}
                  </Button>
                </View>
              </View>
            </View>
          </View>
        ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
