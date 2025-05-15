import { userService } from "@/services/userService";

export const Login = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-main-bg text-text-main">
  <div className="flex flex-col items-center gap-8 px-4">
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-cta-btn">
      Welcome to <span className="text-cta-active">Life Deck</span>
    </h1>
    <p className="text-lg text-text-subtle">Your personal activity tracker</p>

    <button
      onClick={userService.logInWithGoogle}
      className="flex items-center gap-3 px-6 py-3 rounded-full bg-cta-btn text-text-main cursor-pointer hover:bg-cta-hover focus:outline-none focus:ring-2 focus:ring-[#C67A3C]/50 transition-colors text-sm font-semibold shadow-md"
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
