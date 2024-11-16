import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PayEase",
  description: "",
  // other metadata
};

const SigninPage = () => {
  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 flex justify-center gap-8">
              {/* Section for User */}
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px] text-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Continue as User
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Sign in to access your user dashboard and explore our services:
                </p>
                <ul className="mt-4 text-left text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li className="m-1">View and manage your account details</li>
                  <li  className="m-1">Track your transaction history</li>
                  <li  className="m-1">Access personalized recommendations</li>
                  <li  className="m-1">Get support and assistance</li>
                </ul>
                <button
                  className="mt-6 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Sign In as User
                </button>
                <p className="mt-6 text-gray-600 dark:text-gray-300">
                  Don't have an account?{" "}
                  <a
                    href="/signup-user"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Sign Up
                  </a>
                </p>
              </div>

              {/* Section for Merchant */}
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px] text-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Continue as Merchant
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Sign in to manage your merchant account and enjoy the following:
                </p>
                <ul className="mt-4 text-left text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li  className="m-1">Monitor and track transactions</li>
                  <li className="m-1">Access detailed business analytics</li>
                  <li className="m-1">Manage your merchant profile</li>
                  <li className="m-1">Seamless payouts and wallet management</li>
                </ul>
                <button
                  className="mt-6 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Sign In as Merchant
                </button>
                <p className="mt-6 text-gray-600 dark:text-gray-300">
                  Don't have an account?{" "}
                  <a
                    href="/signup-merchant"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

    </>
  );
};

export default SigninPage;
