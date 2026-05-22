import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvatar } from './Avatar.jsx';

const BORDER_ACCENTS = [
  'border-t-4 border-indigo-500',
  'border-t-4 border-violet-500',
  'border-t-4 border-pink-500',
  'border-t-4 border-teal-500',
];

export default function BlogCard({ post, index, showEdit = false, onEditClick }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/blog/${post.id}`);
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    if (onEditClick) {
      onEditClick();
    }
  };

  const excerpt =
    post.content.length > 120
      ? `${post.content.slice(0, 120)}...`
      : post.content;

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const borderAccent = BORDER_ACCENTS[index % 4];

  return (
    <div
      className={`bg-white shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition ${borderAccent}`}
      onClick={handleCardClick}
    >
      <div className="p-6 relative">
        {showEdit && (
          <button
            type="button"
            className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={handleEditClick}
            aria-label="Edit post"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        )}
        <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getAvatar('user')}
            <span className="text-sm text-gray-700">{post.authorName}</span>
          </div>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
