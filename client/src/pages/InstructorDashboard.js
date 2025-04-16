import React, { useEffect, useState } from 'react';

const InstructorDashboard = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            // Fetch instructor's courses logic here
            const response = await fetch('/api/courses'); // Replace with actual endpoint
            const data = await response.json();
            setCourses(data); // Adjust based on actual data structure
        };
        fetchCourses();
    }, []);

    return (
        <div className="instructor-dashboard">
            <h2>Your Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course._id}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                ))}
            </ul>
            <button>Create New Course</button>
        </div>
    );
};

export default InstructorDashboard;
