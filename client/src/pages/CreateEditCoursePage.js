import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CreateEditCoursePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'programming', // default category
    });

    const [loading, setLoading] = useState(isEditMode);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            fetchCourseDetails();
        }
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            const response = await fetch(`/api/courses/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();

            if (response.ok) {
                setFormData({
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                });
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
            const url = isEditMode ? `/api/courses/${id}` : '/api/courses';
            const method = isEditMode ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/instructor/dashboard');
            } else {
                setError(data.message || 'Failed to save course');
            }
        } catch (err) {
            setError('An error occurred while saving the course');
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
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    {isEditMode ? 'Edit Course' : 'Create New Course'}
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Course Title
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
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Course Description
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
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                            required
                        >
                            <option value="programming">Programming</option>
                            <option value="design">Design</option>
                            <option value="business">Business</option>
                            <option value="marketing">Marketing</option>
                            <option value="personal-development">Personal Development</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/instructor/dashboard')}
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
                            {saving ? 'Saving...' : (isEditMode ? 'Update Course' : 'Create Course')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEditCoursePage;
