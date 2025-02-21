import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCourses, createCourse, updateCourse, deleteCourse } from "../../services/courseService";

// Async Thunks for CRUD Operations
export const getCourses = createAsyncThunk("courses/getAll", async () => {
  return await fetchCourses();
});

export const addCourse = createAsyncThunk("courses/add", async (courseData) => {
  return await createCourse(courseData);
});

export const editCourse = createAsyncThunk("courses/edit", async ({ id, updatedData }) => {
  return await updateCourse(id, updatedData);
});

export const removeCourse = createAsyncThunk("courses/delete", async (id) => {
  await deleteCourse(id);
  return id;
});

// Redux Slice
const courseSlice = createSlice({
  name: "courses",
  initialState: { list: [], status: "idle" },
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        const index = state.list.findIndex((course) => course._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeCourse.fulfilled, (state, action) => {
        state.list = state.list.filter((course) => course._id !== action.payload);
      });
  },
});

export default courseSlice.reducer;
