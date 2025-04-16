import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const InstructorDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalStudents: 0,
        totalRevenue: 0
    });

    useEffect(() => {
        fetchInstructorCourses();
    }, []);

    const fetchInstructorCourses = async () => {
        try {
            const response = await fetch('/api/courses/instructor', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();

            if (response.ok) {
                setCourses(data);
                calculateStats(data);
            } else {
                setError(data.message || 'Failed to fetch courses');
            }
            setLoading(false);
        } catch (err) {
            setError('An error occurred while fetching courses');
            setLoading(false);
        }
    };

    const calculateStats = (coursesData) => {
        const stats = coursesData.reduce((acc, course) => ({
            totalCourses: acc.totalCourses + 1,
            totalStudents: acc.totalStudents + (course.enrolledStudents?.length || 0),
            totalRevenue: acc.totalRevenue + (course.price * (course.enrolledStudents?.length || 0))
        }), {
            totalCourses: 0,
            totalStudents: 0,
            totalRevenue: 0
        });
        setStats(stats);
    };

    const handleDeleteCourse = async (courseId) => {
        if (!window.confirm('Are you sure you want to delete this course?')) {
            return;
        }

        try {
            const response = await fetch(`/api/courses/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                setCourses(courses.filter(course => course._id !== courseId));
                calculateStats(courses.filter(course => course._id !== courseId));
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to delete course');
            }
        } catch (err) {
            setError('An error occurred while deleting the course');
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
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Instructor Dashboard</h1>
                    <Link 
                        to="/instructor/course/create"
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition duration-300"
                    >
                        Create New Course
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-primary text-white rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-2">Total Courses</h3>
                        <p className="text-3xl font-bold">{stats.totalCourses}</p>
                    </div>
                    <div className="bg-secondary text-white rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-2">Total Students</h3>
                        <p className="text-3xl font-bold">{stats.totalStudents}</p>
                    </div>
                    <div className="bg-green-600 text-white rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                        <p className="text-3xl font-bold">${stats.totalRevenue}</p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Course List */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">My Courses</h2>
                
                {courses.length === 0 ? (
                    <div className="text-center py-8">
                        <i className="fas fa-chalkboard-teacher text-4xl text-gray-400 mb-4"></i>
                        <p className="text-gray-600 mb-4">You haven't created any courses yet.</p>
                        <Link 
                            to="/instructor/course/create" 
                            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition duration-300"
                        >
                            Create Your First Course
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Course
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Students
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Revenue
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {courses.map(course => (
                                    <tr key={course._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {course.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {course.lessons?.length || 0} lessons
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {course.enrolledStudents?.length || 0}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                ${course.price * (course.enrolledStudents?.length || 0)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link 
                                                to={`/instructor/course/edit/${course._id}`}
                                                className="text-primary hover:text-secondary"
                                            >
                                                Edit
                                            </Link>
                                            <Link 
                                                to={`/instructor/course/${course._id}/lesson/add`}
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                Add Lesson
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteCourse(course._id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstructorDashboard;
