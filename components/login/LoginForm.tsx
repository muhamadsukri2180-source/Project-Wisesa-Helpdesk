export default function LoginForm() {
  return (
    <div className="w-[400px]">

      <h1 className="text-5xl font-bold mb-2">
        Welcome back
      </h1>

      <p className="text-gray-500 mb-10">
        Please enter your details
      </p>

      <div className="mb-5">
        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
          placeholder="Masukkan email"
          className="w-full border rounded-md p-3"
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 font-medium">
          Password
        </label>

        <input
          type="password"
          placeholder="Masukkan password"
          className="w-full border rounded-md p-3"
        />
      </div>

      <div className="flex justify-between items-center mb-5">

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Remember me
        </label>

        <a href="#" className="text-red-600">
          Forgot password?
        </a>

      </div>

      <button
        className="w-full bg-pink-300 text-white rounded-md p-3 font-semibold hover:bg-pink-400"
      >
        Sign In
      </button>

      <button
        className="w-full border rounded-md p-3 mt-5"
      >
        Sign in with Google
      </button>

    </div>
  );
}