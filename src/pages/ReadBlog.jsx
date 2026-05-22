import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPosts, savePosts } from '../utils/storage.js';
import { getCurrentUser, isAdmin } from '../utils/auth.js';
import { getAvatar } from '../components/Avatar.jsx';

export default function ReadBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const posts = getPosts();
    const foundPost = posts.find((p) => p.id === id);
    setPost(foundPost || null);
    setSession(getCurrentUser());
  }, [id]);

  const canEditOrDelete = () => {
    if (!session) return false;
    return isAdmin() || post?.authorId === session.userId;
  };

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    const allPosts = getPosts();
    const filtered = allPosts.filter((p) => p.id !== id);
    savePosts(filtered);
    navigate('/blogs');
  };

  if (!post) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h1>
        <Link to="/blogs" className="text-indigo-600 hover:underline">
          ← Back to all blogs
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const avatarRole = post.authorId === 'admin' ? 'admin' : 'user';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <div className="flex items-center gap-3 mb-8">
        {getAvatar(avatarRole)}
        <span className="text-gray-700 font-medium">{post.authorName}</span>
        <span className="text-gray-500">{formattedDate}</span>
      </div>
      <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>
      {canEditOrDelete() && (
        <div className="mt-8">
          <Link
            to={`/edit/${post.id}`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition mr-3"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
