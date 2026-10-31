import axios from "axios";

const API_URL = "http://localhost:3000";

// Get all quizzes
export const getQuizzes = async () => {
  const response = await axios.get(`${API_URL}/quizzes`);
  return response.data;
};

// Get one quiz
export const getQuiz = async (id) => {
  const response = await axios.get(`${API_URL}/quizzes/${id}`);
  return response.data;
};

// Get questions for a particular quiz
export const getQuestions = async (quizId) => {
  const response = await axios.get(`${API_URL}/questions?quizId=${quizId}`);

  return response.data;
};

// Add a question
export const addQuestion = async (question) => {
  const response = await axios.post(`${API_URL}/questions`, question);

  return response.data;
};

// Update a question
export const updateQuestion = async ({ id, ...question }) => {
  const response = await axios.patch(`${API_URL}/questions/${id}`, question);

  return response.data;
};

// Delete a question
export const deleteQuestion = async (id) => {
  await axios.delete(`${API_URL}/questions/${id}`);
};

// Save a quiz attempt
export const saveAttempt = async (attempt) => {
  const response = await axios.post(`${API_URL}/attempts`, attempt);

  return response.data;
};

// Get previous quiz attempts
export const getAttempts = async () => {
  const response = await axios.get(`${API_URL}/attempts`);

  return response.data;
};

// Get one quiz attempt
export const getAttempt = async (id) => {
  const response = await axios.get(`${API_URL}/attempts/${id}`);

  return response.data;
};
