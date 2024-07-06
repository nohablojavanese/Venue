// pages/auth/page.tsx
import { login, signup } from "./action";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="space-y-4">
            <button
              formAction={login}
              type="submit"
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
            <button
              formAction={signup}
              type="submit"
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Sign-up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
