import firestore from '@react-native-firebase/firestore';

export const createQuiz = (currentQuizId, title, description) => {
  return firestore().collection('surveys').doc(currentQuizId).set({
    title,
    description,
  });
};


// Create new question for current quiz
export const createQuestion = (currentQuizId, currentQuestionId, question) => {
  return firestore()
    .collection('surveys')
    .doc(currentQuizId)
    .collection('QNA')
    .doc(currentQuestionId)
    .set(question);
};

// Get All Quizzes
export const getQuizzes = () => {
  return firestore().collection('surveys').get();
};


// Get Quiz Details by id
export const getQuizById = currentQuizId => {
  return firestore().collection('surveys').doc(currentQuizId).get();
};

// Get Questions by currentQuizId
export const getQuestionsByQuizId = currentQuizId => {
  return firestore()
    .collection('surveys')
    .doc(currentQuizId)
    .collection('QNA')
    .get();
};

/// delete data
export const deleteQuizm = (id) =>{
console.log('wesf')
  return firestore()
    .collection('surveys')
    .doc(id).delete()
    .catch((error) => console.log(error));
}