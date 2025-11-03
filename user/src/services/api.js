import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getStudents = () => axios.get(`${API_URL}/students`);
export const addStudent = (student) => axios.post(`${API_URL}/students`, student);
export const updateStudent = (id, student) => axios.put(`${API_URL}/students/${id}`, student);
export const deleteStudent = (id) => axios.delete(`${API_URL}/students/${id}`);
