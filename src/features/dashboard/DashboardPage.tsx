import { useAuth } from '../../context/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome, {user?.username}!
        </h1>
        <p className="text-gray-500">SGCT Dashboard</p>
        <button
          onClick={logout}
          className="text-sm text-indigo-600 hover:underline"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
