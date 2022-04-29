import React, {useState, useEffect} from 'react';
import { View, Text,SafeAreaView, StyleSheet, Button} from 'react-native'
import FormButton from '../components/shared/FormButton'

const TaskScreen = ({navigation, route}) => {

  const [currentTaskId, setCurrentTaskId] = useState(
    route.params.taskId,
  );

  const [currentTaskDay, setCurrentTaskDay] = useState(
    route.params.taskDay,
  );

  const [currentTaskOne, setCurrentTaskOne] = useState(
    route.params.taskOne,
  );
  const [currentTaskTwo, setCurrentTaskTwo] = useState(
    route.params.taskTwo,
  );
  return (
    <View style={styles.container}>
        <SafeAreaView>
            <Text 
                style={{
                    alignSelf: "center", 
                    fontSize: 30,
                    margin: 10,
                    paddingBottom: 10,
                    fontWeight: "600",
                    color: "#f0ffff"
                      
                }}
            >
                   Day {currentTaskDay}  
            </Text>
            <Text style={styles.taskText}>
                Task 1: {currentTaskOne}
            </Text>

            <Text style={styles.taskText}>
                Task 2: {currentTaskTwo}
            </Text>
            <View style={styles.button}>
                <FormButton
                  labelText="Next"
                  handleOnPress={() => {
                    navigation.navigate('DailySurveyScreen', {
                      taskId: currentTaskId,
                      taskDay: currentTaskDay
                    });
                  }}
                
                />
            </View>
        </SafeAreaView>
        
    </View>
  )
}
const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f"
  },
  taskText: {
    marginVertical: 10,
    marginHorizontal: 30,
    fontSize: 24,
    paddingVertical: 20,
    color: "#f0ffff"

  },
  button: {
    //margin: 20,
    marginHorizontal: 110,
    padding: 50,
    borderRadius: 70
    
  }
})

export default TaskScreen
