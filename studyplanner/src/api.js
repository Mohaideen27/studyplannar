import axios from "axios";

const API = "http://localhost:3000/";

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
