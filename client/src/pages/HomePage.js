import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Welcome to EduHive
                        </h1>
                        <p className="text-xl md:text-2xl mb-8">
                            Your gateway to quality online education
                        </p>
                        <div className="space-x-4">
                            <Link 
                                to="/courses" 
                                className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
                            >
                                Browse Courses
                            </Link>
                            <Link 
                                to="/register" 
                                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition duration-300"
                            >
                                Start Teaching
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose EduHive?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                        <i className="fas fa-graduation-cap text-4xl text-primary mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Quality Education</h3>
                        <p className="text-gray-600">Learn from industry experts and gain practical knowledge</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                        <i className="fas fa-clock text-4xl text-primary mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Learn at Your Pace</h3>
                        <p className="text-gray-600">Access course content anytime, anywhere</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                        <i className="fas fa-certificate text-4xl text-primary mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Get Certified</h3>
                        <p className="text-gray-600">Earn certificates upon course completion</p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Ready to Start Learning?</h2>
                    <Link 
                        to="/register" 
                        className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary transition duration-300"
                    >
                        Join Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
