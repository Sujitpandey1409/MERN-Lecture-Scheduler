import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/courses`;

// Fetch all courses
export const fetchCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleClientError(error);
  }
};

// Create a new course
export const createCourse = async (courseData) => {
  try {
    const response = await axios.post(API_URL, courseData);
    return response.data;
  } catch (error) {
    handleClientError(error);
  }
};

// Update a course
export const updateCourse = async (courseId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${courseId}`, updatedData);
    return response.data;
  } catch (error) {
    handleClientError(error);
  }
};

// Delete a course
export const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`${API_URL}/${courseId}`);
    return response.data;
  } catch (error) {
    handleClientError(error);
  }
};

// Generic error handler function
const handleClientError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message || `Error: ${error.response.status}`);
  } else if (error.request) {
    throw new Error("No response from the server. Please check your network.");
  } else {
    throw new Error(error.message);
  }
};
