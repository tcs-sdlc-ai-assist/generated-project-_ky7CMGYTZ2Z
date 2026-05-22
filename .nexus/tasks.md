# Implementation Tasks

<!-- nexus-tasks-version: 1 -->

## TASK-001 — Project scaffolding and configuration

```nexus-task
{
  "task_id": "TASK-001",
  "title": "Project scaffolding and configuration",
  "status": "done",
  "depends_on": [],
  "target_files": [
    "package.json",
    "vite.config.js",
    "tailwind.config.js",
    "postcss.config.js",
    "index.html",
    "src/main.jsx",
    "src/index.css"
  ],
  "estimated_complexity": 2,
  "assigned_worker_type": "execution",
  "completion_summary": "Created package.json, vite.config.js, tailwind.config.js, postcss.config.js, index.html, src/main.jsx, src/index.css"
}
```

**Description:** Initialize the Vite + React project with package.json, vite.config.js, tailwind.config.js, postcss.config.js, index.html, and src/main.jsx entry point. Install all dependencies (react, react-dom, react-router-dom, vite, @vitejs/plugin-react, tailwindcss, autoprefixer, postcss). Configure Tailwind content paths and Vite React plugin.

**Acceptance:**
- [x] package.json lists all required dependencies with correct versions
- [x] vite.config.js uses @vitejs/plugin-react
- [x] tailwind.config.js scans src/**/*.{js,jsx} for class usage
- [x] postcss.config.js registers tailwindcss and autoprefixer
- [x] index.html has root div with id='root' and links to /src/main.jsx
- [x] src/main.jsx renders <App /> inside BrowserRouter
- [x] src/index.css contains @tailwind base/components/utilities directives

**Completion notes:** Created package.json, vite.config.js, tailwind.config.js, postcss.config.js, index.html, src/main.jsx, src/index.css

---

## TASK-002 — Storage utility (src/utils/storage.js)

```nexus-task
{
  "task_id": "TASK-002",
  "title": "Storage utility (src/utils/storage.js)",
  "status": "done",
  "depends_on": [
    "TASK-001"
  ],
  "target_files": [
    "src/utils/storage.js"
  ],
  "estimated_complexity": 2,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/utils/storage.js with getPosts, savePosts, getUsers, saveUsers, getSession, saveSession, clearSession"
}
```

**Description:** Create the localStorage utility module with getPosts, savePosts, getUsers, saveUsers, getSession, saveSession, clearSession. All reads wrapped in try/catch with fallback values. Include SECURITY NOTE comment about plain text passwords.

**Acceptance:**
- [x] getPosts() returns array from writespace_posts key, [] on error
- [x] savePosts(posts) writes JSON to writespace_posts
- [x] getUsers() returns array from writespace_users key, [] on error
- [x] saveUsers(users) writes JSON to writespace_users
- [x] getSession() returns parsed session or null on error/missing
- [x] saveSession(session) writes JSON to writespace_session
- [x] clearSession() removes writespace_session key
- [x] All functions use try/catch with fallback values
- [x] File contains SECURITY NOTE comment about plain text passwords

**Completion notes:** Created src/utils/storage.js with getPosts, savePosts, getUsers, saveUsers, getSession, saveSession, clearSession

---

## TASK-003 — Auth utility (src/utils/auth.js)

```nexus-task
{
  "task_id": "TASK-003",
  "title": "Auth utility (src/utils/auth.js)",
  "status": "done",
  "depends_on": [
    "TASK-002"
  ],
  "target_files": [
    "src/utils/auth.js"
  ],
  "estimated_complexity": 2,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/utils/auth.js with login, register, logout, getCurrentUser, isAuthenticated, isAdmin"
}
```

**Description:** Create the authentication utility with login(), register(), logout(), getCurrentUser(), isAuthenticated(), isAdmin(). login() checks hard-coded admin first, then searches writespace_users. register() validates unique username and saves new user. logout() clears session.

**Acceptance:**
- [x] login('admin','admin') returns admin session object
- [x] login(username,password) searches writespace_users and returns session on match
- [x] login() returns null on invalid credentials
- [x] register() validates all fields required, passwords match, username unique
- [x] register() saves user with role='user' and writes session
- [x] register() returns session object on success
- [x] logout() calls clearSession()
- [x] getCurrentUser() returns session from storage
- [x] isAuthenticated() returns true if session exists
- [x] isAdmin() returns true if session.role === 'admin'

**Completion notes:** Created src/utils/auth.js with login, register, logout, getCurrentUser, isAuthenticated, isAdmin

---

## TASK-004 — Avatar component (src/components/Avatar.jsx)

```nexus-task
{
  "task_id": "TASK-004",
  "title": "Avatar component (src/components/Avatar.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-001"
  ],
  "target_files": [
    "src/components/Avatar.jsx"
  ],
  "estimated_complexity": 1,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/components/Avatar.jsx with getAvatar(role) named export"
}
```

**Description:** Create getAvatar(role) function that returns JSX. Admin: Crown emoji with bg-violet-600. User: Book emoji with bg-indigo-500. Both have rounded-full, w-8 h-8, flex items-center justify-center, text-white.

**Acceptance:**
- [x] getAvatar('admin') returns JSX with Crown emoji and bg-violet-600
- [x] getAvatar('user') returns JSX with Book emoji and bg-indigo-500
- [x] Both avatars have rounded-full, w-8 h-8, flex, items-center, justify-center, text-white classes
- [x] Function is exported as named export

**Completion notes:** Created src/components/Avatar.jsx with getAvatar(role) named export

---

## TASK-005 — PublicNavbar component (src/components/PublicNavbar.jsx)

```nexus-task
{
  "task_id": "TASK-005",
  "title": "PublicNavbar component (src/components/PublicNavbar.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-001",
    "TASK-003",
    "TASK-004"
  ],
  "target_files": [
    "src/components/PublicNavbar.jsx"
  ],
  "estimated_complexity": 2,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/components/PublicNavbar.jsx with guest/logged-in views, sticky positioning"
}
```

**Description:** Create the public navbar for unauthenticated users. Shows 'WriteSpace' logo on left, 'Login' and 'Get Started' buttons on right. If logged in (session exists), shows avatar chip + display name + 'Go to Dashboard' button. Sticky with white background, shadow, bottom border.

**Acceptance:**
- [x] Shows 'WriteSpace' logo linking to /
- [x] Guest view: 'Login' button links to /login, 'Get Started' links to /register
- [x] Logged-in view: avatar chip + display name + 'Go to Dashboard' button
- [x] Admin dashboard link goes to /admin, user dashboard goes to /blogs
- [x] Sticky positioning with white background, shadow-sm, border-b

**Completion notes:** Created src/components/PublicNavbar.jsx with guest/logged-in views, sticky positioning

---

## TASK-006 — ProtectedRoute component (src/components/ProtectedRoute.jsx)

```nexus-task
{
  "task_id": "TASK-006",
  "title": "ProtectedRoute component (src/components/ProtectedRoute.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-003"
  ],
  "target_files": [
    "src/components/ProtectedRoute.jsx"
  ],
  "estimated_complexity": 1,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/components/ProtectedRoute.jsx with auth and admin role guards"
}
```

**Description:** Create route guard component that checks auth.isAuthenticated(). If not authenticated, redirects to /login. If requiresAdmin prop is true and user is not admin, redirects user to /blogs. Otherwise renders children.

**Acceptance:**
- [x] Redirects to /login if not authenticated
- [x] If requiresAdmin=true and user role is 'user', redirects to /blogs
- [x] If authenticated and role matches, renders children
- [x] Uses <Navigate> from react-router-dom for redirects

**Completion notes:** Created src/components/ProtectedRoute.jsx with auth and admin role guards

---

## TASK-007 — Authenticated Navbar (src/components/Navbar.jsx)

```nexus-task
{
  "task_id": "TASK-007",
  "title": "Authenticated Navbar (src/components/Navbar.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-001",
    "TASK-003",
    "TASK-004"
  ],
  "target_files": [
    "src/components/Navbar.jsx"
  ],
  "estimated_complexity": 3,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/components/Navbar.jsx with role-based nav links, active state, dropdown logout, mobile hamburger"
}
```

**Description:** Create the authenticated navbar. Left: 'WriteSpace' logo links to /. Center nav links by role (Admin: All Blogs, Write, Users; User: All Blogs, Write). Active link highlighted with indigo background rounded pill. Far right: circular avatar chip + display name + dropdown with Logout. Mobile hamburger toggle. Logout clears session and redirects to /.

**Acceptance:**
- [x] Logo 'WriteSpace' links to /
- [x] Admin sees nav links: All Blogs, Write, Users
- [x] User sees nav links: All Blogs, Write
- [x] Active link has bg-indigo-600 text-white rounded-full
- [x] Far right: avatar chip + display name + dropdown with Logout
- [x] Mobile hamburger toggle shows/hides nav links
- [x] Logout clears session and redirects to /

**Completion notes:** Created src/components/Navbar.jsx with role-based nav links, active state, dropdown logout, mobile hamburger

---

## TASK-008 — LandingPage (src/pages/LandingPage.jsx)

```nexus-task
{
  "task_id": "TASK-008",
  "title": "LandingPage (src/pages/LandingPage.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-001",
    "TASK-002",
    "TASK-004",
    "TASK-005"
  ],
  "target_files": [
    "src/pages/LandingPage.jsx"
  ],
  "estimated_complexity": 4,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/pages/LandingPage.jsx with hero, features, latest posts preview, footer, CSS floating animation"
}
```

**Description:** Create the public landing page at route /. Full-viewport-height hero with gradient from-indigo-600 via-violet-600 to-pink-500, app name, tagline, CTA buttons. CSS-only floating card animation. Features section with 3 cards. Latest posts preview (up to 3 from localStorage). Footer with links.

**Acceptance:**
- [x] Hero is full-viewport-height with gradient from-indigo-600 via-violet-600 to-pink-500
- [x] Hero shows app name in large bold white text + tagline
- [x] Two CTA buttons: 'Start Reading' and 'Get Started Free' with correct redirects
- [x] CSS-only floating card animation present
- [x] Features section has 3 cards: 'Write Freely', 'Private & Local', 'Instant & Fast'
- [x] Latest Posts Preview shows up to 3 most recent posts from writespace_posts
- [x] Each preview card shows title, excerpt (120 chars), date, author
- [x] Preview cards link to /blog/:id; unauthenticated clicks redirect to /login
- [x] If no posts: displays 'No posts yet — check back soon!'
- [x] Footer with links: Home, All Blogs, Login, Register; dark slate background

**Completion notes:** Created src/pages/LandingPage.jsx with hero, features, latest posts preview, footer, CSS floating animation

---

## TASK-009 — LoginPage (src/pages/LoginPage.jsx)

```nexus-task
{
  "task_id": "TASK-009",
  "title": "LoginPage (src/pages/LoginPage.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-001",
    "TASK-002",
    "TASK-003"
  ],
  "target_files": [
    "src/pages/LoginPage.jsx"
  ],
  "estimated_complexity": 2,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/pages/LoginPage.jsx with form, validation, redirects, gradient background"
}
```

**Description:** Create the login page at /login. Form with Username and Password fields. Checks hard-coded admin first, then localStorage users. On success writes session and redirects Admin to /admin, user to /blogs. On failure shows inline error. Already-authenticated users redirected to their home. Full-viewport gradient background with centered white card.

**Acceptance:**
- [x] Fields: Username (text), Password (password)
- [x] 'Login' primary button submits form
- [x] 'Register' text link below routes to /register
- [x] On submit: checks hard-coded admin first, then localStorage users
- [x] On success: writes session, redirects Admin to /admin, user to /blogs
- [x] On failure: shows 'Invalid username or password.'
- [x] Already-authenticated users redirected to their home
- [x] Full-viewport gradient background, centered white card with shadow

**Completion notes:** Created src/pages/LoginPage.jsx with form, validation, redirects, gradient background

---

## TASK-010 — RegisterPage (src/pages/RegisterPage.jsx)

```nexus-task
{
  "task_id": "TASK-010",
  "title": "RegisterPage (src/pages/RegisterPage.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-001",
    "TASK-002",
    "TASK-003"
  ],
  "target_files": [
    "src/pages/RegisterPage.jsx"
  ],
  "estimated_complexity": 2,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/pages/RegisterPage.jsx with form, validation, unique username check, gradient background"
}
```

**Description:** Create the registration page at /register. Fields: Display Name, Username, Password, Confirm Password. Validates all fields required, passwords match, username unique. On success saves to writespace_users, writes session, redirects to /blogs. Link back to /login.

**Acceptance:**
- [x] Fields: Display Name, Username, Password, Confirm Password
- [x] All fields required validation with inline errors
- [x] Password and Confirm Password must match
- [x] Username must be unique across writespace_users and hard-coded admin
- [x] On success: saves to writespace_users, writes session, redirects to /blogs
- [x] Link back to /login

**Completion notes:** Created src/pages/RegisterPage.jsx with form, validation, unique username check, gradient background

---

## TASK-011 — BlogCard component (src/components/BlogCard.jsx)

```nexus-task
{
  "task_id": "TASK-011",
  "title": "BlogCard component (src/components/BlogCard.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-001",
    "TASK-004"
  ],
  "target_files": [
    "src/components/BlogCard.jsx"
  ],
  "estimated_complexity": 2,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/components/BlogCard.jsx with title, excerpt, date, author, border accent cycling, edit icon"
}
```

**Description:** Create the blog post preview card component. Shows title, excerpt (first 120 chars), createdAt (formatted MMM DD, YYYY), author name + avatar. Colorful top border accent cycling from index. Optional edit icon button. Clicking card navigates to /blog/:id.

**Acceptance:**
- [x] Shows title, excerpt (first 120 chars), formatted date (MMM DD, YYYY)
- [x] Shows author name + avatar
- [x] Top border accent cycles: indigo, violet, pink, teal based on index
- [x] Clicking card navigates to /blog/:id
- [x] Optional edit icon button (pencil) shown when showEdit prop is true
- [x] Card has hover effect and cursor-pointer

**Completion notes:** Created src/components/BlogCard.jsx with title, excerpt, date, author, border accent cycling, edit icon

---

## TASK-012 — Home page - Blog List (src/pages/Home.jsx)

```nexus-task
{
  "task_id": "TASK-012",
  "title": "Home page - Blog List (src/pages/Home.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-001",
    "TASK-002",
    "TASK-003",
    "TASK-011"
  ],
  "target_files": [
    "src/pages/Home.jsx"
  ],
  "estimated_complexity": 3,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/pages/Home.jsx with responsive blog grid, ownership-based edit icons, empty state"
}
```

**Description:** Create the authenticated blog list page at /blogs. Responsive grid (1-col mobile, 2-col tablet, 3-col desktop). Each card shows title, excerpt, date, author. Admin sees Edit icon on every card. User sees Edit icon only on own cards. Empty state with Write CTA. Posts sorted newest first.

**Acceptance:**
- [x] Responsive grid: 1 col mobile, 2 col md, 3 col lg
- [x] Each card shows title, excerpt (120 chars), formatted date, author avatar+name
- [x] Colorful top border accent cycling from post index
- [x] Admin sees pencil Edit icon on every card
- [x] User sees pencil Edit icon only on cards where authorId matches session userId
- [x] Clicking card navigates to /blog/:id
- [x] Empty state: 'No blogs yet. Be the first to write one!' with Write CTA
- [x] Posts sorted newest first by createdAt

**Completion notes:** Created src/pages/Home.jsx with responsive blog grid, ownership-based edit icons, empty state

---

## TASK-013 — ReadBlog page (src/pages/ReadBlog.jsx)

```nexus-task
{
  "task_id": "TASK-013",
  "title": "ReadBlog page (src/pages/ReadBlog.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-001",
    "TASK-002",
    "TASK-003",
    "TASK-004"
  ],
  "target_files": [
    "src/pages/ReadBlog.jsx"
  ],
  "estimated_complexity": 3,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/pages/ReadBlog.jsx with post view, ownership-based edit/delete, not-found handling"
}
```

**Description:** Create the single blog post view at /blog/:id. Reads post from localStorage by id. Shows title, author avatar + display name, createdAt date, full content. Ownership-based Edit/Delete buttons. If post not found, shows 'Post not found' with back link. Delete uses window.confirm and redirects to /blogs.

**Acceptance:**
- [x] Reads post by id from useParams
- [x] Shows title, author avatar + display name, formatted createdAt, full content
- [x] User sees Edit button only if authorId matches session userId
- [x] Admin sees Edit button on every post
- [x] User sees Delete button only if authorId matches session userId
- [x] Admin sees Delete button on every post
- [x] Delete uses window.confirm, removes post, redirects to /blogs
- [x] If post not found: shows 'Post not found' with back link to /blogs

**Completion notes:** Created src/pages/ReadBlog.jsx with post view, ownership-based edit/delete, not-found handling

---

## TASK-014 — WriteBlog page (src/pages/WriteBlog.jsx)

```nexus-task
{
  "task_id": "TASK-014",
  "title": "WriteBlog page (src/pages/WriteBlog.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-001",
    "TASK-002",
    "TASK-003"
  ],
  "target_files": [
    "src/pages/WriteBlog.jsx"
  ],
  "estimated_complexity": 3,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/pages/WriteBlog.jsx with create/edit modes, ownership check, validation, character counter"
}
```

**Description:** Create the write/edit blog form at /write and /edit/:id. Detects edit mode from useParams. Create mode generates UUID, sets createdAt, authorId, authorName from session. Edit mode pre-fills form and enforces ownership check (non-admin non-owner redirected). Fields: Title (full-width), Content (textarea min-h-64). Validation with inline errors. Character counter below Content. Cancel button routes back.

**Acceptance:**
- [x] Route /write shows empty form for creating new post
- [x] Route /edit/:id pre-fills form with existing post data
- [x] Edit mode enforces ownership: non-admin non-owner redirected to /blogs
- [x] Fields: Title (text, full-width), Content (textarea, min-h-64)
- [x] Validation: both fields required with inline errors
- [x] Character counter below Content textarea showing current count
- [x] Create mode generates UUID via crypto.randomUUID()
- [x] Create mode sets createdAt, authorId, authorName from session
- [x] Cancel button routes back to previous page or /blogs
- [x] On submit: saves post and redirects to /blog/:id

**Completion notes:** Created src/pages/WriteBlog.jsx with create/edit modes, ownership check, validation, character counter

---

## TASK-015 — StatCard component (src/components/StatCard.jsx)

```nexus-task
{
  "task_id": "TASK-015",
  "title": "StatCard component (src/components/StatCard.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-001"
  ],
  "target_files": [
    "src/components/StatCard.jsx"
  ],
  "estimated_complexity": 1,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/components/StatCard.jsx presentational component"
}
```

**Description:** Create a presentational stat card for the admin dashboard. Props: icon (emoji string), label (string), count (number). Renders a card with icon, label text, and large count number. Used in AdminDashboard.

**Acceptance:**
- [x] Accepts icon, label, count props
- [x] Renders icon at top, label text below, large count number
- [x] Card has white background, shadow, rounded-lg, padding

**Completion notes:** Created src/components/StatCard.jsx presentational component

---

## TASK-016 — UserRow component (src/components/UserRow.jsx)

```nexus-task
{
  "task_id": "TASK-016",
  "title": "UserRow component (src/components/UserRow.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-001",
    "TASK-004"
  ],
  "target_files": [
    "src/components/UserRow.jsx"
  ],
  "estimated_complexity": 2,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/components/UserRow.jsx with responsive table row / mobile card, delete button with protections"
}
```

**Description:** Create a user table row component. Shows avatar, displayName, username, role badge, createdAt date, and delete button. Delete button disabled for hard-coded admin and currently logged-in user. Used in UserManagement.

**Acceptance:**
- [x] Shows avatar, displayName, username, role badge, createdAt date
- [x] Delete button present
- [x] Delete button disabled with tooltip for hard-coded admin user
- [x] Delete button disabled for currently logged-in user
- [x] On desktop: rendered as table row. On mobile: rendered as stacked card

**Completion notes:** Created src/components/UserRow.jsx with responsive table row / mobile card, delete button with protections

---

## TASK-017 — AdminDashboard page (src/pages/AdminDashboard.jsx)

```nexus-task
{
  "task_id": "TASK-017",
  "title": "AdminDashboard page (src/pages/AdminDashboard.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-001",
    "TASK-002",
    "TASK-003",
    "TASK-015",
    "TASK-004"
  ],
  "target_files": [
    "src/pages/AdminDashboard.jsx"
  ],
  "estimated_complexity": 3,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/pages/AdminDashboard.jsx with stat cards, quick actions, recent posts with edit/delete"
}
```

**Description:** Create the admin dashboard at /admin. Shows four StatCards: Total Posts, Total Users, Total Admins, Total Users (duplicate intentional? Actually: Total Posts, Total Users, Total Admins, Total Users - follow PRD). Quick action buttons (Write New Post, Manage Users, View All Blogs). Recent posts section (5 most recent) with inline Edit/Delete controls.

**Acceptance:**
- [x] Four StatCards: Total Posts, Total Users, Total Admins, Total Users with correct counts
- [x] Quick action buttons: Write New Post (/write), Manage Users (/users), View All Blogs (/blogs)
- [x] Recent posts section shows 5 most recent posts with title, author, date
- [x] Each recent post has inline Edit and Delete buttons
- [x] Delete uses window.confirm and refreshes list
- [x] Protected by ProtectedRoute with requiresAdmin=true

**Completion notes:** Created src/pages/AdminDashboard.jsx with stat cards, quick actions, recent posts with edit/delete

---

## TASK-018 — UserManagement page (src/pages/UserManagement.jsx)

```nexus-task
{
  "task_id": "TASK-018",
  "title": "UserManagement page (src/pages/UserManagement.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-001",
    "TASK-002",
    "TASK-003",
    "TASK-016"
  ],
  "target_files": [
    "src/pages/UserManagement.jsx"
  ],
  "estimated_complexity": 3,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/pages/UserManagement.jsx with create form, responsive user list, delete protections"
}
```

**Description:** Create the user management page at /users. Create User form at top with Display Name, Username, Password fields. Validates all fields required, username unique. On save generates UUID, adds to users array. Responsive table (desktop) / stacked cards (mobile) showing all users. Delete button with window.confirm. Hard-coded admin delete button disabled. Currently logged-in user cannot delete own account.

**Acceptance:**
- [x] Create User form with Display Name, Username, Password fields
- [x] All fields required validation with inline errors
- [x] Username unique validation
- [x] On save: generates UUID, adds to users array, saves to localStorage
- [x] Responsive: table on desktop, stacked cards on mobile
- [x] Each user row shows avatar, displayName, username, role, createdAt, delete button
- [x] Hard-coded admin delete button disabled with tooltip
- [x] Currently logged-in user delete button disabled
- [x] Delete uses window.confirm before removing
- [x] Protected by ProtectedRoute with requiresAdmin=true

**Completion notes:** Created src/pages/UserManagement.jsx with create form, responsive user list, delete protections

---

## TASK-019 — App.jsx with routing (src/App.jsx)

```nexus-task
{
  "task_id": "TASK-019",
  "title": "App.jsx with routing (src/App.jsx)",
  "status": "done",
  "depends_on": [
    "TASK-001",
    "TASK-005",
    "TASK-007",
    "TASK-006",
    "TASK-008",
    "TASK-009",
    "TASK-010",
    "TASK-012",
    "TASK-013",
    "TASK-014",
    "TASK-017",
    "TASK-018"
  ],
  "target_files": [
    "src/App.jsx"
  ],
  "estimated_complexity": 3,
  "assigned_worker_type": "execution",
  "completion_summary": "Created src/App.jsx with all routes, PublicNavbar/Navbar layout, ProtectedRoute wrappers"
}
```

**Description:** Create the main App component with BrowserRouter and all route definitions. Public routes: / (LandingPage), /login (LoginPage), /register (RegisterPage). Protected routes wrapped in ProtectedRoute: /blogs (Home), /blog/:id (ReadBlog), /write (WriteBlog), /edit/:id (WriteBlog), /admin (AdminDashboard), /users (UserManagement). Admin routes require admin role. Layout includes PublicNavbar on public routes and Navbar on authenticated routes.

**Acceptance:**
- [x] Route / renders LandingPage with PublicNavbar
- [x] Route /login renders LoginPage with PublicNavbar
- [x] Route /register renders RegisterPage with PublicNavbar
- [x] Route /blogs renders Home with Navbar, wrapped in ProtectedRoute
- [x] Route /blog/:id renders ReadBlog with Navbar, wrapped in ProtectedRoute
- [x] Route /write renders WriteBlog with Navbar, wrapped in ProtectedRoute
- [x] Route /edit/:id renders WriteBlog with Navbar, wrapped in ProtectedRoute
- [x] Route /admin renders AdminDashboard with Navbar, wrapped in ProtectedRoute with requiresAdmin
- [x] Route /users renders UserManagement with Navbar, wrapped in ProtectedRoute with requiresAdmin
- [x] All routes use React Router v6 Route components

**Completion notes:** Created src/App.jsx with all routes, PublicNavbar/Navbar layout, ProtectedRoute wrappers

---

## TASK-020 — Vercel deployment config (vercel.json)

```nexus-task
{
  "task_id": "TASK-020",
  "title": "Vercel deployment config (vercel.json)",
  "status": "done",
  "depends_on": [
    "TASK-001"
  ],
  "target_files": [
    "vercel.json"
  ],
  "estimated_complexity": 1,
  "assigned_worker_type": "execution",
  "completion_summary": "Created vercel.json with SPA rewrite rule"
}
```

**Description:** Create Vercel configuration file for static site deployment with SPA rewrites. All routes rewrite to index.html.

**Acceptance:**
- [x] vercel.json contains rewrites array with source '/(.*)' and destination '/index.html'
- [x] JSON is valid and parseable

**Completion notes:** Created vercel.json with SPA rewrite rule

---
