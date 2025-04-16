import React, { useEffect, useState } from 'react';

const StudentDashboard = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            // Fetch enrolled courses logic here
            const response = await fetch('/api/courses'); // Replace with actual endpoint
            const data = await response.json();
            setEnrolledCourses(data); // Adjust based on actual data structure
        };
        fetchEnrolledCourses();
    }, []);

    return (
        <div className="student-dashboard">
            <h2>Your Enrolled Courses</h2>
            <ul>
                {enrolledCourses.map(course => (
                    <li key={course._id}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentDashboard;
