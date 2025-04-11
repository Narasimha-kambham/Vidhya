const axios = require('axios');
require('dotenv').config();

// Summarize function
const summarize = async (req, res) => {
  try {
    const { pdfText } = req.body;
    console.log("Received PDF text for summarization");

    if (!pdfText) {
      return res.status(400).json({ error: 'PDF text is required' });
    }

    const requestBody = {
      contents: [{
        parts: [{
          text: "Explain the following content in a clear and structured way: " + pdfText
        }]
      }]
    };

    console.log("Making request to Gemini API for summarization...");
    const aiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Received response from Gemini API");
    const summary = aiResponse.data.candidates[0].content.parts[0].text;
    console.log("Successfully generated summary");
    res.json({ summary });
  } catch (error) {
    console.error("Error in summarize:", error);
    if (error.response) {
      console.error("API Error Response:", error.response.data);
      res.status(error.response.status).json({
        error: "Failed to generate summary",
        details: error.response.data,
      });
    } else {
      res.status(500).json({ 
        error: "Failed to generate summary",
        details: error.message 
      });
    }
  }
};

// Explain function
const explain = async (req, res) => {
  try {
    const { topic, subjectArea, subdomain, difficultyLevel, preferredFormat } = req.body;
    console.log("Received topic explanation request:", { topic, subjectArea, subdomain, difficultyLevel, preferredFormat });

    if (!topic || !subjectArea) {
      return res.status(400).json({ error: 'Topic and subject area are required' });
    }

    const requestBody = {
      contents: [{
        parts: [{
          text: "Explain the topic " + topic + (subdomain ? " in the context of " + subdomain : "") + " at a " + difficultyLevel + " level"
        }]
      }]
    };

    console.log("Making request to Gemini API for explanation...");
    const aiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Received response from Gemini API");
    const explanation = aiResponse.data.candidates[0].content.parts[0].text;
    console.log("Successfully generated explanation");
    res.json({ explanation });
  } catch (error) {
    console.error("Error in explain:", error);
    if (error.response) {
      console.error("API Error Response:", error.response.data);
      res.status(error.response.status).json({
        error: "Failed to generate explanation",
        details: error.response.data,
      });
    } else {
      res.status(500).json({ 
        error: "Failed to generate explanation",
        details: error.message 
      });
    }
  }
};

module.exports = { summarize, explain };
