import {getTasks} from '../utils/surveydb';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import React, {useState, useEffect} from 'react';

const DailyChallenges = ({navigation}) => {

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
    <View>
        <SafeAreaView>
            <FlatList
                data={allTasks}
                renderItem= {( { item: task } ) => (
    
                  <TouchableOpacity 
                      style={styles.listButton}
                      onPress={() => {
                        navigation.navigate('TaskScreen', {
                          taskId: task.id,
                          taskDay: task.day,
                          taskOne: task.one,
                          taskTwo: task.two,
                        });
                      }}
              
                  >
                      <Text style={styles.itemText}>
                        {task.day}
                        {'\n'}
                        _________
                        {'\n'}
                        {'\n'}
                        {task.name}
                      </Text>
                      
                  </TouchableOpacity>
                )}
                //keyExtractor={item => item.id}               
            />

        </SafeAreaView>       
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    itemText: {
        padding: 0,
        textAlign: "center",
        fontSize: 24,
        color: "white"
    },
    listButton: {
        padding: 25,
        //paddingBottom: 30,
        marginVertical: 25,
        marginHorizontal: 50,
        backgroundColor: "#8022D9",
        borderRadius: 30
    }
})

export default DailyChallenges