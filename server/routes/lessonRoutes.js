const express = require('express');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const router = express.Router();

// Add Lesson to Course
router.post('/:courseId', async (req, res) => {
    const { title, videoUrl } = req.body;
    const newLesson = new Lesson({ title, videoUrl });
    await newLesson.save();

    // Add lesson reference to the course
    await Course.findByIdAndUpdate(req.params.courseId, { $push: { lessons: newLesson._id } });
    res.status(201).json({ message: 'Lesson added successfully' });
});

// Get Lessons by Course ID
router.get('/:courseId', async (req, res) => {
    const lessons = await Lesson.find({ course: req.params.courseId });
    res.json(lessons);
});

module.exports = router;
