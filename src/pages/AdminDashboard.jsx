import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getPosts, savePosts, getUsers } from '../utils/storage.js';
import StatCard from '../components/StatCard.jsx';
import { getAvatar } from '../components/Avatar.jsx';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadedPosts = getPosts();
    const loadedUsers = getUsers();
    setPosts(loadedPosts);
    setUsers(loadedUsers);
  }, []);

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure?')) {
      const updatedPosts = posts.filter((post) => post.id !== postId);
      savePosts(updatedPosts);
      setPosts(updatedPosts);
    }
  };

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon="📝" label="Total Posts" count={posts.length} />
        <StatCard icon="👥" label="Total Users" count={users.length + 1} />
        <StatCard
          icon="👑"
          label="Total Admins"
          count={users.filter((u) => u.role === 'admin').length + 1}
        />
        <StatCard
          icon="👤"
          label="Total Users"
          count={users.filter((u) => u.role === 'user').length}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/write')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Write New Post
          </button>
          <button
            type="button"
            onClick={() => navigate('/users')}
            className="bg-violet-600 text-white px-4 py-2 rounded-lg"
          >
            Manage Users
          </button>
          <button
            type="button"
            onClick={() => navigate('/blogs')}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg"
          >
            View All Blogs
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Posts</h2>
        {recentPosts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          recentPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between bg-white shadow rounded-lg p-4 mb-3"
            >
              <div>
                <div className="font-medium text-gray-800">{post.title}</div>
                <div className="text-sm text-gray-500">{post.authorName}</div>
                <div className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => navigate(`/edit/${post.id}`)}
                  className="text-indigo-600 hover:underline mr-3"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
