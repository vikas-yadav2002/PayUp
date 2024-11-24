"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaGithub, FaSignInAlt } from 'react-icons/fa';
import PeerToPeerLoader from './PeerToPeerLoader';
import Loader from './Loader';

export default function SignIn() {
  const [loading, setLoading] = useState<boolean>(false)
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const result = await signIn('credentials', {
      phone,
      password,
      redirect: false,
    });

    console.log(result);

    if (result?.error) {
      console.error('Sign-in failed:', result.error);
      setLoading(false);
    } else {
      router.push('/dashboard');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black to-[#0B1120]">
      <div className="flex items-center justify-center w-[40vw]">
        <h1 className="text-6xl text-white font-bold">PayEase</h1>
      </div>

      <div className="flex flex-col items-center justify-center w-[60vw] bg-[#1F2937] p-8 rounded-md shadow-lg space-y-6">
        <div className="flex flex-col items-center justify-center bg-[#EBE6E6] w-[65%] p-8 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-bold text-black">Log In</h2>
          <p className="text-gray-700 mb-4">Log in to continue to PayEase.</p>

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-200 shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-200 shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
              required
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className={`w-3/4 p-3 text-white rounded-md transition-all duration-300 shadow-lg transform ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 hover:scale-105"
                  }`}
                disabled={loading}
              >
                {loading ? <Loader/> :  <FaSignInAlt className="inline-block mr-2" /> }
               
              </button>
            </div>
          </form>

          <div className="w-full h-[1px] bg-gray-500 my-4"></div>

          <div className="space-y-4 w-full">
            <div className="flex justify-center">
              <button
                onClick={() => signIn('google')}
                className="w-3/4 p-3 text-white bg-red-500 rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                <FaGoogle /> <span>Continue with Google</span>
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => signIn('github')}
                className="w-3/4 p-3 text-white bg-gray-800 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-900 transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                <FaGithub /> <span>Continue with GitHub</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don’t have an account?{' '}
              <span
                onClick={() => router.push('/signup')}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Create one
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
