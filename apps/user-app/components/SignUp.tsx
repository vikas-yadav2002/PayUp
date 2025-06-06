"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { FaGoogle, FaGithub, FaUserPlus } from "react-icons/fa";

export default function SignUp() {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    setLoading(true);

    e.preventDefault();

    // Log out any existing session to avoid conflicts.
    await signOut();

    // Create form data with signup details.
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);

    try {
      // Call the signup API endpoint.
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: formData,
      });

      console.log("Signup Response:", res);

      if (res.ok) {
        // After successful signup, use NextAuth to sign in via credentials.
        const loginResponse = await signIn("credentials", {
          redirect: false,
          phone, // Use phone number as the credential.
          password, // Use the same password.
          callbackUrl: "/dashboard", // Redirect after login.
        });
        console.log("Login Response:", loginResponse);

        // // If login is successful, redirect to the dashboard.
        if (loginResponse?.ok) {
          router.push("/dashboard");
        } else {
          console.error("Login failed:", loginResponse);
        }
      } else {
        console.error("Sign-up failed:", res);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black to-[#0B1120]">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-md z-50">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex items-center justify-center w-[40vw]">
        <h1 className="text-6xl text-white font-bold">PayEase</h1>
      </div>

      <div className="flex flex-col items-center justify-center w-[60vw] bg-[#1F2937] p-8 rounded-md shadow-lg space-y-6">
        <div className="flex flex-col items-center justify-center bg-[#EBE6E6] w-[65%] p-8 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-bold text-black flex items-center space-x-2">
            <FaUserPlus /> <span>Sign Up</span>
          </h2>
          <p className="text-gray-600">
            Create your account to start using PayEase.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full p-8 next-form"
          >
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-200 shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-200 shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-200 shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-200 shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-3/4 p-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                <FaUserPlus className="inline-block mr-2" /> Sign Up
              </button>
            </div>
          </form>

          <div className="w-full h-[1px] bg-gray-500 my-4"></div>

          <div className="space-y-4 w-full">
            <div className="flex justify-center">
              <button
                onClick={() => signIn("google")}
                className="w-3/4 p-3 text-white bg-red-500 rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                <FaGoogle /> <span>Continue with Google</span>
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => signIn("github")}
                className="w-3/4 p-3 text-white bg-gray-800 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-900 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                <FaGithub /> <span>Continue with GitHub</span>
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/signin")}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
