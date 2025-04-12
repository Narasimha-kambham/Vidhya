// src/features/courseProgressSlice.js
import { createSlice } from '@reduxjs/toolkit';

const courseProgressSlice = createSlice({
  name: 'courseProgress',
  initialState: {
    completedLectures: {},
  },
  reducers: {
    toggleLectureCompletion: (state, action) => {
      const { courseId, lectureId } = action.payload;
      
      // Ensure the array exists
      if (!state.completedLectures[courseId]) {
        state.completedLectures = {
          ...state.completedLectures,
          [courseId]: []
        };
      }
      
      const isCompleted = state.completedLectures[courseId].includes(lectureId);
      
      if (!isCompleted) {
        state.completedLectures = {
          ...state.completedLectures,
          [courseId]: [...state.completedLectures[courseId], lectureId]
        };
      } else {
        state.completedLectures = {
          ...state.completedLectures,
          [courseId]: state.completedLectures[courseId].filter(id => id !== lectureId)
        };
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