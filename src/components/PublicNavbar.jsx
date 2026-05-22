import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAvatar } from './Avatar.jsx';
import { getCurrentUser, isAdmin } from '../utils/auth.js';

export default function PublicNavbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <nav className="sticky top-0 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          WriteSpace
        </Link>

        <div className="flex items-center">
          {!user ? (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium mr-4">
                Login
              </Link>
              <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center">
              {getAvatar(user.role)}
              <span className="text-sm font-medium text-gray-700 ml-2">
                {user.displayName}
              </span>
              <Link
                to={isAdmin() ? '/admin' : '/blogs'}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition ml-3"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
