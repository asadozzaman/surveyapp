import firestore from '@react-native-firebase/firestore';


// Get All Quizzes
export const getTasks = () => {
    return firestore().collection('tasks').get();
  };


// Create new question for current quiz
export const createTask = (currentTaskId, currentDailyId, description) => {
  return firestore()
    .collection('tasks')
    .doc(currentTaskId)
    .collection('complete')
    .doc(currentDailyId)
    .set(description);


};

export const createScore = (currentDailyId,day) => {
  return firestore().collection('scores')
  .doc(currentDailyId)
  .set(day);
};


// Get Questions by currentQuizId
export const getScoreUserId = currentUserId => {
  return firestore()
    .collection('scores')
    .doc(currentUserId)
    .get();
};

