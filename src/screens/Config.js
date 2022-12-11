/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {Box, Center, Select, CheckIcon, Input, Button} from 'native-base';
import {db} from '../config/real-time-db';
import {ref, set} from 'firebase/database';
import {useState} from 'react';

const ConfigScreen = ({navigation}) => {
  const [shape, setShape] = useState();
  const [diameter, setDiameter] = useState();
  const [deviceData, setDeviceData] = useState();
  const [length, setLength] = useState();
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();

  return (
    <View
      style={{
        // paddingVertical: 100,
        backgroundColor: '#34448B',
        flex: 1,
      }}>
      <View
        style={{
          margin: 20,
          // padding: 16,
          borderRadius: 20,
          // backgroundColor: '#232B5D',
        }}>
        <Text style={{color: 'white', fontSize: 26, fontWeight: 'bold'}}>
          Fuel tank configuration
        </Text>
        <View style={{padding: 20, alignItems: 'center'}}>
          <View>
            <Center>
              <Box maxW="300" alignItems="center">
                <Select
                  width={'300'}
                  marginBottom={5}
                  selectedValue={shape}
                  minWidth="200"
                  accessibilityLabel="Select fuel tank shape"
                  placeholder="Select fuel tank shape"
                  color={'white'}
                  fontWeight={'bold'}
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={2}
                  onValueChange={itemValue => setShape(itemValue)}>
                  <Select.Item label="Vertical Cylinder" value="VRT_CYLINDER" />
                  <Select.Item
                    label="Horizontal Cylinder"
                    value="HORIZ_CYLINDER"
                  />
                  <Select.Item label="Rectangle" value="RECTANGLE" />
                </Select>
                {shape && (
                  <>
                    {(shape === 'VRT_CYLINDER' ||
                      shape === 'HORIZ_CYLINDER') && (
                      <Input
                        variant="outline"
                        placeholder="Diameter"
                        color={'white'}
                        fontWeight={'bold'}
                        marginBottom={5}
                        width={'300'}
                        onValueChange={setDiameter}
                        value={diameter}
                      />
                    )}
                    {(shape === 'HORIZ_CYLINDER' || shape === 'RECTANGLE') && (
                      <Input
                        variant="outline"
                        placeholder="Tank length"
                        color={'white'}
                        fontWeight={'bold'}
                        marginBottom={5}
                        width={'300'}
                        onValueChange={setLength}
                        value={length}
                      />
                    )}
                    {(shape === 'VRT_CYLINDER' ||
                      shape === 'HORIZ_CYLINDER' ||
                      shape === 'RECTANGLE') && (
                      <Input
                        variant="outline"
                        placeholder="Tank height"
                        color={'white'}
                        fontWeight={'bold'}
                        marginBottom={5}
                        width={'300'}
                        onValueChange={setHeight}
                        value={height}
                      />
                    )}
                    {shape === 'RECTANGLE' && (
                      <Input
                        variant="outline"
                        placeholder="Tank width"
                        color={'white'}
                        fontWeight={'bold'}
                        marginBottom={5}
                        width={'300'}
                        value={width}
                        onValueChange={setWidth}
                      />
                    )}
                  </>
                )}

                <Button
                  key={'md'}
                  size={'md'}
                  width={200}
                  borderRadius={15}
                  onPress={() => {
                    let num = Number('0000000001');

                    if (shape === 'VRT_CYLINDER') {
                      set(ref(db, `000000000${num + 1}/`), {
                        ...deviceData,
                        isMute: true,
                      })
                        .then(res => {
                          console.log('res: ', res);
                        })
                        .catch(err => {
                          console.log('err:', err);
                        });
                    } else if (shape === 'HORIZ_CYLINDER') {
                      set(ref(db, `000000000${num + 1}/`), {
                        ...deviceData,
                        isMute: true,
                      })
                        .then(res => {
                          console.log('res: ', res);
                        })
                        .catch(err => {
                          console.log('err:', err);
                        });
                    } else if (shape === 'RECTANGLE') {
                      set(ref(db, `000000000${num + 1}/`), {
                        ...deviceData,
                        isMute: true,
                      })
                        .then(res => {
                          console.log('res: ', res);
                        })
                        .catch(err => {
                          console.log('err:', err);
                        });
                    }
                    navigation.navigate('Home');
                  }}>
                  Save
                </Button>
              </Box>
            </Center>
          </View>
          {/* <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={'#232B5D'}
            centerLabelComponent={() => {
              return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                    {40}%
                  </Text>
                  <Text style={{fontSize: 14, color: 'white'}}>Fuel</Text>
                </View>
              );
            }}
          /> */}
        </View>
        {/* {renderLegendComponent()} */}
        {/* <View>
          <Text style={{color: 'white', fontSize: 26, fontWeight: 'bold'}}>
            Alarm
          </Text>
          <View style={{display: 'flex', alignItems: 'center'}}>
            <Switch size="lg" colorScheme="primary" defaultIsChecked />
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default ConfigScreen;
