import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import HomeComponent from './components/Home';
import LoginComponent from './components/Login';
import AddQuestionComponent from './components/AddQuestion';
import QuestionListComponent from './components/QuestionList';
import QuestionDetailComponent from './components/QuestionDetail';
import UserProfileComponent from './components/UserProfile';
import PostViewComponent from './components/PostView';
import PostAddComponent from './components/PostAdd';
import PostListComponent from './components/PostList';
import SignIn from './components/SignIn';

const App = () => {
  const { currentUser, logout } = useAuth();
  const title = 'My App';

  return (
    <Router>
      <nav className="bg-white px-4 py-2 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link className="text-xl text-blue-600 hover:text-blue-700 font-bold" to="/">{title}</Link>
          <div className="flex gap-4">
            <Link className="text-gray-700 hover:text-blue-600" to="/questions">Question List</Link>
            <Link className="text-gray-700 hover:text-blue-600" to="/add-question">Add Question</Link>
            <Link className="text-gray-700 hover:text-blue-600" to="/discussion">Discussion</Link>
            {/* ... other links ... */}
          </div>
          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                <img src={currentUser.photo} className="h-8 w-8 rounded-full" alt="User" />
                <Link className="text-gray-700 hover:text-blue-600" to="/profile">Profile</Link>
                <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
              </>
            ) : (
              <Link className="text-gray-700 hover:text-blue-600" to="/login">Login</Link>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/add-question" element={<AddQuestionComponent />} />
        <Route path="/questions" element={<QuestionListComponent />} />
        <Route path="/question/:id" element={<QuestionDetailComponent />} />
        <Route path="/profile" element={<UserProfileComponent />} />
        <Route path="/post/:id" element={<PostViewComponent />} />
        <Route path="/add-post" element={<PostAddComponent />} />
        <Route path="/discussion" element={<PostListComponent />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
