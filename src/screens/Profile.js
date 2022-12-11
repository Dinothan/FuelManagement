import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

const Profile = () => {
  //   const {
  //     city,
  //     firstname,
  //     lastname,
  //     weight,
  //     height,
  //     country,
  //     state,
  //     gender,
  //     email,
  //     phone,
  //     age,
  //   } = user;

  const FieldRow = ({field, value}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: 15,
          paddingBottom: 10,
        }}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>{field}</Text>
        <Text style={{color: 'black'}}>{value}</Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
              }}
            />

            <Text style={styles.name}>M. Dinothan </Text>
            <Text style={styles.userInfo}>Colombo </Text>
            <TouchableOpacity>
              <Text style={{color: 'blue'}}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>
          {/* <View style={{paddingBottom: 10}}>
            <Collapse isExpanded={true}>
              <CollapseHeader
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  backgroundColor: '#E6E6E6',
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                }}>
                <View style={{}}>
                  <Text style={{color: 'black'}}>Health Information</Text>
                </View>
              </CollapseHeader>
              <CollapseBody
                style={{
                  padding: 10,
                  backgroundColor: '#EDEDED',
                  color: 'black',
                }}>
                <FieldRow field={'Height: '} value={height + ' cm'} />
                <FieldRow field={'Weight: '} value={weight + ' kg'} />
                <FieldRow field={'BMI: '} value={bmi} />
                <FieldRow field={'BMR: '} value={bmr} />
                <FieldRow field={'Activity: '} value={activity} />
                <FieldRow
                  field={'Calories/day: '}
                  value={dailyCal + ' Calories'}
                />
              </CollapseBody>
            </Collapse>
          </View> */}
          <View>
            <Collapse isExpanded={true}>
              <CollapseHeader
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  backgroundColor: '#E6E6E6',
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                }}>
                <View>
                  <Text style={{color: 'black'}}>Personal Information</Text>
                </View>
              </CollapseHeader>
              <CollapseBody
                style={{
                  padding: 10,
                  backgroundColor: '#EDEDED',
                  color: 'black',
                }}>
                <FieldRow field={'Email: '} value={'dinotahn1@gmail.com'} />
                <FieldRow field={'Age: '} value={'29'} />
                <FieldRow field={'gender: '} value={'male'} />
                <FieldRow field={'phone: '} value={'077777777'} />
                <FieldRow field={'City: '} value={'colombo'} />
                <FieldRow field={'State: '} value={'western'} />
                <FieldRow field={'Country: '} value={'Sri lanka'} />
              </CollapseBody>
            </Collapse>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#DCDCDC',
  },
  headerContent: {
    padding: 5,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: '#778899',
    fontWeight: '600',
    paddingBottom: 5,
  },
  body: {
    paddingTop: 10,
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    color: '#ffffff',
    paddingLeft: 5,
  },
  iconContent: {
    flex: 0.4,
    backgroundColor: '#708090',
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#FFFFFF',
  },
});
