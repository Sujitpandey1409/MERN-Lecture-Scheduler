import axios from "axios";

const API_URL = "http://localhost:5000/api/lectures";

export const fetchLectures = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const scheduleLecture = async (lectureData) => {
  const response = await axios.post(API_URL, lectureData);
  return response.data;
};

export const updateLecture = async (lectureId, updatedData) => {
  const response = await axios.put(`${API_URL}/${lectureId}`, updatedData);
  return response.data;
};


export const deleteLecture = async (lectureId) => {
  const response = await axios.delete(`${API_URL}/${lectureId}`);
  return response.data;
};
