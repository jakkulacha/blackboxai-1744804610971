import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetailPage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`/api/courses/${id}`);
            const data = await response.json();
            setCourse(data);
        };
        fetchCourse();
    }, [id]);

    if (!course) return <div>Loading...</div>;

    return (
        <div className="course-detail">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>Instructor: {course.instructor.name}</p>
            <p>Price: ${course.price}</p>
            <h3>Lessons</h3>
            <ul>
                {course.lessons.map(lesson => (
                    <li key={lesson._id}>
                        <h4>{lesson.title}</h4>
                        <p>Video URL: {lesson.videoUrl}</p>
                    </li>
                ))}
            </ul>
            <button>Enroll Now</button>
        </div>
    );
};

export default CourseDetailPage;
