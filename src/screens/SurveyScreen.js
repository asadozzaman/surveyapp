import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    FlatList,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';

  import {getTasks} from '../utils/surveydb';


  import {COLORS} from '../contants/theme';
  import {signOut} from '../utils/auth';
  import FormButton from '../components/shared/FormButton';

const SurveyScreen = ({navigation}) => {

    const [allTasks, setAllTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getAllTasks = async () => {
    setRefreshing(true);
    const tasks = await getTasks();

    // Transform task data
    let tempTasks = [];
    await tasks.docs.forEach(async task => {
      await tempTasks.push({id: task.id, ...task.data()});
    });
    await setAllTasks([...tempTasks]);

    setRefreshing(false);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  
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
          <Text style={{fontSize: 20, color: COLORS.black}}>Survey App</Text>
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

          {/* Task list */}
      <FlatList
        data={allTasks}
        onRefresh={getAllTasks}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        style={{
          paddingVertical: 20,
        }}
        renderItem={({item: task}) => (
          <View
            style={{
              padding: 20,
              borderRadius: 5,
              marginVertical: 5,
              marginHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: COLORS.white,
              elevation: 2,
            }}>
            <View style={{flex: 1, paddingRight: 10}}>
            <Text style={{fontSize: 18, color: COLORS.error}}>
                Day {task.day}
              </Text>
              <Text style={{fontSize: 18, color: COLORS.black}}>
                {task.one}
              </Text>
              {task.two != '' ? (
                <Text style={{opacity: 0.5}}>Day {task.two}</Text>
              ) : null}
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 50,
                backgroundColor: COLORS.primary + '20',
              }}
              onPress={() => {
                navigation.navigate('DailySurveyScreen', {
                  taskId: task.id,
                  taskDay: task.day
                });
              }}>
              <Text style={{color: COLORS.primary}}>Play</Text>
        
            </TouchableOpacity>

           

          </View>
        )}
      />
  
  {/* Temporary button - navigate without saving quiz*/}
  <FormButton
        labelText="Day One"
        style={{
          marginVertical: 20,
        }}
        handleOnPress={() => {
          navigation.navigate('AddQuestionScreen', {
            currentQuizId: '100663',
            currentQuizTitle: 'hu',
          });
        }}
      />


        <FormButton
          labelText="Day One"
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
  
      </SafeAreaView>
    );
  };

export default SurveyScreen