import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInstructors, createInstructor, updateInstructor, deleteInstructor } from "../../services/instructorService";

// Async Thunks for CRUD Operations
export const getInstructors = createAsyncThunk("instructors/getAll", async (_, { rejectWithValue }) => {
  const response = await fetchInstructors();
  if (response.error) return rejectWithValue(response.error);
  return response;
});

export const addInstructor = createAsyncThunk("instructors/add", async (instructorData, { rejectWithValue }) => {
  const response = await createInstructor(instructorData);
  if (response.error) return rejectWithValue(response.error);
  return response;
});

export const editInstructor = createAsyncThunk("instructors/edit", async ({ id, updatedData }, { rejectWithValue }) => {
  const response = await updateInstructor(id, updatedData);
  if (response.error) return rejectWithValue(response.error);
  return response;
});

export const removeInstructor = createAsyncThunk("instructors/delete", async (id, { rejectWithValue }) => {
  const response = await deleteInstructor(id);
  if (response.error) return rejectWithValue(response.error);
  return id;
});

// Redux Slice
const instructorSlice = createSlice({
  name: "instructors",
  initialState: { list: [], status: "idle", error: null },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      // Fetch Instructors
      .addCase(getInstructors.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getInstructors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(getInstructors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add Instructor
      .addCase(addInstructor.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addInstructor.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Edit Instructor
      .addCase(editInstructor.fulfilled, (state, action) => {
        const index = state.list.findIndex((inst) => inst._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(editInstructor.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Remove Instructor
      .addCase(removeInstructor.fulfilled, (state, action) => {
        state.list = state.list.filter((inst) => inst._id !== action.payload);
      })
      .addCase(removeInstructor.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default instructorSlice.reducer;
