import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/instructors`;

// Fetch all instructors
export const fetchInstructors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching instructors:", error.response?.data || error.message);
    return { error: error.response?.data?.message || "Failed to fetch instructors." };
  }
};

// Add a new instructor
export const createInstructor = async (instructorData) => {
  try {
    const response = await axios.post(API_URL, instructorData);
    return response.data;
  } catch (error) {
    console.error("Error creating instructor:", error.response?.data || error.message);
    return { error: error.response?.data?.message || "Failed to create instructor." };
  }
};

// Update an instructor
export const updateInstructor = async (instructorId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${instructorId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating instructor:", error.response?.data || error.message);
    return { error: error.response?.data?.message || "Failed to update instructor." };
  }
};

// Delete an instructor
export const deleteInstructor = async (instructorId) => {
  try {
    const response = await axios.delete(`${API_URL}/${instructorId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting instructor:", error.response?.data || error.message);
    return { error: error.response?.data?.message || "Failed to delete instructor." };
  }
};
