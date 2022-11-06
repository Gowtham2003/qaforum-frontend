import http from "../services/httpService";
import React, { useContext, useEffect, useState } from "react";
import {
  ExclamationCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

import useForm from "../hooks/useForm";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import UserContext from "../components/userContext";

function Register() {
  const router = useRouter();
  const [initial, setInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const [values, updateValues] = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const endpoint = `/register`;
    try {
      const { data } = await http.post(endpoint, values);
      localStorage.setItem(
        process.env.REACT_APP_JWT_KEY || "jwtPrivateKey",
        (data as any)["token"]
      );
      setUser((data as any)["user"]);
      setLoading(false);
      setError(false);
      router.replace("/");
    } catch {
      setLoading(false);
      setError(true);
    }
  };
  //   user ? (
  //     router.push("/")
  //   ) :
  //   return (
  //     <main style={{ backgroundImage: `url('/bg.svg')` }}>
  //       <form onSubmit={handleSubmit}>
  //         {error && (
  //           <div className="flex items-center justify-center bg-red-400 p-4 text-white text-center">
  //             <ExclamationCircleIcon className="h-4 w-4 mr-2" />
  //             Invalid Login Email / Password
  //           </div>
  //         )}
  //         <div className="flex min-h-screen">
  //           <div className="m-auto p-4">
  //             <div>
  //               <h2 className="text-center text-5xl font-bold text-black">
  //                 Login
  //               </h2>
  //               <div className="flex flex-col space-y-2 mx-auto">
  //                 <div>
  //                   <label className="block font-medium" htmlFor="email">
  //                     Email
  //                   </label>
  //                   <input
  //                     type="email"
  //                     name="email"
  //                     id="email"
  //                     required
  //                     autoComplete="email"
  //                     className={`${
  //                       loading && "animate-pulse"
  //                     } appearance-none px-4 py-2 border-2 border-gray-600 rounded-md focus:border-blue-600 transition outline-none`}
  //                     value={values.email}
  //                     onChange={updateValues}
  //                   />
  //                 </div>
  //                 <div>
  //                   <label className="block font-medium" htmlFor="password">
  //                     Password
  //                   </label>
  //                   <input
  //                     type="password"
  //                     name="password"
  //                     id="password"
  //                     required
  //                     autoComplete="current-password"
  //                     className={`${
  //                       loading && "animate-pulse"
  //                     } appearance-none px-4 py-2 border-2 border-gray-600 rounded-md focus:border-blue-600 transition outline-none`}
  //                     value={values.password}
  //                     onChange={updateValues}
  //                   />
  //                 </div>
  //                 <div className="flex justify-end">
  //                   <a href="/#" className="text-sm font-medium text-blue-600">
  //                     Forgot Password?
  //                   </a>
  //                 </div>
  //                 <div className="w-full">
  //                   <button
  //                     className={`${
  //                       loading && "animate-pulse"
  //                     } px-4 py-2 w-full bg-blue-600 text-white rounded-md text-lg font-medium `}
  //                     disabled={loading}
  //                   >
  //                     Login
  //                   </button>
  //                 </div>
  //                 <div className="text-center">
  //                   <span className="text-black items-center font-medium">
  //                     Dont have an Account?{" "}
  //                     <Link href="/register">
  //                       <a className="text-blue-600"></a>
  //                       Sign up here
  //                     </Link>
  //                   </span>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </form>
  //     </main>
  //   );
  useEffect(() => {
    if (user?.email) {
      router.push("/");
    }
    setInitial(false);
  }, [user]);
  return (
    !initial && (
      <>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-32 w-auto"
                src="/qa_logo.jpg"
                alt="QA Forum"
              />
              <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                Register for an account
              </h2>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Name"
                    value={values.name}
                    onChange={updateValues}
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={values.email}
                    onChange={updateValues}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={values.password}
                    onChange={updateValues}
                  />
                </div>
                <div>
                  <label htmlFor="confirm_password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    autoComplete="confirm-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                    value={values.password_confirmation}
                    onChange={updateValues}
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleSubmit}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Register
                </button>
              </div>
              <div className="text-center">
                <span className="mt-4 text-black items-center font-medium">
                  Already have an Account?{" "}
                  <Link className="text-blue-600" href="/login">
                    Sign in here
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  );
}

export default Register;
