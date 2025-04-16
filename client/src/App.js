import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CourseListPage from './pages/CourseListPage';
import CourseDetailPage from './pages/CourseDetailPage';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import CreateEditCoursePage from './pages/CreateEditCoursePage';
import AddLessonPage from './pages/AddLessonPage';

function App() {
    return (
        <Router>
            <div className="min-h-screen">
                {/* Navigation */}
                <nav className="bg-white shadow-lg">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <Link to="/" className="flex items-center">
                                    <span className="text-2xl font-bold text-primary">EduHive</span>
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link to="/courses" className="text-gray-700 hover:text-primary">Courses</Link>
                                <Link to="/login" className="text-gray-700 hover:text-primary">Login</Link>
                                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Routes */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/courses" element={<CourseListPage />} />
                        <Route path="/courses/:id" element={<CourseDetailPage />} />
                        <Route path="/student/dashboard" element={<StudentDashboard />} />
                        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
                        <Route path="/instructor/course/create" element={<CreateEditCoursePage />} />
                        <Route path="/instructor/course/edit/:id" element={<CreateEditCoursePage />} />
                        <Route path="/instructor/course/:courseId/lesson/add" element={<AddLessonPage />} />
                    </Routes>
                </div>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-8 mt-auto">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">EduHive</h3>
                                <p>Your one-stop marketplace for E-Learning courses.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                                <ul className="space-y-2">
                                    <li><Link to="/courses">Browse Courses</Link></li>
                                    <li><Link to="/register">Become an Instructor</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4">Contact</h3>
                                <p>Email: support@eduhive.com</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
