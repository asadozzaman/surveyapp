import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../contants/theme';
import FormInput from '../components/shared/FormInput';
import FormButton from '../components/shared/FormButton';
import {createTask,createScore} from '../utils/surveydb';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const DailySurveyScreen = ({navigation, route}) => {
  const user = auth().currentUser;

  const [currentTaskId, setCurrentTaskId] = useState(
    route.params.taskId,
  );
  const [currentTaskDay, setCurrentTaskDay] = useState(
    route.params.taskDay,
  );


  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');


  const handleQuestionSave = async () => {
    if (
      description == '' 
     
    ) {
      return;
    }

    let currentDailyId = Math.floor(
      100000 + Math.random() * 9000,
    ).toString();

    // Upload Image
    let imageUrl = '';

    if (imageUri != '') {
      const reference = storage().ref(
        `/images/daily/${currentTaskId}_${currentDailyId}`,
      );
      await reference.putFile(imageUri).then(() => {
        console.log('Image Uploaded');
      });
      imageUrl = await reference.getDownloadURL();
    }

    // Add task to db
    await createScore(currentDailyId, {
      uid: user.uid,
      day: currentTaskDay,
      point:2

    });


    // Add question to db
    await createTask(currentTaskId, currentDailyId, {
      uid: user.uid,
      description: description,
      imageUrl: imageUrl,
      seen: true,
      lock: false
      

    });


    ToastAndroid.show('Task saved', ToastAndroid.SHORT);

    // Reset
    setDescription('');
    setImageUri('');

  };

  

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      ({assets}) => {
        if (assets && assets.length > 0) {
          setImageUri(assets[0].uri);
        }
      },
    );
  };


  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <View style={{padding: 20}}>
          <Text
            style={{fontSize: 20, textAlign: 'center', color: COLORS.black}}>
            Day {currentTaskDay}  
          </Text>
          <Text style={{textAlign: 'center', marginBottom: 20}}>
            ID: {currentTaskId}
          </Text>
         

          <FormInput
            labelText="Description"
            placeholderText="enter description"
            onChangeText={val => setDescription(val)}
            value={description}
          />
          {/* Image upload */}

          {imageUri == '' ? (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 28,
                backgroundColor: COLORS.primary + '20',
              }}
              onPress={selectImage}>
              <Text style={{opacity: 0.5, color: COLORS.primary}}>
                + add image
              </Text>
            </TouchableOpacity>
          ) : (
            <Image
              source={{
                uri: imageUri,
              }}
              resizeMode={'cover'}
              style={{
                width: '80%',
                height: 200,
                borderRadius: 5,
              }}
            />
          )}

          {/* Options */}
      
          
        </View>
        <FormButton
            labelText="Save Question"
            handleOnPress={
              handleQuestionSave}
            style={{
                width: '100%',
                // height: 200,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
          />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default DailySurveyScreen