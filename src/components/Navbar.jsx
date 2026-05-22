import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAvatar } from './Avatar.jsx';
import { getCurrentUser, isAdmin, logout } from '../utils/auth.js';

export default function Navbar() {
  const location = useLocation();
  const user = getCurrentUser();
  const admin = isAdmin();
  const dropdownRef = useRef(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = admin
    ? [
        { label: 'All Blogs', path: '/blogs' },
        { label: 'Write', path: '/write' },
        { label: 'Users', path: '/users' },
      ]
    : [
        { label: 'All Blogs', path: '/blogs' },
        { label: 'Write', path: '/write' },
      ];

  function isActive(path) {
    return location.pathname === path;
  }

  function handleLogout() {
    logout();
    window.location.href = '/';
  }

  return (
    <nav className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600">
          WriteSpace
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={
                isActive(link.path)
                  ? 'bg-indigo-600 text-white rounded-full px-4 py-2'
                  : 'text-gray-600 hover:text-gray-900 px-4 py-2'
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: avatar + name + dropdown + mobile hamburger */}
        <div className="flex items-center">
          {/* Avatar and dropdown (desktop) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center focus:outline-none"
              aria-label="Toggle user menu"
            >
              {getAvatar(user?.role)}
              <span className="text-sm font-medium text-gray-700 ml-2 hidden sm:inline">
                {user?.displayName}
              </span>
              <svg
                className="w-4 h-4 text-gray-500 ml-1 hidden sm:inline"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-4 text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 p-4 mx-4 mb-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={
                  isActive(link.path)
                    ? 'bg-indigo-600 text-white rounded-full px-4 py-2 text-center'
                    : 'text-gray-600 hover:text-gray-900 px-4 py-2 text-center'
                }
              >
                {link.label}
              </Link>
            ))}
            {/* Show display name on mobile inside menu for clarity */}
            <div className="border-t border-gray-200 pt-2 mt-2 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {user?.displayName}
              </span>
            </div>
            <button
              onClick={() => {
                setMobileOpen(false);
                handleLogout();
              }}
              className="text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md text-center"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
