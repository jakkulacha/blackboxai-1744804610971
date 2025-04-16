import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CourseListPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/courses');
            const data = await response.json();
            setCourses(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch courses');
            setLoading(false);
        }
    };

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Available Courses</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                    />
                    <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                    <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
                        <div className="h-48 bg-gray-200">
                            {/* Course image placeholder */}
                            <div className="w-full h-full flex items-center justify-center bg-primary text-white text-4xl">
                                <i className="fas fa-graduation-cap"></i>
                            </div>
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h2>
                            <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-primary font-bold">${course.price}</span>
                                <Link 
                                    to={`/courses/${course._id}`}
                                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition duration-300"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t">
                            <div className="flex items-center text-sm text-gray-600">
                                <i className="fas fa-user mr-2"></i>
                                <span>{course.instructor.name}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                    <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
                    <p className="text-gray-600">No courses found matching your search criteria.</p>
                </div>
            )}
        </div>
    );
};

export default CourseListPage;
