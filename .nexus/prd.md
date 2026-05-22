# WriteSpace

**Type**: web_app
**Audience**: Admin: Site owner managing all content and user accounts. User: Registered user who can write, edit, and delete their own blog posts, and read all posts.

## Business Context
A fully holistic, single-page blog application using Vite, React, and Tailwind CSS that includes a public-facing landing page, role-based authentication, and complete content + user management. Two roles are supported — Admin and user — with all data persisted in localStorage. No backend, no encryption, no external auth library. Deployable as a static site on Vercel.

## Functional Requirements

### FR-001 — Public Landing Page
The public face of the app at route `/`. Accessible without login. Includes a public navbar (logo, Login/Get Started buttons, or avatar chip if logged in), a full-viewport-height hero section with gradient background and CTA buttons, a features section with three colorful cards, a latest posts preview (up to 3 most recent posts from localStorage), and a footer with links.
**Priority**: must_have | **Complexity**: medium | **Source**: original_prd
**Acceptance Criteria**:
  - Public navbar shows 'WriteSpace' logo on left, 'Login' and 'Get Started' buttons on right for guests
  - If logged in, navbar shows avatar chip + display name + 'Go to Dashboard' button (Admin goes to `/admin`, user goes to `/blogs`)
  - Navbar is sticky with white background, subtle shadow, and bottom border
  - Hero section is full-viewport-height with gradient `from-indigo-600 via-violet-600 to-pink-500`
  - Hero displays app name in large bold white text + tagline 'Your thoughts. Your space. Beautifully simple.'
  - Two CTA buttons: 'Start Reading' (authenticated → `/blogs`, guests → `/login`) and 'Get Started Free' (→ `/register`)
  - CSS-only floating card animation hinting at blog UI (no JS animation libraries)
  - Features section has three cards in responsive row (1-col mobile, 3-col desktop): 'Write Freely', 'Private & Local', 'Instant & Fast'
  - Latest Posts Preview heading 'Latest from the Blog' shows up to 3 most recent posts from `writespace_posts` (title, excerpt, date)
  - Each preview card links to `/blog/:id`; unauthenticated clicks redirect to `/login`
  - If no posts: displays 'No posts yet — check back soon!'
  - Footer with links: Home, All Blogs, Login, Register; dark slate background with light text, copyright year

### FR-002 — Login Page
Entry point for all unauthenticated users at route `/login`. Form with Username and Password fields. Checks hard-coded admin first (`username === 'admin' && password === 'admin'`), then searches `writespace_users` array in localStorage. On success writes `writespace_session` to localStorage and redirects Admin to `/admin`, user to `/blogs`. On failure shows inline error. Already-authenticated users are redirected to their home.
**Priority**: must_have | **Complexity**: low | **Source**: original_prd
**Acceptance Criteria**:
  - Fields: Username (text), Password (password)
  - 'Login' primary button submits the form
  - 'Register' text link below routes to `/register`
  - On submit: checks hard-coded admin first (`username === 'admin' && password === 'admin'`)
  - Then searches `writespace_users` array in localStorage
  - On success: writes `writespace_session` to localStorage; redirects Admin to `/admin`, user to `/blogs`
  - On failure: shows inline error 'Invalid username or password.'
  - Already-authenticated users are redirected to their home
  - Full-viewport gradient background (`from-indigo-600 via-violet-600 to-pink-500`), centered white card with shadow, app logo at top

### FR-003 — Registration Page
Self-service sign-up page at route `/register`. All self-registered accounts are always `user` role. Fields: Display Name, Username, Password, Confirm Password. Validates all fields required, passwords match, username unique across `writespace_users` and hard-coded `admin`. On success saves to `writespace_users`, writes session, redirects to `/blogs`.
**Priority**: must_have | **Complexity**: low | **Source**: original_prd
**Acceptance Criteria**:
  - Fields: Display Name, Username, Password, Confirm Password
  - All fields required validation
  - Password and Confirm Password must match
  - Username must be unique across `writespace_users` and the hard-coded `admin`
  - On success: saves to `writespace_users`, writes session, redirects to `/blogs`
  - Link back to `/login`

### FR-004 — Authenticated Navbar
Persistent header on all authenticated pages (separate from public navbar). Left: Logo 'WriteSpace' links to `/`. Center/Right nav links by role (Admin: All Blogs, Write, Users; User: All Blogs, Write). Active link highlighted with indigo background, rounded pill style. Far right: circular avatar chip (role-based color) + display name + dropdown with Logout. Mobile hamburger toggle using React state. Logout clears `writespace_session` from localStorage, redirects to `/`.
**Priority**: must_have | **Complexity**: medium | **Source**: original_prd
**Acceptance Criteria**:
  - Left: Logo 'WriteSpace' links to `/`
  - Admin nav links: All Blogs, Write, Users
  - User nav links: All Blogs, Write
  - Active link highlighted with indigo background, rounded pill style
  - Far right: circular avatar chip (role-based color) + display name + dropdown with Logout
  - Mobile: hamburger toggle using React state (no library)
  - Logout: clears `writespace_session` from localStorage, redirects to `/`

### FR-005 — Avatar System
Role-distinct visual avatars defined as static JSX. No image uploads. Admin: Crown emoji avatar with `bg-violet-600` background. User: Book emoji avatar with `bg-indigo-500` background. Appears in Navbar chip, User Management table, blog post author line. Exported from `src/components/Avatar.jsx` as `getAvatar(role)` returning JSX.
**Priority**: must_have | **Complexity**: low | **Source**: original_prd
**Acceptance Criteria**:
  - Admin avatar: Crown emoji with `bg-violet-600` background
  - User avatar: Book emoji with `bg-indigo-500` background
  - Appears in: Navbar chip, User Management table, blog post author line
  - Exported from `src/components/Avatar.jsx` as `getAvatar(role)` returning JSX

### FR-006 — Blog List Page
Authenticated landing page at route `/blogs` showing all posts. Responsive grid (1-col mobile / 2-col tablet / 3-col desktop). Each card shows title, excerpt (first 120 chars), createdAt (formatted MMM DD, YYYY), author name + avatar. Colorful top border accent cycling from post index. Admin sees Edit icon on every card. User sees Edit icon only on own cards. Empty state with Write CTA. Posts sorted newest first.
**Priority**: must_have | **Complexity**: medium | **Source**: original_prd
**Acceptance Criteria**:
  - Responsive grid: 1 col mobile / 2 col tablet (`md:`) / 3 col desktop (`lg:`)
  - Each card: title, excerpt (first 120 chars), createdAt (formatted MMM DD, YYYY), author name + avatar
  - Colorful top border accent cycling from post index: indigo, violet, pink, teal
  - Clicking card navigates to `/blog/:id`
  - Admin sees pencil Edit icon button on every card
  - User sees pencil Edit icon button only on cards where `authorId` matches session `userId`
  - Empty state: 'No blogs yet. Be the first to write one!' with Write CTA button
  - Posts sorted newest first

### FR-007 — Write / Edit Blog Page
Form for creating or updating posts at routes `/write` and `/edit/:id`. All authenticated users (Admin and user) can create new posts. Editing restricted by ownership: users can only edit their own posts, Admin can edit any post. Fields: Title (text input, full-width), Content (textarea, min height 256px, full-width). Create mode generates UUID, sets createdAt + authorId + authorName from session. Edit mode pre-fills form and enforces ownership check. Validation with inline field-level errors. Character counter below Content textarea. Cancel button routes back.
**Priority**: must_have | **Complexity**: medium | **Source**: original_prd
**Acceptance Criteria**:
  - Guests (not logged in) redirected to `/login`
  - Fields: Title (text input, full-width), Content (textarea, min height 256px, full-width)
  - Create mode (`/write`): available to ALL authenticated users; generates UUID, sets `createdAt` + `authorId` + `authorName` from session, saves to `writespace_posts`, redirects to `/blog/:id`
  - Edit mode (`/edit/:id`): pre-fills form; ownership check — user can only edit posts where `authorId` matches session `userId`; Admin can edit any post
  - If user tries to edit another user's post, redirect to `/blogs`
  - Validation: both fields required; inline field-level error messages
  - Character counter below Content textarea
  - Cancel button (ghost style) routes back without saving

### FR-008 — Read Blog Page
Full reading view for a single post at route `/blog/:id`. Displays title (large heading), author avatar + display name (inline, small), createdAt date, full content (with `whitespace-pre-wrap` style). Admin sees Edit and Delete buttons on ALL posts. User sees Edit and Delete buttons ONLY on own posts (where `authorId` matches session `userId`); on others' posts, user sees only 'Back to All Posts' button. Delete uses `window.confirm(...)`, removes from `writespace_posts`, redirects to `/blogs`. Invalid/missing ID shows 'Post not found' with back link.
**Priority**: must_have | **Complexity**: medium | **Source**: original_prd
**Acceptance Criteria**:
  - Displays: title (large heading), author avatar + display name (inline, small), createdAt date, full content (with `whitespace-pre-wrap` style)
  - Admin sees Edit and Delete buttons on ALL posts (top-right of card)
  - User sees Edit and Delete buttons ONLY on own posts (where `authorId` matches session `userId`)
  - On other users' posts, user sees only 'Back to All Posts' button
  - Delete: `window.confirm(...)`, remove from `writespace_posts`, redirect to `/blogs`; ownership check applies
  - Invalid/missing ID: 'Post not found' message with back link

### FR-009 — Admin Dashboard
Admin-only overview page at route `/admin`. Non-admins redirected to `/blogs`. Four colorful stat cards: Total Posts, Total Users, Total Admins, Total Users. Quick-action buttons: 'Write New Post' and 'Manage Users'. Recent Posts section: 5 most recent posts with inline Edit/Delete controls. Gradient banner header: `from-violet-600 to-indigo-600`.
**Priority**: must_have | **Complexity**: medium | **Source**: original_prd
**Acceptance Criteria**:
  - Non-admins redirected to `/blogs`
  - Four colorful stat cards: Total Posts, Total Users, Total Admins, Total Users
  - Quick-action buttons: 'Write New Post' and 'Manage Users'
  - Recent Posts section: 5 most recent posts with inline Edit/Delete controls
  - Gradient banner header: `from-violet-600 to-indigo-600`

### FR-010 — User Management Panel
Admin-only page at route `/users` to create and delete user accounts. Non-admins redirected to `/blogs`. Responsive table (desktop) / stacked cards (mobile) with columns: avatar, display name, username, role badge pill, created date, Delete button. Create User form at top with fields: Display Name, Username, Password, Role (dropdown: Admin/User). All fields required; username must be unique. Delete with `window.confirm(...)`. Hard-coded `admin` Delete button permanently disabled with tooltip. Currently logged-in user cannot delete their own account.
**Priority**: must_have | **Complexity**: medium | **Source**: original_prd
**Acceptance Criteria**:
  - Non-admins redirected to `/blogs`
  - Responsive table (desktop) / stacked cards (mobile) with columns: avatar, display name, username, role badge pill, created date, Delete button
  - Create User form at top: Display Name, Username, Password, Role (dropdown: Admin/User)
  - All fields required; username must be unique
  - On save: add to `writespace_users` with UUID + timestamp
  - Delete: `window.confirm(...)` before removal
  - Hard-coded `admin` Delete button: permanently disabled + tooltip 'Default admin cannot be deleted.'
  - Currently logged-in user cannot delete their own account

## Non-Functional Requirements

### NFR-001 — Performance
Near-instant route transitions. Vite HMR during development. All localStorage reads in `try/catch` with `[]` fallback.
**Target**: < 200ms route transition time

### NFR-002 — Reliability
Graceful empty state if localStorage is unavailable or corrupted. Direct URL access works on Vercel via `vercel.json` rewrites.
**Target**: 100% of direct URLs resolve without 404 errors on Vercel

### NFR-003 — Simplicity
Shallow component tree. No over-engineering. Inline Tailwind utility classes only. No custom CSS beyond the `@tailwind` directives in `index.css`. Use JavaScript (JSX), NOT TypeScript. Do NOT create any `.ts` or `.tsx` files.
**Target**: Zero `.ts` or `.tsx` files in the project

### NFR-004 — Security (MVP)
Passwords stored in plain text — documented in code comments. Route guards are client-side only. Acceptable for a local MVP with no sensitive data. No real passwords should be stored.
**Target**: Plain text password storage documented with code comments

## Tech Stack
- **Frontend**: Vite + React 18+ (JavaScript JSX only, no TypeScript) with Tailwind CSS [Pipeline-aligned]
- **Backend**: None (all data persisted in localStorage) [Pipeline-aligned]
- **Database**: None (localStorage only) [Pipeline-aligned]
- **Infrastructure**: Vercel (static site deployment with SPA rewrites) [Pipeline-aligned]
- *Specified by user*: True

## In Scope
- Public landing page (no login required)
- Login and self-registration flows
- Role-aware redirects and route guards
- Avatar system (Admin vs User, role-distinct visuals)
- Authenticated blog list and full post reader
- Blog create for all authenticated users (Admin and user)
- Blog edit / delete with ownership rules (own posts for user, all posts for Admin)
- Admin dashboard with stats
- Admin user management (create / delete accounts)
- All data in localStorage (posts, users, session)
- Client-side routing via React Router v6
- Fully responsive Tailwind CSS UI
- vercel.json for SPA routing on Vercel

## Out of Scope
- Backend, REST API, or database
- Password hashing or encryption (plain text localStorage only)
- OAuth or third-party auth
- Rich text editor, image uploads
- Tags, categories, comments, likes
- Forgot password / email verification

## Assumptions
- Passwords stored in plain text is acceptable for MVP demo
- Client-side route guards provide sufficient security for this use case
- Users will not store real passwords
- Browser localStorage is reliable for data persistence
- Vercel will handle the build process automatically

## Constraints
- Must use Vite+React JS (JavaScript JSX only, NO TypeScript)
- All React components must use .jsx extension
- Tailwind CSS exclusively via utility classes - no custom CSS files beyond index.css
- No backend, no API calls, no encryption, no external auth library
- localStorage only for data persistence
- React Router v6 for routing
- useState + useEffect hooks only - no Redux, Zustand, Jotai, or Context API
- crypto.randomUUID() for all generated IDs
- Vercel deployment with SPA rewrites only (no extra keys in vercel.json)
- Exactly 1 epic with exactly 4 user stories

## Additional Context
## Storage Schema

All data stored in `localStorage`. No encryption. Plain text.

### `writespace_posts` — Array
```json
[
  {
    "id": "uuid-string",
    "title": "Post Title",
    "content": "Full post text...",
    "createdAt": "2026-03-04T12:00:00.000Z",
    "authorId": "uuid-or-hardcoded-admin",
    "authorName": "Admin"
  }
]
```

### `writespace_users` — Array
```json
[
  {
    "id": "uuid-string",
    "displayName": "Jane Doe",
    "username": "janedoe",
    "password": "plaintextpassword",
    "role": "user",
    "createdAt": "2026-03-04T12:00:00.000Z"
  }
]
```

### `writespace_session` — Object
```json
{
  "userId": "uuid-or-admin",
  "username": "admin",
  "displayName": "Admin",
  "role": "admin"
}
```

## Route Map & Access Control

| Route | Component | Admin | User | Guest |
|---|---|---|---|---|
| `/` | `LandingPage` | Yes (dashboard CTA) | Yes (dashboard CTA) | Yes |
| `/login` | `LoginPage` | Redirect to `/admin` | Redirect to `/blogs` | Yes |
| `/register` | `RegisterPage` | Redirect to `/admin` | Redirect to `/blogs` | Yes |
| `/blogs` | `Home` | Yes | Yes | Redirect to `/login` |
| `/blog/:id` | `ReadBlog` | Yes | Yes | Redirect to `/login` |
| `/write` | `WriteBlog` | Yes | Yes | Redirect to `/login` |
| `/edit/:id` | `WriteBlog` | Yes (any post) | Yes (own posts only) | Redirect to `/login` |
| `/admin` | `AdminDashboard` | Yes | Redirect to `/blogs` | Redirect to `/login` |
| `/users` | `UserManagement` | Yes | Redirect to `/blogs` | Redirect to `/login` |

## Project Structure

```
writespace/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── PublicNavbar.jsx
    │   ├── Navbar.jsx
    │   ├── ProtectedRoute.jsx
    │   ├── BlogCard.jsx
    │   ├── StatCard.jsx
    │   ├── UserRow.jsx
    │   └── Avatar.jsx
    ├── pages/
    │   ├── LandingPage.jsx
    │   ├── LoginPage.jsx
    │   ├── RegisterPage.jsx
    │   ├── Home.jsx
    │   ├── ReadBlog.jsx
    │   ├── WriteBlog.jsx
    │   ├── AdminDashboard.jsx
    │   └── UserManagement.jsx
    └── utils/
        ├── storage.js
        └── auth.js
```

## UI / Design System (Tailwind CSS)

### Color Palette
| Token | Tailwind Class | Usage |
|---|---|---|
| Indigo 600 | `bg-indigo-600` / `text-indigo-600` | Primary brand, buttons, links |
| Violet 600 | `bg-violet-600` / `text-violet-600` | Admin accent, admin avatar |
| Pink 500 | `bg-pink-500` | Card accents, gradient stops |
| Teal 500 | `bg-teal-500` | Card accents, stat cards |
| Slate 50 | `bg-slate-50` | App body background |
| White | `bg-white` | Content cards |
| Slate 800 | `text-slate-800` | Body text |
| Slate 500 | `text-slate-500` | Dates, metadata |
| Red 600 | `text-red-600 bg-red-50` | Destructive actions |

### Gradients
- Auth pages (Login / Register): `bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-500`
- Landing hero: same gradient
- Admin Dashboard header: `bg-gradient-to-r from-violet-600 to-indigo-600`
- Navbar: `bg-white shadow-sm border-b border-slate-100`

### Button System
| Type | Tailwind Classes |
|---|---|
| Primary (Save) | `bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none transition-all` |
| Secondary (Edit) | `bg-white text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none` |
| Destructive (Delete) | `bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg font-medium hover:bg-red-100 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none` |
| Ghost (Cancel) | `text-slate-500 px-4 py-2 rounded-lg font-medium hover:bg-slate-100 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:outline-none` |

### Role Badge Pills
Admin: `bg-violet-100 text-violet-700 ring-1 ring-violet-300 rounded-full px-3 py-0.5 text-sm font-medium`
User: `bg-indigo-100 text-indigo-700 ring-1 ring-indigo-300 rounded-full px-3 py-0.5 text-sm font-medium`

### Blog Card Accent Borders (deterministic by index)
- Index 0: `border-t-4 border-indigo-500`
- Index 1: `border-t-4 border-violet-500`
- Index 2: `border-t-4 border-pink-500`
- Index 3: `border-t-4 border-teal-500`
- Cycle repeats using `index % 4`.

### Responsive Breakpoints
| Breakpoint | Behavior |
|---|---|
| `< 640px` | Stacked layout, hamburger nav, single-col grid, table becomes stacked cards |
| `md: 768px+` | 2-col blog grid, side-by-side form buttons |
| `lg: 1024px+` | 3-col blog grid, `max-w-6xl mx-auto` containers |

## File Configurations

### `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### `postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### `vercel.json`
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>WriteSpace</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

## Epic & User Stories

### Epic: WriteSpace — Landing, Auth, Roles & Content Management
**Goal:** A fully holistic, role-aware blog app with a public landing page, complete authentication, blog CRUD for all authenticated users (with ownership-based access control), admin dashboard, and user management. No backend. No encryption. localStorage only.
**Constraints:** Exactly 1 epic. Exactly 4 user stories. Every route, component, and requirement maps to one story.