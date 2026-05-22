import { getAvatar } from './Avatar.jsx';

export default function UserRow({ user, currentUserId, onDelete }) {
  const isHardcodedAdmin = user.username === 'admin';
  const isCurrentUser = user.id === currentUserId;
  const isDeleteDisabled = isHardcodedAdmin || isCurrentUser;

  let deleteTitle = '';
  if (isHardcodedAdmin) {
    deleteTitle = 'Cannot delete the hard-coded admin user';
  } else if (isCurrentUser) {
    deleteTitle = 'Cannot delete your own account';
  }

  const formattedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  const roleBadgeClass =
    user.role === 'admin'
      ? 'bg-violet-100 text-violet-800'
      : 'bg-indigo-100 text-indigo-800';

  return (
    <>
      {/* Desktop table row */}
      <tr className="hidden md:table-row border-b border-gray-100 hover:bg-gray-50">
        <td className="px-4 py-3">{getAvatar(user.role)}</td>
        <td className="px-4 py-3 text-gray-900 font-medium">{user.displayName}</td>
        <td className="px-4 py-3 text-gray-500 text-sm">{user.username}</td>
        <td className="px-4 py-3">
          <span
            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${roleBadgeClass}`}
          >
            {user.role}
          </span>
        </td>
        <td className="px-4 py-3 text-gray-500 text-sm">{formattedDate}</td>
        <td className="px-4 py-3">
          <button
            onClick={() => onDelete(user.id)}
            disabled={isDeleteDisabled}
            title={deleteTitle}
            className={`text-red-600 hover:text-red-800 font-medium text-sm ${
              isDeleteDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Delete
          </button>
        </td>
      </tr>

      {/* Mobile stacked card */}
      <div className="md:hidden bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          {getAvatar(user.role)}
          <div>
            <div className="text-gray-900 font-medium">{user.displayName}</div>
            <div className="text-gray-500 text-sm">{user.username}</div>
          </div>
        </div>
        <div className="mb-2">
          <span
            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${roleBadgeClass}`}
          >
            {user.role}
          </span>
        </div>
        <div className="text-gray-500 text-sm mb-3">{formattedDate}</div>
        <button
          onClick={() => onDelete(user.id)}
          disabled={isDeleteDisabled}
          title={deleteTitle}
          className={`w-full text-red-600 hover:text-red-800 font-medium text-sm py-2 border border-red-200 rounded ${
            isDeleteDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Delete
        </button>
      </div>
    </>
  );
}
