const axios = require('axios');
const Papa = require('papaparse');

const getCourses = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.SHEET_CSV_URL}`);
    const csvText = response.data;
    
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    res.json(parsed.data);
  }
  catch (error) {
    console.error("courseController - fetching url data : "+error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }

}
module.exports = { getCourses };