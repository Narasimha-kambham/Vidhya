import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { summarizePDF, explainTopic, clearSummary, clearExplanation } from '../../features/toolSlice';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import PDFHandler from '../PDFHandler/PDFHandler';

const buttonStyle = {
  primary: {
    backgroundColor: '#1976d2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
    '&:disabled': {
      backgroundColor: '#ccc',
      color: '#666',
    }
  },
  secondary: {
    backgroundColor: '#fff',
    color: '#1976d2',
    border: '1px solid #1976d2',
    '&:hover': {
      backgroundColor: '#f5f5f5',
      borderColor: '#1565c0',
      color: '#1565c0',
    }
  }
};

const Aitools = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [pdfText, setPdfText] = useState('');
  const [topicData, setTopicData] = useState({
    topic: '',
    subjectArea: '',
    subdomain: '',
    difficultyLevel: 'Beginner',
    preferredFormat: 'Text explanation'
  });

  const { summary, explanation } = useSelector((state) => state.tools);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSummarize = () => {
    if (pdfText.trim()) {
      dispatch(summarizePDF(pdfText));
    }
  };

  const handleExplain = () => {
    if (topicData.topic.trim() && topicData.subjectArea.trim()) {
      dispatch(explainTopic(topicData));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTopicData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearAll = () => {
    dispatch(clearSummary());
    dispatch(clearExplanation());
    setPdfText('');
    setTopicData({
      topic: '',
      subjectArea: '',
      subdomain: '',
      difficultyLevel: 'Beginner',
      preferredFormat: 'Text explanation'
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
        AI Learning Tools
      </Typography>
      
      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="PDF Summarizer" />
          <Tab label="Topic Explainer" />
        </Tabs>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={clearAll}
          sx={buttonStyle.secondary}
        >
          Clear All
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ p: 3, width: '100%' }}
        >
          {activeTab === 0 ? (
            <>
              <Typography variant="h6" gutterBottom>
                PDF Summarizer
              </Typography>
              <PDFHandler />
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Or paste text directly:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={10}
                variant="outlined"
                label="Paste Text Here"
                value={pdfText}
                onChange={(e) => setPdfText(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSummarize}
                  disabled={!pdfText.trim() || summary.loading}
                  sx={buttonStyle.primary}
                >
                  {summary.loading ? <CircularProgress size={24} color="inherit" /> : 'Summarize'}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setPdfText('');
                    dispatch(clearSummary());
                  }}
                  sx={buttonStyle.secondary}
                >
                  Clear
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                Topic Explainer
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Topic"
                  name="topic"
                  value={topicData.topic}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label="Subject Area"
                  name="subjectArea"
                  value={topicData.subjectArea}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label="Subdomain (Optional)"
                  name="subdomain"
                  value={topicData.subdomain}
                  onChange={handleInputChange}
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Difficulty Level</InputLabel>
                    <Select
                      name="difficultyLevel"
                      value={topicData.difficultyLevel}
                      onChange={handleInputChange}
                      label="Difficulty Level"
                    >
                      <MenuItem value="Beginner">Beginner</MenuItem>
                      <MenuItem value="Intermediate">Intermediate</MenuItem>
                      <MenuItem value="Advanced">Advanced</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Preferred Format</InputLabel>
                    <Select
                      name="preferredFormat"
                      value={topicData.preferredFormat}
                      onChange={handleInputChange}
                      label="Preferred Format"
                    >
                      <MenuItem value="Text explanation">Text Explanation</MenuItem>
                      <MenuItem value="Video reference">Video Reference</MenuItem>
                      <MenuItem value="Code examples">Code Examples</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleExplain}
                  disabled={!topicData.topic.trim() || !topicData.subjectArea.trim() || explanation.loading}
                  sx={buttonStyle.primary}
                >
                  {explanation.loading ? <CircularProgress size={24} color="inherit" /> : 'Explain'}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setTopicData({
                      topic: '',
                      subjectArea: '',
                      subdomain: '',
                      difficultyLevel: 'Beginner',
                      preferredFormat: 'Text explanation'
                    });
                    dispatch(clearExplanation());
                  }}
                  sx={buttonStyle.secondary}
                >
                  Clear
                </Button>
              </Box>
            </>
          )}
        </Paper>

        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ p: 3, width: '100%' }}
        >
          <Typography variant="h6" gutterBottom>
            Results
          </Typography>
          {activeTab === 0 ? (
            <>
              {summary.loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                  <CircularProgress />
                </Box>
              )}
              {summary.error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {summary.error}
                </Alert>
              )}
              {summary.data && (
                <Box sx={{ mt: 2 }}>
                  {typeof summary.data === 'string' ? (
                    <ReactMarkdown>{summary.data}</ReactMarkdown>
                  ) : summary.data.summary ? (
                    <ReactMarkdown>{summary.data.summary}</ReactMarkdown>
                  ) : (
                    <Typography>No summary available</Typography>
                  )}
                </Box>
              )}
            </>
          ) : (
            <>
              {explanation.loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                  <CircularProgress />
                </Box>
              )}
              {explanation.error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {explanation.error}
                </Alert>
              )}
              {explanation.data && (
                <Box sx={{ mt: 2 }}>
                  {typeof explanation.data === 'string' ? (
                    <ReactMarkdown>{explanation.data}</ReactMarkdown>
                  ) : explanation.data.explanation ? (
                    <ReactMarkdown>{explanation.data.explanation}</ReactMarkdown>
                  ) : (
                    <Typography>No explanation available</Typography>
                  )}
                </Box>
              )}
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Aitools;
