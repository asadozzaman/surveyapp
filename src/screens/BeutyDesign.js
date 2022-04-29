import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../contants/theme';
import {signOut} from '../utils/auth';
import FormButton from '../components/shared/FormButton';
import auth from '@react-native-firebase/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const BeutyDesign = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        position: 'relative',
      }}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLORS.white,
          elevation: 4,
          paddingHorizontal: 20,
        }}>
        <Text style={{fontSize: 20, color: COLORS.black}}>Design App </Text>
        <Text
          style={{
            fontSize: 20,
            padding: 10,
            color: COLORS.error,
          }}
          onPress={signOut}>
          Logout
        </Text>
      </View>
      <View  style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLORS.error,
          elevation: 4,
          paddingHorizontal: 120,
          paddingVertical: 100,
          width: 40,
          height: 40,
          marginTop: 40,
          marginLeft: 100
        }}>

      </View>

      <FormButton
        labelText="MY Button"
        style={{
          // bottom: 20,
          left: 50,
          // borderRadius: 50,
          // paddingHorizontal: 30,
          width: '50%',
          top: 30,
        }}
        handleOnPress={() => navigation.navigate('HomeScreen')}
      />

      <FlatList
        data={DATA}
        style={{
        //   paddingVertical: 20,
        //   height: 30,
        //   width: 40,
        //   backgroundColor: Colors.black,
        marginTop: 50,
        marginLeft: 40
        }}
        renderItem={({item: Data}) => (
            <Text>{Data.title}</Text>
         )}
      />
    </SafeAreaView>
  );
};

export default BeutyDesign;
