import { userService } from "@/services/userService";

export const Login = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white text-gray-800">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-semibold tracking-tight">
          Welcome to <span className="text-blue-600">Life Deck</span>
        </h1>
        <p className="text-sm text-gray-500">Your personal activity tracker</p>

        <button
          onClick={userService.logInWithGoogle}
          className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-300 hover:border-gray-400 transition-colors hover:bg-gray-50 text-sm font-medium"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};
