import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../utils/storage.js';
import { getCurrentUser, isAdmin } from '../utils/auth.js';
import BlogCard from '../components/BlogCard.jsx';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadedPosts = getPosts();
    const sortedPosts = loadedPosts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setPosts(sortedPosts);
    setSession(getCurrentUser());
  }, []);

  const handleWriteClick = () => {
    navigate('/write');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Blogs</h1>
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No blogs yet. Be the first to write one!
          </p>
          <button
            type="button"
            onClick={handleWriteClick}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-indigo-700 transition"
          >
            Write a Blog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              index={index}
              showEdit={isAdmin() || post.authorId === session?.userId}
              onEditClick={() => navigate(`/edit/${post.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
