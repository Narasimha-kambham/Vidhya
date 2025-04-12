import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper function to get token from localStorage
const getToken = () => {
  const persistRoot = localStorage.getItem('persist:root');
  console.log('Raw persistroot data:', persistRoot);
  
  if (!persistRoot) {
    console.log('No persistroot data found in localStorage');
    return null;
  }

  try {
    // Parse the persistroot data
    const parsedData = JSON.parse(persistRoot);
    console.log('Parsed persistroot data:', parsedData);
    
    // Get the auth data from persistroot
    const authData = parsedData.auth;
    if (!authData) {
      console.log('No auth data found in persistroot');
      return null;
    }
    
    // Parse the auth data
    const auth = JSON.parse(authData);
    console.log('Parsed auth data:', auth);
    
    // Get the token from the auth data
    const token = auth.token || auth.user?.token;
    console.log('Extracted token:', token);
    
    if (!token) {
      console.log('No token found in the auth data');
      return null;
    }
    
    return token;
  } catch (error) {
    console.error('Error parsing data:', error);
    return null;
  }
};

// Async thunk for summarizing PDF text
export const summarizePDF = createAsyncThunk(
  'tools/summarizePDF',
  async (pdfText, { rejectWithValue }) => {
    try {
      console.log('Starting PDF summarization...');
      const token = getToken();
      if (!token) {
        console.log('No token found for summarization');
        return rejectWithValue({ error: 'No authentication token found' });
      }

      console.log('Sending request to backend...');
      const response = await axios.post(
        'http://localhost:5000/api/tools/summarize',
        { pdfText },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Backend response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Summarization error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ error: 'Failed to summarize PDF' });
    }
  }
);

// Async thunk for explaining topic
export const explainTopic = createAsyncThunk(
  'tools/explainTopic',
  async (topicData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue({ error: 'No authentication token found from explanation' });
      }

      const response = await axios.post(
        'http://localhost:5000/api/tools/explain',
        topicData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        // Clear auth data if unauthorized
        localStorage.removeItem('auth');
      }
      return rejectWithValue(error.response?.data || { error: 'An error occurred' });
    }
  }
);

const toolSlice = createSlice({
  name: 'tools',
  initialState: {
    summary: {
      data: null,
      loading: false,
      error: null
    },
    explanation: {
      data: null,
      loading: false,
      error: null
    }
  },
  reducers: {
    clearSummary: (state) => {
      state.summary = {
        data: null,
        loading: false,
        error: null
      };
    },
    clearExplanation: (state) => {
      state.explanation = {
        data: null,
        loading: false,
        error: null
      };
    }
  },
  extraReducers: (builder) => {
    // Summarize PDF
    builder
      .addCase(summarizePDF.pending, (state) => {
        state.summary.loading = true;
        state.summary.error = null;
        state.summary.data = null;
      })
      .addCase(summarizePDF.fulfilled, (state, action) => {
        state.summary.loading = false;
        state.summary.data = action.payload;
        state.summary.error = null;
      })
      .addCase(summarizePDF.rejected, (state, action) => {
        state.summary.loading = false;
        state.summary.error = action.payload?.error || 'Failed to generate summary';
        state.summary.data = null;
      })
      // Explain Topic
      .addCase(explainTopic.pending, (state) => {
        state.explanation.loading = true;
        state.explanation.error = null;
      })
      .addCase(explainTopic.fulfilled, (state, action) => {
        state.explanation.loading = false;
        state.explanation.data = action.payload.explanation;
      })
      .addCase(explainTopic.rejected, (state, action) => {
        state.explanation.loading = false;
        state.explanation.error = action.payload?.error || 'Failed to generate explanation';
      });
  }
});

export const { clearSummary, clearExplanation } = toolSlice.actions;
export default toolSlice.reducer; 