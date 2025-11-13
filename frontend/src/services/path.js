import axios from "axios";

const API_BASE_URL = "http://localhost:3000"

export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/register`, userData);
    return res.data;
  } catch (err) {
    console.error("Error registering user", err);
    throw err;
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/login`, credentials);
    return res.data;
  } catch (err) {
    console.error("Error logging in", err);
    throw err;
  }
};

export const getTasks = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/task`);
    return res.data;
  } catch (err) {
    console.error("Error fetching tasks", err);
    throw err;
  }
};


export const getTaskById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/task/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching task", err);
    throw err;
  }
};


export const createTask = async (taskData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/task`, taskData);
    return res.data;
  } catch (err) {
    console.error("Error creating task", err);
    throw err;
  }
};


export const updateTask = async (id, taskData) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/task/${id}`, taskData);
    return res.data;
  } catch (err) {
    console.error("Error updating task", err);
    throw err;
  }
};


export const deleteTask = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/task/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting task", err);
    throw err;
  }
};