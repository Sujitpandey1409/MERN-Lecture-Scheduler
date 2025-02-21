import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLectures, scheduleLecture, updateLecture, deleteLecture } from "../../services/lectureService";

// Async Thunks for CRUD Operations
export const getLectures = createAsyncThunk("lectures/getAll", async () => {
  return await fetchLectures();
});

export const addLecture = createAsyncThunk("lectures/add", async (lectureData) => {
  return await scheduleLecture(lectureData);
});

export const editLecture = createAsyncThunk("lectures/edit", async ({ id, updatedData }) => {
  return await updateLecture(id, updatedData);
});

export const removeLecture = createAsyncThunk("lectures/delete", async (id) => {
  await deleteLecture(id);
  return id;
});

// Redux Slice
const lectureSlice = createSlice({
  name: "lectures",
  initialState: { list: [], status: "idle" },
  extraReducers: (builder) => {
    builder
      .addCase(getLectures.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addLecture.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editLecture.fulfilled, (state, action) => {
        const index = state.list.findIndex((lecture) => lecture._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeLecture.fulfilled, (state, action) => {
        state.list = state.list.filter((lecture) => lecture._id !== action.payload);
      });
  },
});

export default lectureSlice.reducer;
