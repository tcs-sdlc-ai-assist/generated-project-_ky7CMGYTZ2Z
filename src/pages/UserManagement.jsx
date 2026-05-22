import { useState, useEffect } from 'react';
import { getUsers, saveUsers } from '../utils/storage.js';
import { getCurrentUser } from '../utils/auth.js';
import UserRow from '../components/UserRow.jsx';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setUsers(getUsers());
    setCurrentUserId(getCurrentUser()?.userId || null);
  }, []);

  const allUsers = [
    { id: 'admin', displayName: 'Admin', username: 'admin', role: 'admin', createdAt: null },
    ...users,
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedDisplayName = displayName.trim();
    const trimmedUsername = username.trim();

    if (!trimmedDisplayName || !trimmedUsername || !password) {
      setError('All fields are required.');
      return;
    }

    const existingUsers = getUsers();
    if (existingUsers.some((u) => u.username === trimmedUsername) || trimmedUsername === 'admin') {
      setError('Username is already taken.');
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      displayName: trimmedDisplayName,
      username: trimmedUsername,
      password,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    const updated = [...existingUsers, newUser];
    saveUsers(updated);
    setUsers(updated);
    setDisplayName('');
    setUsername('');
    setPassword('');
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updated = users.filter((u) => u.id !== userId);
      saveUsers(updated);
      setUsers(updated);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">User Management</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Create New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Create User
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">All Users</h2>

        <div className="hidden md:block">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase">
                <th className="px-4 py-3">Avatar</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  currentUserId={currentUserId}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden">
          {allUsers.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              currentUserId={currentUserId}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
