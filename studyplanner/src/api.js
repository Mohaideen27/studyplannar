import axios from "axios";

const API = "http://localhost:3000/";

//Subject Api

export const getSubjects = async () => {
  const res = await axios.get(`${API}/subjects`);
  return res.data;
};

export const addSubject = async (subject) => {
  const res = await axios.post(`${API}/subjects`, subject);
  return res.data;
};

export const updateSubject = async (id, subject) => {
  const res = await axios.patch(`${API}/subjects/${id}`, subject);
  return res.data;
};

export const deleteSubject = async () => {
  const res = await axios.delete(`${API}/subjects/${id}`);
};

// Task Api
export const getTasks = async () => {
  const res = await axios.get(`${API}/tasks`);
  return res.data;
};

export const addTasks = async (task) => {
  const res = await axios.post(`${API}/tasks`, task);
  return res.data;
};

export const updateTask = async (id, task) => {
  const res = await axios.patch(`${API}/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API}/tasks/${id}`);
};
