if i send any number value after a resource(quizzes) does it implicitly compare the value with id key in the array and get the data.

export const getQuiz = async (id) => {
const response = await axios.get(`${API_URL}/quizzes/${id}`);
return response.data;
};

explain how this end point work

// Get questions for a particular quiz
export const getQuestions = async (quizId) => {
const response = await axios.get(`${API_URL}/questions?quizId=${quizId}`);

return response.data;
};

explain usecontext and how it works with different example(separate program ) to understand better.

explain usememo and how it works with different example(separate program ) to understand better.
