const axios = require("axios");

//calls gemini api with req.data and returns the response to frontend

const generateRoadmap = async (req, res) => {
  try {
    const userInput = req.body; // Get user input from frontend
    console.log("Received user input:", userInput);

    // Construct the AI request body
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are an AI roadmap generator. Your task is to create a structured learning roadmap in JSON format based on the given inputs.  

### Inputs:  
{
  "subject": "${userInput.subject}",
  "time_span": "${userInput.time_span}",
  "skill_level": "${userInput.skill_level}",
  "goal": "${userInput.goal}"
}

### Output Format:  
Generate the output in **strict JSON format** with the following structure:

{
  "subject": "{subject_name}",
  "time_span": "{time_span}",
  "skill_level": "{skill_level}",
  "goal": "{goal}",
  "learning_plan": [
    {
      "week": 1,
      "topic": "Topic Name",
      "details": [
        "Point 1",
        "Point 2",
        "Point 3"
      ]
    }
  ]
}

### Important Instructions:
- Ensure that the JSON structure is **valid and formatted correctly**.
- Each topic is **divided into weeks** based on the total time span.
- The topics are arranged **in a logical learning sequence**.
- Each topic contains **concise bullet points** covering key concepts.
- Do not add any extra explanation outside the JSON output.`,
            },
          ],
        },
      ],
    };

    console.log("Making request to Gemini API...");
    // Call AI API using Axios
    const aiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Received response from Gemini API");

    // Extract the text content from the response
    const responseText = aiResponse.data.candidates[0].content.parts[0].text;
    console.log("Raw response text:", responseText);

    // Extract JSON from markdown code blocks if present
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : responseText;

    try {
      // Parse the JSON string
      const roadmapData = JSON.parse(jsonString);
      console.log("Successfully parsed roadmap data");
      res.json(roadmapData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({
        error: "Failed to parse roadmap data",
        details: parseError.message,
      });
    }
  } catch (error) {
    console.error("Error generating roadmap:", error);
    if (error.response) {
      console.error("API Error Response:", error.response.data);
      res.status(error.response.status).json({
        error: "Failed to generate roadmap",
        details: error.response.data,
      });
    } else if (error.request) {
      console.error("No response received:", error.request);
      res.status(500).json({
        error: "No response received from API",
        details: error.message,
      });
    } else {
      console.error("Error setting up request:", error.message);
      res.status(500).json({
        error: "Failed to generate roadmap",
        details: error.message,
      });
    }
  }
};

module.exports = { generateRoadmap };
