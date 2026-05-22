import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getPosts } from '../utils/storage.js';
import { getAvatar } from '../components/Avatar.jsx';
import { getCurrentUser } from '../utils/auth.js';

export default function LandingPage() {
  const navigate = useNavigate();
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const posts = getPosts();
    const sorted = posts
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
    setLatestPosts(sorted);
  }, []);

  const handleStartReading = () => {
    if (getCurrentUser()) {
      navigate('/blogs');
    } else {
      navigate('/login');
    }
  };

  const handlePostClick = (postId) => {
    if (getCurrentUser()) {
      navigate(`/blog/${postId}`);
    } else {
      navigate('/login');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-500 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Floating Card Animation */}
        <div
          className="absolute top-20 right-20 bg-white/20 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-float hidden md:block"
          style={{ animationDuration: '4s' }}
        >
          <div className="w-48 h-32 bg-white/30 rounded-md mb-3" />
          <div className="w-32 h-3 bg-white/40 rounded mb-2" />
          <div className="w-24 h-3 bg-white/30 rounded" />
        </div>

        <div className="text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-4">
            WriteSpace
          </h1>
          <p className="text-xl md:text-2xl text-white/90 text-center mb-8">
            Your thoughts. Your space. Beautifully simple.
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleStartReading}
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition mr-4"
            >
              Start Reading
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-indigo-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-900 transition border border-white/30"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why WriteSpace?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Write Freely</h3>
              <p className="text-gray-600">
                Express yourself without distractions. Just you and your words.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Private & Local</h3>
              <p className="text-gray-600">
                All your data stays in your browser. No servers, no tracking.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Instant & Fast</h3>
              <p className="text-gray-600">
                No loading screens. No API calls. Write and read instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Preview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Latest from the Blog
          </h2>
          {latestPosts.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No posts yet — check back soon!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post.id)}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {post.content?.slice(0, 120) || ''}
                    {post.content?.length > 120 ? '...' : ''}
                  </p>
                  <p className="text-gray-500 text-sm mb-2">
                    {formatDate(post.createdAt)}
                  </p>
                  <div className="flex items-center gap-2">
                    {getAvatar('user')}
                    <span className="text-gray-700 text-sm">
                      {post.authorName || 'Anonymous'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-6 mb-4">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <Link
              to={getCurrentUser() ? '/blogs' : '/login'}
              className="hover:text-white transition"
            >
              All Blogs
            </Link>
            <Link to="/login" className="hover:text-white transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-white transition">
              Register
            </Link>
          </div>
          <p className="text-center text-sm text-slate-400">
            © 2025 WriteSpace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
