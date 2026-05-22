import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPosts, savePosts } from '../utils/storage.js';
import { getCurrentUser, isAdmin } from '../utils/auth.js';

export default function WriteBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const posts = getPosts();
      const post = posts.find((p) => p.id === id);
      const session = getCurrentUser();

      if (!post) {
        navigate('/blogs');
        return;
      }

      if (!isAdmin() && post.authorId !== session?.userId) {
        navigate('/blogs');
        return;
      }

      setTitle(post.title);
      setContent(post.content);
    }
  }, [id, isEditMode, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required.');
      return;
    }

    const session = getCurrentUser();

    if (isEditMode) {
      const posts = getPosts();
      const postIndex = posts.findIndex((p) => p.id === id);
      if (postIndex !== -1) {
        posts[postIndex].title = title;
        posts[postIndex].content = content;
        savePosts(posts);
      }
      navigate(`/blog/${id}`);
    } else {
      const newPost = {
        id: crypto.randomUUID(),
        title,
        content,
        createdAt: new Date().toISOString(),
        authorId: session.userId,
        authorName: session.displayName,
      };
      const posts = getPosts();
      posts.push(newPost);
      savePosts(posts);
      navigate(`/blog/${newPost.id}`);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditMode ? 'Edit Blog Post' : 'Write a New Blog Post'}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xl font-semibold mb-4"
        />
        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-64 resize-y"
        />
        <p className="text-sm text-gray-500 mt-1">{content.length} characters</p>
        {error && (
          <p className="text-red-600 mt-2">{error}</p>
        )}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition mr-3"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            {isEditMode ? 'Update' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  );
}
