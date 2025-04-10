// src/components/Courses.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../features/courseSlice';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  CircularProgress,
  Paper,
  Slider,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Star, CurrencyRupee } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: courses, loading, error } = useSelector((state) => state.course);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedRating, setSelectedRating] = useState('');
  const [filters, setFilters] = useState({
    premium: false,
    bestseller: false,
    recentlyUpdated: false
  });

  // Filter handlers
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleFilterChange = (name) => (event) => {
    setFilters({ ...filters, [name]: event.target.checked });
  };

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const price = parseFloat(course.price);
    const rating = parseFloat(course.rating);
    const tags = course.tags ? course.tags.split(',').map(tag => tag.trim()) : [];

    return (
      price >= priceRange[0] &&
      price <= priceRange[1] &&
      (selectedRating === '' || rating >= parseFloat(selectedRating)) &&
      (!filters.premium || tags.includes('Premium')) &&
      (!filters.bestseller || tags.includes('Bestseller')) &&
      (!filters.recentlyUpdated || tags.includes('Updated Recently'))
    );
  });

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={5}>
        Error fetching courses: {error}
      </Typography>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        What to learn next
      </Typography>

      <Typography variant="h6" color="text.secondary" gutterBottom>
        Recommended for you
      </Typography>

      {/* Filter Container */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Filters</Typography>
        
        {/* Price Range Filter */}
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Price Range (₹)</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={5000}
            step={100}
          />
        </Box>

        {/* Rating Filter */}
        <FormControl sx={{ mb: 3, minWidth: 200 }}>
          <InputLabel>Minimum Rating</InputLabel>
          <Select
            value={selectedRating}
            label="Minimum Rating"
            onChange={handleRatingChange}
          >
            <MenuItem value="">All Ratings</MenuItem>
            <MenuItem value="4.5">4.5 & above</MenuItem>
            <MenuItem value="4.0">4.0 & above</MenuItem>
            <MenuItem value="3.5">3.5 & above</MenuItem>
          </Select>
        </FormControl>

        {/* Tag Filters */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControlLabel
            control={<Checkbox checked={filters.premium} onChange={handleFilterChange('premium')} />}
            label="Premium"
          />
          <FormControlLabel
            control={<Checkbox checked={filters.bestseller} onChange={handleFilterChange('bestseller')} />}
            label="Bestseller"
          />
          <FormControlLabel
            control={<Checkbox checked={filters.recentlyUpdated} onChange={handleFilterChange('recentlyUpdated')} />}
            label="Recently Updated"
          />
        </Box>
      </Paper>

      <Box 
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
          alignItems: 'stretch'
        }}
      >
        {filteredCourses.map((course, index) => {
          const tags = course.tags ? course.tags.split(',') : [];

          return (
            <Box
              key={index}
              sx={{
                width: { xs: '100%', sm: '300px' },
                minWidth: { xs: '100%', sm: '300px' },
                maxWidth: { xs: '100%', sm: '300px' }
              }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  transition: '0.3s',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': { transform: 'scale(1.02)', cursor: 'pointer' },
                }}
                onClick={() => navigate(course.link)}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={course.thumbnail}
                  alt={course.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                      height: '100px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: '1.2'
                    }}
                  >
                    {course.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {course.instructor}
                  </Typography>

                  <Box display="flex" alignItems="center" mt={1}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {course.rating}
                    </Typography>
                    <Star sx={{ fontSize: 18, ml: 0.5, color: '#f4c150' }} />
                    <Typography variant="body2" color="text.secondary" ml={1}>
                      ({course.reviewCount?.toLocaleString?.() ?? 0})
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mt={1}>
                    <Typography variant="h6" fontWeight={700}>
                      <CurrencyRupee fontSize="inherit" />
                      {course.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textDecoration: 'line-through', ml: 1 }}
                    >
                      ₹{course.originalPrice}
                    </Typography>
                  </Box>

                  <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                    {/* Show tags from the tags array */}
                    {tags.map((tag, i) => (
                      <Chip
                        key={i}
                        label={tag}
                        size="small"
                        color={
                          tag === 'Premium'
                            ? 'secondary'
                            : tag === 'Bestseller'
                            ? 'success'
                            : tag === 'Updated Recently'
                            ? 'info'
                            : 'default'
                        }
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Courses;
