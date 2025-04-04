import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; //  Import axios

// Async thunk for generating roadmap
export const fetchRoadmap = createAsyncThunk(
  "roadmap/fetchRoadmap",
  async (formData, { getState, rejectWithValue }) => {
    const state = getState();
    console.log("Redux State:", state);
    console.log("Token from Redux:", state.auth.token);
    const token = state.auth.token;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/ai/generate",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("getState().auth : " + getState().auth);

      console.log("token: " + token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  formData: {
    subject: "",
    time_span: "",
    skill_level: "",
    goal: "",
  },
  roadmapData: null,
  loading: false,
  error: null,
};

const roadmapSlice = createSlice({
  name: "roadmap",
  initialState,
  reducers: {
    // Define updateFormData to modify formData
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    clearRoadmap: (state) => {
      state.roadmapData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoadmap.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoadmap.fulfilled, (state, action) => {
        state.loading = false;
        state.roadmapData = action.payload;
      })
      .addCase(fetchRoadmap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to generate roadmap";
      });
  },
});

export const { updateFormData, clearRoadmap } = roadmapSlice.actions;
export default roadmapSlice.reducer;
