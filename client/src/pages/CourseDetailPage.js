import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CourseDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCourseDetails();
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            const response = await fetch(`/api/courses/${id}`);
            const data = await response.json();
            
            if (response.ok) {
                setCourse(data);
            } else {
                setError(data.message || 'Failed to fetch course details');
            }
            setLoading(false);
        } catch (err) {
            setError('An error occurred while fetching course details');
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        // Add enrollment logic here
        try {
            // Example enrollment API call
            const response = await fetch(`/api/courses/${id}/enroll`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/student/dashboard');
            } else {
                setError(data.message || 'Failed to enroll in course');
            }
        } catch (err) {
            setError('An error occurred while enrolling in the course');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Course not found</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Course Header */}
                <div className="bg-primary text-white p-8">
                    <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <i className="fas fa-user mr-2"></i>
                            <span>{course.instructor.name}</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-clock mr-2"></i>
                            <span>{course.lessons?.length || 0} lessons</span>
                        </div>
                    </div>
                </div>

                {/* Course Content */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="md:col-span-2">
                            <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                            <p className="text-gray-600 mb-8">{course.description}</p>

                            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                            {course.lessons && course.lessons.length > 0 ? (
                                <div className="space-y-4">
                                    {course.lessons.map((lesson, index) => (
                                        <div 
                                            key={lesson._id} 
                                            className="flex items-center p-4 bg-gray-50 rounded-lg"
                                        >
                                            <span className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full mr-4">
                                                {index + 1}
                                            </span>
                                            <span className="text-gray-800">{lesson.title}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">No lessons available yet.</p>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="md:col-span-1">
                            <div className="bg-gray-50 p-6 rounded-lg sticky top-8">
                                <div className="text-3xl font-bold text-primary mb-6">
                                    ${course.price}
                                </div>
                                <button
                                    onClick={handleEnroll}
                                    className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition duration-300 mb-4"
                                >
                                    Enroll Now
                                </button>
                                <div className="space-y-4 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <i className="fas fa-infinity w-6"></i>
                                        <span>Full lifetime access</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-mobile-alt w-6"></i>
                                        <span>Access on mobile and desktop</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-certificate w-6"></i>
                                        <span>Certificate of completion</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;
