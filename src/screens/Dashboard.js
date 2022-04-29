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
import {getScoreUserId} from '../utils/surveydb';



const Dashboard = ({navigation}) => {

  const [day, setDay] = useState('');
  const [point, setPoint] = useState([]);
  const user = auth().currentUser;



  const getScoreDetails = async () => {

    let currentScore = await getScoreUserId(user.uid);
    currentScore = currentScore.data();
    setDay(currentScore.day);


  };

  useEffect(() => {
    getScoreDetails();
  }, [])

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
        <Text style={{fontSize: 20, color: COLORS.black}}>MY App {day} hjkfgh {user.id}</Text>
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

      <FormButton
        labelText="Quiz Type Create"
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
      
      <FormButton
        labelText="Survey Screen"
        style={{
          // bottom: 20,
          left: 50,
          // borderRadius: 50,
          width: '50%',
          marginTop: 40
        }}
        handleOnPress={() => navigation.navigate('SurveyScreen')}
      />
      <FormButton
        labelText="Beuty Design"
        style={{
          // bottom: 20,
          left: 50,
          // borderRadius: 50,
          width: '50%',
          marginTop: 20
        }}
        handleOnPress={() => navigation.navigate('BeutyDesign')}
      />
      <FormButton
        labelText="Daily Screen"
        style={{
          // bottom: 20,
          left: 50,
          // borderRadius: 50,
          width: '50%',
          marginTop: 20
        }}
        handleOnPress={() => navigation.navigate('DailyChallenges')}
      />

    </SafeAreaView>
  );
};

export default Dashboard;
