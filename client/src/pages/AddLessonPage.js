import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddLessonPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        videoUrl: '',
        description: '',
        duration: '',
    });

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchCourseDetails();
    }, [courseId]);

    const fetchCourseDetails = async () => {
        try {
            const response = await fetch(`/api/courses/${courseId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const response = await fetch(`/api/lessons/${courseId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                navigate(`/courses/${courseId}`);
            } else {
                setError(data.message || 'Failed to add lesson');
            }
        } catch (err) {
            setError('An error occurred while adding the lesson');
        } finally {
            setSaving(false);
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
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Add New Lesson</h1>
                    <p className="text-gray-600">Course: {course?.title}</p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Lesson Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                            Video URL
                        </label>
                        <input
                            type="url"
                            id="videoUrl"
                            name="videoUrl"
                            value={formData.videoUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                            required
                            placeholder="https://example.com/video"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Lesson Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                            Duration (minutes)
                        </label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            min="1"
                            className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate(`/courses/${courseId}`)}
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className={`px-6 py-2 bg-primary text-white rounded-md hover:bg-secondary transition duration-300 ${
                                saving ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {saving ? 'Adding Lesson...' : 'Add Lesson'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLessonPage;
