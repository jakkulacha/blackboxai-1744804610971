import React, { useEffect, useState } from 'react';

const CourseListPage = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('/api/courses');
            const data = await response.json();
            setCourses(data);
        };
        fetchCourses();
    }, []);

    return (
        <div className="course-list">
            <h2>Available Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course._id}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <p>Instructor: {course.instructor.name}</p>
                        <p>Price: ${course.price}</p>
                        <a href={`/courses/${course._id}`}>View Details</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseListPage;
