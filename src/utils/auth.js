import { getUsers, saveUsers, getSession, saveSession, clearSession } from './storage.js';

export function login(username, password) {
  if (username === 'admin' && password === 'admin') {
    const session = {
      userId: 'admin',
      username: 'admin',
      displayName: 'Admin',
      role: 'admin',
    };
    saveSession(session);
    return { success: true, session };
  }

  const users = getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const session = {
      userId: user.id,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
    };
    saveSession(session);
    return { success: true, session };
  }

  return { success: false, error: 'Invalid username or password.' };
}

export function register(displayName, username, password, confirmPassword) {
  if (!displayName || !username || !password || !confirmPassword) {
    return { success: false, error: 'All fields are required.' };
  }

  if (password !== confirmPassword) {
    return { success: false, error: 'Passwords do not match.' };
  }

  const users = getUsers();
  const existingUser = users.find((u) => u.username === username);

  if (existingUser || username === 'admin') {
    return { success: false, error: 'Username is already taken.' };
  }

  const newUser = {
    id: crypto.randomUUID(),
    displayName,
    username,
    password,
    role: 'user',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  const session = {
    userId: newUser.id,
    username: newUser.username,
    displayName: newUser.displayName,
    role: newUser.role,
  };
  saveSession(session);

  return { success: true, session };
}

export function logout() {
  clearSession();
}

export function getCurrentUser() {
  return getSession();
}

export function isAuthenticated() {
  return getCurrentUser() !== null;
}

export function isAdmin() {
  const user = getCurrentUser();
  return user?.role === 'admin';
}
