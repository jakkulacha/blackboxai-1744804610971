const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
});

module.exports = mongoose.model('Lesson', lessonSchema);
