import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { RadioButtonUnchecked as RadioButtonUncheckedIcon } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { updateFormData, fetchRoadmap } from "../../features/roadmapSlice";

const AiRoadmap = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { formData, roadmapData, loading, error } = useSelector(
    (state) => state.roadmap
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(fetchRoadmap(formData));
  };

  // Animation variants for roadmap cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
          borderRadius: "16px",
          p: 4,
          color: theme.palette.primary.contrastText,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          AI Learning Roadmap
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Get personalized learning paths tailored to your goals
        </Typography>
      </Box>

      {/* Form Section */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 6,
          borderRadius: "16px",
          background: theme.palette.background.paper,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "32px",
                "& > *": {
                  flex: { xs: "1 1 100%", md: "1 1 calc(50% - 16px)" },
                  minWidth: { xs: "100%", md: "calc(50% - 16px)" },
                },
              }}
            >
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                size="large"
                placeholder="Enter your subject (e.g., Python, JavaScript, Machine Learning)"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: theme.palette.text.primary,
                    height: "56px",
                    fontSize: "1.1rem",
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.text.primary,
                    fontSize: "1.1rem",
                    "&.Mui-focused": {
                      color: theme.palette.primary.main,
                    },
                  },
                }}
              ></TextField>

              <TextField
                fullWidth
                label="Time Span"
                name="time_span"
                value={formData.time_span}
                onChange={handleChange}
                select
                required
                size="large"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: theme.palette.text.primary,
                    height: "56px",
                    fontSize: "1.1rem",
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.text.primary,
                    fontSize: "1.1rem",
                    "&.Mui-focused": {
                      color: theme.palette.primary.main,
                    },
                  },
                  "& .MuiSelect-select": {
                    padding: "16px 14px",
                  },
                }}
              >
                <MenuItem value="1 month">1 Month</MenuItem>
                <MenuItem value="3 months">3 Months</MenuItem>
                <MenuItem value="6 months">6 Months</MenuItem>
              </TextField>

              <TextField
                fullWidth
                label="Skill Level"
                name="skill_level"
                value={formData.skill_level}
                onChange={handleChange}
                select
                required
                size="large"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: theme.palette.text.primary,
                    height: "56px",
                    fontSize: "1.1rem",
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.text.primary,
                    fontSize: "1.1rem",
                    "&.Mui-focused": {
                      color: theme.palette.primary.main,
                    },
                  },
                  "& .MuiSelect-select": {
                    padding: "16px 14px",
                  },
                }}
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </TextField>

              <TextField
                fullWidth
                label="Learning Goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                select
                required
                size="large"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: theme.palette.text.primary,
                    height: "56px",
                    fontSize: "1.1rem",
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.text.primary,
                    fontSize: "1.1rem",
                    "&.Mui-focused": {
                      color: theme.palette.primary.main,
                    },
                  },
                  "& .MuiSelect-select": {
                    padding: "16px 14px",
                  },
                }}
              >
                <MenuItem value="Get a job">Get a Job</MenuItem>
                <MenuItem value="Build a project">Build a Project</MenuItem>
                <MenuItem value="Pass an exam">Pass an Exam</MenuItem>
              </TextField>
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                height: "56px",
                fontSize: "1.1rem",
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Generate Roadmap"
              )}
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Roadmap Display Section */}
      {roadmapData && roadmapData.learning_plan && (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: "16px",
            background: theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: theme.palette.text.primary,
              mb: 4,
              textAlign: "center",
            }}
          >
            Your Learning Roadmap
          </Typography>

          <Timeline position="alternate">
            {roadmapData.learning_plan.map((week, index) => (
              <TimelineItem key={week.week}>
                <TimelineSeparator>
                  <TimelineDot
                    color="primary"
                    sx={{
                      background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                    }}
                  />
                  {index < roadmapData.learning_plan.length - 1 && (
                    <TimelineConnector />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={cardVariants}
                  >
                    <Card
                      sx={{
                        mb: 2,
                        background: theme.palette.background.default,
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 600,
                          }}
                        >
                          Week {week.week}: {week.topic}
                        </Typography>
                        <List>
                          {week.details &&
                            week.details.map((detail, idx) => (
                              <ListItem key={idx}>
                                <ListItemIcon>
                                  <RadioButtonUncheckedIcon
                                    sx={{
                                      color: theme.palette.text.primary,
                                      fontSize: "1.2rem",
                                    }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={detail}
                                  sx={{
                                    color: theme.palette.text.primary,
                                  }}
                                />
                              </ListItem>
                            ))}
                        </List>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Paper>
      )}
    </Container>
  );
};

export default AiRoadmap;
