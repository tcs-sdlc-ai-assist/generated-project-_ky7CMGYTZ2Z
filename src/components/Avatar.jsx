export function getAvatar(role) {
  if (role === 'admin') {
    return (
      <div className="rounded-full w-8 h-8 flex items-center justify-center text-white bg-violet-600">
        👑
      </div>
    );
  }

  return (
    <div className="rounded-full w-8 h-8 flex items-center justify-center text-white bg-indigo-500">
      📖
    </div>
  );
}
