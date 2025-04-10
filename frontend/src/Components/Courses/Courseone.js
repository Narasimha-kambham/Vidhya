import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLectureCompletion } from '../../features/courseProgressSlice';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  useTheme,
  useMediaQuery,
  Checkbox,
  LinearProgress,
  Dialog,
  DialogContent
} from '@mui/material';
import {
  ExpandMore,
  AccessTime,
  Language,
  Update,
  School,
  PlayCircleOutline,
  Description,
  Assignment,
  CloudDownload,
  PhoneAndroid,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  DeveloperMode as DeveloperModeIcon,
  Build as BuildIcon,
  Code as CodeIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const courseData = {
  title: "Complete Web Development Course",
  subtitle: "Only web development course that you will need. Covers HTML, CSS, Tailwind, Node, React, MongoDB, Prisma, Deployment etc",
  instructor: {
    name: "Hitesh Choudhary",
    profilePic: "https://images.pexels.com/users/avatars/97941/hitesh-choudhary-291.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=2",
    bio: "A passionate educator, software engineer, and full-stack developer with a love for building projects and mentoring students."
  },
  rating: 4.7,
  reviews: 9708,
  students: 36173,
  language: "English",
  lastUpdated: "March 2025",
  duration: "79.5 hours",
  lectures: 231,
  level: "Beginner to Advanced",
  hasCertificate: true,
  price: "Premium",
  enrollmentDate: "Oct. 20, 2024",
  features: [
    "79.5 hours on-demand video",
    "45 coding exercises",
    "5 articles",
    "28 downloadable resources",
    "Full lifetime access",
    "Certificate of completion",
    "Access on mobile and TV"
  ],
  whatYouWillLearn: [
    "Become a full stack developer",
    "Build any project for your company or for freelance projects",
    "Master of Javascript ecosystem",
    "Full stack with MERN, GIT and many advanced topics"
  ],
  requirements: [
    "No prior programming knowledge required",
    "A computer with internet connection",
    "Willingness to learn and build projects"
  ],
  description: "This course is a complete journey from basics to becoming a full stack web developer. You'll cover frontend, backend, databases, deployment and build real-world projects.",
  modules: [
    {
      title: "Before web dev Journey",
      duration: "1hr 1min",
      lectures: [
        { title: "Course Introduction - Roadmap", duration: "11:26" },
        { title: "Meet your Instructor - Hitesh", duration: "05:26" },
        { title: "Let's talk about AI hype", duration: "06:11" },
        { title: "Jobs salary range and skills", duration: "10:21" },
        { title: "What tools you need for web development", duration: "09:50" },
        { title: "How to setup your code editor", duration: "18:04" }
      ]
    },
    {
      title: "HTML Fundamentals",
      duration: "2hr 30min",
      lectures: [
        { title: "Introduction to HTML5", duration: "15:30" },
        { title: "HTML Document Structure", duration: "20:45" },
        { title: "Working with Text Elements", duration: "25:10" },
        { title: "Links and Navigation", duration: "18:20" },
        { title: "Images and Multimedia", duration: "22:15" },
        { title: "Forms and Input Elements", duration: "48:00" }
      ]
    },
    {
      title: "CSS Mastery",
      duration: "3hr 15min",
      lectures: [
        { title: "CSS Basics and Selectors", duration: "30:15" },
        { title: "Box Model and Layout", duration: "35:20" },
        { title: "Flexbox and Grid Systems", duration: "45:30" },
        { title: "Responsive Design", duration: "40:25" },
        { title: "CSS Animations and Transitions", duration: "43:30" }
      ]
    },
    {
      title: "JavaScript Essentials",
      duration: "4hr 45min",
      lectures: [
        { title: "JavaScript Fundamentals", duration: "55:20" },
        { title: "DOM Manipulation", duration: "50:15" },
        { title: "Events and Event Handling", duration: "45:30" },
        { title: "Async Programming", duration: "35:25" },
        { title: "Error Handling and Debugging", duration: "38:30" }
      ]
    },
    {
      title: "React Development",
      duration: "5hr 30min",
      lectures: [
        { title: "React Basics and JSX", duration: "45:20" },
        { title: "Components and Props", duration: "50:15" },
        { title: "State and Lifecycle", duration: "55:30" },
        { title: "Hooks and Custom Hooks", duration: "60:25" },
        { title: "React Router and Navigation", duration: "49:30" }
      ]
    }
  ],
  certificate: "https://drive.google.com/file/d/1WGKDtbSar450xshS1ave13SdzMbsWixE/view?usp=sharing"
};

const Courseone = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedModule, setExpandedModule] = useState(0);
  const dispatch = useDispatch();
  const completedLectures = useSelector((state) => 
    state.courseProgress.completedLectures['web-dev-course'] || []
  );
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false);

  const totalLectures = courseData.modules.reduce((total, module) => total + module.lectures.length, 0);
  const progress = (completedLectures.length / totalLectures) * 100;

  const handleLectureComplete = (moduleIndex, lectureIndex) => {
    const lectureId = `${moduleIndex}-${lectureIndex}`;
    dispatch(toggleLectureCompletion({
      courseId: 'web-dev-course',
      lectureId
    }));
  };

  const handleCertificateClick = () => {
    if (progress === 100) {
      window.open(courseData.certificate, '_blank');
    }
  };

  const handleCloseCertificateDialog = () => {
    setCertificateDialogOpen(false);
  };

  const handleModuleChange = (index) => {
    setExpandedModule(expandedModule === index ? -1 : index);
  };

  // Instructor Section
  const InstructorSection = () => (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      sx={{ mb: 4 }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Meet Your Instructor
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, flexWrap: 'wrap' }}>
          <Avatar
            src={courseData.instructor.profilePic}
            alt={courseData.instructor.name}
            sx={{ width: 120, height: 120 }}
          />
          <Box sx={{ flex: 1, minWidth: 280 }}>
            <Typography variant="h6" gutterBottom>
              {courseData.instructor.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {courseData.instructor.bio}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip icon={<School />} label={`${courseData.students.toLocaleString()} Students`} />
              <Chip icon={<Description />} label={`${courseData.lectures} Lectures`} />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  // Hero Section
  const HeroSection = () => (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ mb: 4, overflow: 'visible' }}
    >
    
      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              {courseData.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
              {courseData.subtitle}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Tooltip title={courseData.instructor.bio}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <Avatar
                    src={courseData.instructor.profilePic}
                    alt={courseData.instructor.name}
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="subtitle2">{courseData.instructor.name}</Typography>
                </Box>
              </Tooltip>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={courseData.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({courseData.reviews.toLocaleString()} reviews)
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
              <Chip icon={<Language />} label={courseData.language} />
              <Chip icon={<Update />} label={`Updated ${courseData.lastUpdated}`} />
              <Chip icon={<School />} label={courseData.level} />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                position: isMobile ? 'relative' : 'sticky',
                top: 24,
                p: 2,
                bgcolor: 'background.paper',
                boxShadow: 3
              }}
            >
              <Typography variant="h5" gutterBottom color="primary">
                {courseData.price}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ mb: 2 }}
              >
                Enroll Now
              </Button>
              <Typography variant="body2" align="center" paragraph>
                {courseData.duration} • {courseData.lectures} lectures
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  // What You'll Learn Section
  const LearningSection = () => (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      sx={{ mb: 4 }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          What You'll Learn
        </Typography>
        <Grid container spacing={2}>
          {courseData.whatYouWillLearn.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <ListItem>
                <ListItemIcon>
                  {index === 0 ? <DeveloperModeIcon color="primary" /> :
                   index === 1 ? <BuildIcon color="primary" /> :
                   index === 2 ? <CodeIcon color="primary" /> :
                   <School color="primary" />}
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  // Course Content Section
  const ContentSection = () => (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Course Content
        </Typography>
        {courseData.modules.map((module, index) => (
          <Accordion
            key={index}
            expanded={expandedModule === index}
            onChange={() => handleModuleChange(index)}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <Typography variant="subtitle1">{module.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {module.duration}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {module.lectures.map((lecture, lectureIndex) => (
                  <ListItem key={lectureIndex}>
                    <ListItemIcon>
                      <PlayCircleOutline />
                    </ListItemIcon>
                    <ListItemText
                      primary={lecture.title}
                      secondary={lecture.duration}
                    />
                    <Checkbox
                      checked={completedLectures.includes(`${index}-${lectureIndex}`)}
                      onChange={() => handleLectureComplete(index, lectureIndex)}
                      color="primary"
                      sx={{ ml: 2 }}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  );

  // Features Section
  const FeaturesSection = () => (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      sx={{ mb: 4 }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          This course includes:
        </Typography>
        <Grid container spacing={2}>
          {courseData.features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <ListItem>
                <ListItemIcon>
                  {index === 0 ? <AccessTime color="primary" /> :
                   index === 1 ? <Assignment color="primary" /> :
                   index === 2 ? <Description color="primary" /> :
                   index === 3 ? <CloudDownload color="primary" /> :
                   index === 4 ? <School color="primary" /> :
                   index === 5 ? <Description color="primary" /> :
                   <PhoneAndroid color="primary" />}
                </ListItemIcon>
                <ListItemText primary={feature} />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg">
      <HeroSection />
      <InstructorSection />
      <LearningSection />
      <RequirementsSection />
      <ContentSection />
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Course Progress
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {Math.round(progress)}% Complete ({completedLectures.length} of {totalLectures} lectures)
        </Typography>
      </Box>
      <Card 
        sx={{ 
          mb: 4, 
          cursor: progress === 100 ? 'pointer' : 'not-allowed',
          opacity: progress === 100 ? 1 : 0.7
        }}
        onClick={handleCertificateClick}
      >
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {progress === 100 ? <LockOpenIcon color="primary" /> : <LockIcon />}
          <Typography>
            {progress === 100 ? 'View Course Completion Certificate' : 'Complete all lectures to unlock certificate'}
          </Typography>
        </CardContent>
      </Card>
      <FeaturesSection />
      <Dialog open={certificateDialogOpen} onClose={handleCloseCertificateDialog} maxWidth="md">
        <DialogContent>
          <img 
            src={courseData.certificate} 
            alt="Course Certificate" 
            style={{ width: '100%', height: 'auto' }} 
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Courseone;

// Requirements Section
const RequirementsSection = () => (
  <Card
    component={motion.div}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    sx={{ mb: 4 }}
  >
    <CardContent>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Requirements
      </Typography>
      <List>
        {courseData.requirements.map((requirement, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <DeveloperModeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={requirement} />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);