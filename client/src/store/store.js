import { configureStore } from "@reduxjs/toolkit";
import instructorReducer from "./slices/instructorSlice";
import courseReducer from "./slices/courseSlice";
import lectureReducer from "./slices/lectureSlice";

export default configureStore({
  reducer: {
    instructors: instructorReducer,
    courses: courseReducer,
    lectures: lectureReducer,
  },
});
