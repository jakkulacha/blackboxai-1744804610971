const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Create Course
router.post('/', async (req, res) => {
    const { title, description, instructor, price } = req.body;
    const newCourse = new Course({ title, description, instructor, price });
    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully' });
});

// Get All Courses
router.get('/', async (req, res) => {
    const courses = await Course.find().populate('instructor', 'name');
    res.json(courses);
});

// Get Course by ID
router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id).populate('instructor', 'name');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
});

// Update Course
router.put('/:id', async (req, res) => {
    const { title, description, price } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, { title, description, price }, { new: true });
    if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course updated successfully', course: updatedCourse });
});

// Delete Course
router.delete('/:id', async (req, res) => {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
});

module.exports = router;
