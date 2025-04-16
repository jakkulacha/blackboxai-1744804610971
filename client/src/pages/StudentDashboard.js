import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEnrolledCourses();
    }, []);

    const fetchEnrolledCourses = async () => {
        try {
            const response = await fetch('/api/courses/enrolled', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();

            if (response.ok) {
                setEnrolledCourses(data);
            } else {
                setError(data.message || 'Failed to fetch enrolled courses');
            }
            setLoading(false);
        } catch (err) {
            setError('An error occurred while fetching enrolled courses');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Dashboard Header */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Student Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-primary text-white rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-2">Enrolled Courses</h3>
                        <p className="text-3xl font-bold">{enrolledCourses.length}</p>
                    </div>
                    <div className="bg-secondary text-white rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-2">Completed Courses</h3>
                        <p className="text-3xl font-bold">
                            {enrolledCourses.filter(course => course.completed).length}
                        </p>
                    </div>
                    <div className="bg-green-600 text-white rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-2">In Progress</h3>
                        <p className="text-3xl font-bold">
                            {enrolledCourses.filter(course => !course.completed).length}
                        </p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Enrolled Courses */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">My Courses</h2>
                
                {enrolledCourses.length === 0 ? (
                    <div className="text-center py-8">
                        <i className="fas fa-books text-4xl text-gray-400 mb-4"></i>
                        <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
                        <Link 
                            to="/courses" 
                            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition duration-300"
                        >
                            Browse Courses
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enrolledCourses.map(course => (
                            <div key={course._id} className="bg-gray-50 rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {course.description}
                                    </p>
                                    <div className="mb-4">
                                        <div className="text-sm text-gray-600 mb-1">
                                            Progress: {course.progress || 0}%
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-primary h-2 rounded-full"
                                                style={{ width: `${course.progress || 0}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <Link 
                                        to={`/courses/${course._id}`}
                                        className="block text-center bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition duration-300"
                                    >
                                        Continue Learning
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
