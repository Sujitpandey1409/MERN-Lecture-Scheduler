import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInstructors, createInstructor, updateInstructor, deleteInstructor } from "../../services/instructorService";

// Async Thunks for CRUD Operations
export const getInstructors = createAsyncThunk("instructors/getAll", async () => {
  return await fetchInstructors();
});

export const addInstructor = createAsyncThunk("instructors/add", async (instructorData) => {
  return await createInstructor(instructorData);
});

export const editInstructor = createAsyncThunk("instructors/edit", async ({ id, updatedData }) => {
  return await updateInstructor(id, updatedData);
});

export const removeInstructor = createAsyncThunk("instructors/delete", async (id) => {
  await deleteInstructor(id);
  return id;
});

// Redux Slice
const instructorSlice = createSlice({
  name: "instructors",
  initialState: { list: [], status: "idle" },
  extraReducers: (builder) => {
    builder
      .addCase(getInstructors.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addInstructor.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editInstructor.fulfilled, (state, action) => {
        const index = state.list.findIndex((instructor) => instructor._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeInstructor.fulfilled, (state, action) => {
        state.list = state.list.filter((instructor) => instructor._id !== action.payload);
      });
  },
});

export default instructorSlice.reducer;
