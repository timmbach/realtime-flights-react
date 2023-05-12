import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/Auth";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  // this handleSubmit is called when a new user tries to signup and navigates to the dashboard if signup was successful, displays an error message if signup details fail to validate
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
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
      <div className="max-w-[700px] mx-auto p-4 flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold py-2">
            Sign up for a free account
          </h1>
          <p className="py-2">
            Already have an account?
            <Link to="/" className="underline">
              Sign in.
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
              className="border p-3"
              type="email"
              placeholder="Email Address"
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3"
              type="password"
              placeholder="Password"
            />
          </div>
          <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-6 text-white">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
