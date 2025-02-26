import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCourses, createCourse, updateCourse, deleteCourse } from "../../services/courseService";

// Async Thunks for CRUD Operations with Error Handling
export const getCourses = createAsyncThunk("courses/getAll", async (_, { rejectWithValue }) => {
  try {
    return await fetchCourses();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addCourse = createAsyncThunk("courses/add", async (courseData, { rejectWithValue }) => {
  try {
    return await createCourse(courseData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const editCourse = createAsyncThunk("courses/edit", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    return await updateCourse(id, updatedData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const removeCourse = createAsyncThunk("courses/delete", async (id, { rejectWithValue }) => {
  try {
    await deleteCourse(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Redux Slice
const courseSlice = createSlice({
  name: "courses",
  initialState: { 
    list: [], 
    status: "idle",  // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null 
  },
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(getCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add Course
      .addCase(addCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Edit Course
      .addCase(editCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.list.findIndex((course) => course._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(editCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Remove Course
      .addCase(removeCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter((course) => course._id !== action.payload);
      })
      .addCase(removeCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
