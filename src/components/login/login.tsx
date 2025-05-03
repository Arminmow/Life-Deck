import { userService } from "@/services/userService";

export const Login = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F8F4E9] text-[#2C2C2C]">
  <div className="flex flex-col items-center gap-8 px-4">
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-[#C67A3C]">
      Welcome to <span className="text-[#4A90E2]">Life Deck</span>
    </h1>
    <p className="text-lg text-[#7A7A7A]">Your personal activity tracker</p>

    <button
      onClick={userService.logInWithGoogle}
      className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#C67A3C] text-white hover:bg-[#B96F34] focus:outline-none focus:ring-2 focus:ring-[#C67A3C]/50 transition-colors text-sm font-semibold shadow-md"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google logo"
        className="w-6 h-6"
      />
      <span>Sign in with Google</span>
    </button>
  </div>
</div>

  );
};
