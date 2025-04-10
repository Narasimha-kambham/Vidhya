// src/redux/slices/courseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const response = await axios.get('http://localhost:5000/api/courses/getData');
    return response.data;
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default courseSlice.reducer;
