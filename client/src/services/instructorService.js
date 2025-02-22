import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/instructors`;

// Fetch all instructors
export const fetchInstructors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new instructor
export const createInstructor = async (instructorData) => {
  const response = await axios.post(API_URL, instructorData);
  return response.data;
};

// Update an instructor
export const updateInstructor = async (instructorId, updatedData) => {
  const response = await axios.put(`${API_URL}/${instructorId}`, updatedData);
  return response.data;
};

// Delete an instructor
export const deleteInstructor = async (instructorId) => {
  const response = await axios.delete(`${API_URL}/${instructorId}`);
  return response.data;
};
