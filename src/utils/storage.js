// SECURITY NOTE: Passwords stored in plain text — MVP limitation. Do not use real passwords.

export function getPosts() {
  try {
    const postsJson = localStorage.getItem('writespace_posts');
    if (!postsJson) {
      return [];
    }
    const parsedPosts = JSON.parse(postsJson);
    return Array.isArray(parsedPosts) ? parsedPosts : [];
  } catch {
    return [];
  }
}

export function savePosts(posts) {
  try {
    localStorage.setItem('writespace_posts', JSON.stringify(posts));
  } catch {
    // Silent fail
  }
}

export function getUsers() {
  try {
    const usersJson = localStorage.getItem('writespace_users');
    if (!usersJson) {
      return [];
    }
    const parsedUsers = JSON.parse(usersJson);
    return Array.isArray(parsedUsers) ? parsedUsers : [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  try {
    localStorage.setItem('writespace_users', JSON.stringify(users));
  } catch {
    // Silent fail
  }
}

export function getSession() {
  try {
    const sessionJson = localStorage.getItem('writespace_session');
    if (!sessionJson) {
      return null;
    }
    return JSON.parse(sessionJson);
  } catch {
    return null;
  }
}

export function saveSession(session) {
  try {
    localStorage.setItem('writespace_session', JSON.stringify(session));
  } catch {
    // Silent fail
  }
}

export function clearSession() {
  try {
    localStorage.removeItem('writespace_session');
  } catch {
    // Silent fail
  }
}
