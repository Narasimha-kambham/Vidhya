// src/features/courseProgressSlice.js
import { createSlice } from '@reduxjs/toolkit';

const courseProgressSlice = createSlice({
  name: 'courseProgress',
  initialState: {
    completedLectures: {},  // Store completed lectures by courseId
  },
  reducers: {
    toggleLectureCompletion: (state, action) => {
      const { courseId, lectureId } = action.payload;
      if (!state.completedLectures[courseId]) {
        state.completedLectures[courseId] = [];
      }
      const index = state.completedLectures[courseId].indexOf(lectureId);
      if (index === -1) {
        state.completedLectures[courseId].push(lectureId);
      } else {
        state.completedLectures[courseId].splice(index, 1);
      }
    },
    clearCourseProgress: (state, action) => {
      const { courseId } = action.payload;
      state.completedLectures[courseId] = [];
    },
  },
});

export const { toggleLectureCompletion, clearCourseProgress } = courseProgressSlice.actions;
export default courseProgressSlice.reducer;