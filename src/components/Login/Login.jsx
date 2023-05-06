import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/Auth";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  // this handleSubmit is called when the user tries to login and navigates to the dashboard if login was successful, displays an error message if login details fail to validate
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  // background image for login and singup pages
  const airplaneGif =
    "https://mir-s3-cdn-cf.behance.net/project_modules/1400/1ff4b7100999053.603f5151216f6.gif";

  return (
    <div
      style={{
        backgroundImage: `url(
          ${airplaneGif}
        )`,
        height: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-[600px] mx-auto p-4 h-[100vh] flex flex-col items-center justify-center my-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
          <p className="py-2">
            Don't have an account yet?{" "}
            <Link to="/signup" className="underline">
              Sign up.
            </Link>
          </p>
        </div>
        {error && (
          <div className="text-red-400 p-2 rounded-md m-2 bg-red-200">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border outline-none p-3 rounded-md"
              type="email"
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border outline-none p-3 rounded-md"
              type="password"
            />
          </div>
          <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-6 text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
