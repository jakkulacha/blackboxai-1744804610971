import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddLessonPage = () => {
    const { courseId } = useParams();
    const [title, setTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/lessons/${courseId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, videoUrl }),
        });
        const data = await response.json();
        if (response.ok) {
            alert('Lesson added successfully!');
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="add-lesson">
            <h2>Add Lesson</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Video URL:</label>
                    <input 
                        type="text" 
                        value={videoUrl} 
                        onChange={(e) => setVideoUrl(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Add Lesson</button>
            </form>
        </div>
    );
};

export default AddLessonPage;
