# WriteSpace Design Document

## 1. Tech Stack

- **Build Tool**: Vite ^5.0.0
- **UI Framework**: React ^18.2.0 with React DOM ^18.2.0
- **Routing**: React Router DOM ^6.20.0
- **Styling**: Tailwind CSS ^3.4.0 with PostCSS ^8.4.32 and Autoprefixer ^10.4.16
- **Language**: JavaScript JSX only — no TypeScript (.ts or .tsx) permitted
- **ID Generation**: `crypto.randomUUID()` — no `uuid` package
- **State Management**: React hooks only (useState, useEffect) — no Redux, Zustand, or Context API
- **Deployment**: Static site on Vercel with SPA rewrites via `vercel.json`

## 2. Coding Conventions

### File & Directory Naming
- **Pages**: PascalCase, e.g. `LandingPage.jsx`, `LoginPage.jsx`, `Home.jsx`, `ReadBlog.jsx`, `WriteBlog.jsx`, `AdminDashboard.jsx`, `UserManagement.jsx`
- **Components**: PascalCase, e.g. `PublicNavbar.jsx`, `Navbar.jsx`, `ProtectedRoute.jsx`, `BlogCard.jsx`, `StatCard.jsx`, `UserRow.jsx`, `Avatar.jsx`
- **Utilities**: camelCase, e.g. `storage.js`, `auth.js`
- **Entry files**: lowercase, e.g. `main.jsx`, `index.css`
- **Directory structure**: `src/pages/`, `src/components/`, `src/utils/`

### Import Ordering and Groupings
1. React and React Router imports
2. Third-party library imports (none expected beyond React ecosystem)
3. Local component imports from `src/components/`
4. Local page imports from `src/pages/`
5. Local utility imports from `src/utils/`
6. CSS imports (only `index.css` in `main.jsx`)

Each group separated by a blank line. No wildcard imports.

### Exports
- **Components**: Default export for every component file
- **Utilities**: Named exports only — no default exports in `src/utils/`
- **Avatar**: Named export `getAvatar(role)` returning JSX — not a component

### Typing Rules
- **No TypeScript** — plain JavaScript JSX only
- **No JSDoc type annotations** — keep code clean of type documentation
- Use descriptive variable names to convey types (e.g. `postId`, `userRole`, `sessionData`)

### Error Handling Pattern
- **localStorage operations**: Every read wrapped in `try/catch` with fallback values (`[]` for arrays, `null` for session)
- **Form validation**: Inline field-level errors stored in component state, displayed below each field
- **Authentication failures**: Return error strings from `auth.js` functions, display inline in forms
- **No throw statements** in application code — errors are caught and handled gracefully
- **No console.log** in production code — use only for development debugging

## 3. UI / Design System

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| `primary-gradient` | `from-indigo-600 via-violet-600 to-pink-500` | Hero section, login/register page backgrounds |
| `admin-avatar-bg` | `bg-violet-600` | Admin avatar chip background |
| `user-avatar-bg` | `bg-indigo-500` | User avatar chip background |
| `active-nav-bg` | `bg-indigo-600` | Active nav link pill background |
| `card-accent-1` | `border-indigo-500` | Blog card top border (index % 4 === 0) |
| `card-accent-2` | `border-violet-500` | Blog card top border (index % 4 === 1) |
| `card-accent-3` | `border-pink-500` | Blog card top border (index % 4 === 2) |
| `card-accent-4` | `border-teal-500` | Blog card top border (index % 4 === 3) |
| `footer-bg` | `bg-slate-800` | Footer background |
| `footer-text` | `text-slate-300` | Footer text color |

### Spacing Scale
- Use Tailwind's default spacing scale exclusively
- Common values: `p-4`, `p-6`, `p-8`, `gap-4`, `gap-6`, `space-y-4`, `space-y-6`
- No custom spacing values

### Typography
- No custom fonts — use Tailwind's default font family
- Heading sizes: `text-4xl` (hero title), `text-2xl` (section headings), `text-xl` (card titles)
- Body text: `text-base` for content, `text-sm` for metadata and secondary text
- All text left-aligned unless center-aligned for hero sections

### Component Primitives
- **Cards**: White background (`bg-white`), rounded corners (`rounded-lg` or `rounded-xl`), shadow (`shadow-md` or `shadow-lg`), padding (`p-4` or `p-6`)
- **Buttons**: Rounded (`rounded-lg` or `rounded-md`), padding (`px-4 py-2`), transition (`transition-colors`), hover state (`hover:bg-opacity-90`)
- **Forms**: White card on gradient background, centered, with shadow
- **Navbar**: Sticky (`sticky top-0`), white background, shadow (`shadow-sm`), bottom border (`border-b`)

## 4. State Management

- **No external state management library** — React hooks only
- **Component-level state**: `useState` for form inputs, UI toggles (mobile menu), validation errors
- **Side effects**: `useEffect` for data loading on mount, session checks
- **Global state**: None — all shared data read directly from localStorage via `storage.js` utilities
- **Persistence**: All writes to localStorage are immediate and synchronous — no debouncing or batching
- **Session**: Read from `writespace_session` on every protected route render via `auth.getCurrentUser()`

## 5. API Contracts

### localStorage Keys

| Key | Type | Description |
|---|---|---|
| `writespace_posts` | `Array<Post>` | All blog posts |
| `writespace_users` | `Array<User>` | All registered users (excluding hard-coded admin) |
| `writespace_session` | `Session \| null` | Current authenticated session |

### Data Schemas

**Post Object:**
```
{
  id: string,           // UUID via crypto.randomUUID()
  title: string,        // Post title
  content: string,      // Post content (plain text)
  createdAt: string,    // ISO 8601 timestamp
  authorId: string,     // UUID of author
  authorName: string    // Display name of author
}
```

**User Object:**
```
{
  id: string,           // UUID via crypto.randomUUID()
  displayName: string,  // Display name
  username: string,     // Unique username
  password: string,     // Plain text password (MVP limitation)
  role: 'admin' | 'user',
  createdAt: string     // ISO 8601 timestamp
}
```

**Session Object:**
```
{
  userId: string,       // UUID of authenticated user
  username: string,     // Username
  displayName: string,  // Display name
  role: 'admin' | 'user'
}
```

### Storage Utility Functions

| Function | Signature | Description |
|---|---|---|
| `getPosts()` | `() => Array<Post>` | Returns `[]` on error |
| `savePosts(posts)` | `(Array<Post>) => void` | Throws on quota exceeded |
| `getUsers()` | `() => Array<User>` | Returns `[]` on error |
| `saveUsers(users)` | `(Array<User>) => void` | Throws on quota exceeded |
| `getSession()` | `() => Session \| null` | Returns `null` on error or missing |
| `saveSession(session)` | `(Session) => void` | Throws on quota exceeded |
| `clearSession()` | `() => void` | Removes `writespace_session` from localStorage |

### Auth Utility Functions

| Function | Signature | Description |
|---|---|---|
| `login(username, password)` | `(string, string) => { success: boolean, error?: string, session?: Session }` | Validates credentials, returns session on success |
| `register(displayName, username, password)` | `(string, string, string) => { success: boolean, error?: string, session?: Session }` | Creates user, returns session on success |
| `logout()` | `() => void` | Calls `clearSession()` |
| `getCurrentUser()` | `() => Session \| null` | Returns parsed session or null |
| `isAuthenticated()` | `() => boolean` | Returns `getCurrentUser() !== null` |
| `isAdmin()` | `() => boolean` | Returns `getCurrentUser()?.role === 'admin'` |

### Route Guards
- `ProtectedRoute` component checks `auth.isAuthenticated()` — redirects to `/login` if not
- Role-specific routes check `auth.isAdmin()` — non-admins redirected to `/blogs`
- Ownership checks in `WriteBlog` (edit mode) and `ReadBlog` compare `session.userId` with `post.authorId`

## 6. Testing Strategy

- **No testing framework** — this MVP does not include unit, integration, or E2E tests
- Manual testing via browser interaction against acceptance criteria
- Test localStorage behavior by clearing storage, corrupting data, and verifying graceful fallbacks
- Test responsive design by resizing browser window to mobile (<640px), tablet (768px+), and desktop (1024px+) breakpoints

## 7. Anti-patterns

1. **Do NOT create separate CSS files per component** — all styling must use Tailwind utility classes in `className` attributes. No CSS modules, no styled-components, no inline styles. Only `src/index.css` with Tailwind directives is permitted.

2. **Do NOT use any external state management library** — no Redux, Zustand, Context API, or any other state management. All state must be local React hooks (`useState`, `useEffect`) or read directly from localStorage.

3. **Do NOT make any network requests or API calls** — the application is zero-backend. No `fetch()`, no `axios`, no WebSocket connections. All data operations are synchronous localStorage reads/writes.

4. **Do NOT use TypeScript or any type system** — all files must be `.jsx` or `.js`. No `.ts` or `.tsx` files. No JSDoc type annotations. The PRD explicitly requires JavaScript only.

5. **Do NOT use `uuid` or any external ID generation library** — use `crypto.randomUUID()` which is available in all modern browsers. No additional dependencies for UUID generation.