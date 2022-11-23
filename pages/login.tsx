import http from "../services/httpService";
import React, { useContext, useEffect, useState } from "react";
import {
  ExclamationCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

import useForm from "../hooks/useForm";
import { useRouter } from "next/router";
import Link from "next/link";
import UserContext, { User } from "../components/userContext";
import { classNames } from "../utils/ui";

function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [initial, setInitial] = useState(true);
  const [values, updateValues] = useForm({ email: "", password: "" });
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const endpoint = `/login`;

    const res = await http.post(endpoint, values);
    if (res.ok) {
      const data = res.data;
      localStorage.setItem(
        process.env.REACT_APP_JWT_KEY || "jwtPrivateKey",
        (data as any)["token"]
      );
      setUser((data as any)["user"]);

      setLoading(false);
      setError(false);
      router.replace("/");
    } else {
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    if (user?.name) {
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
                Sign in to your account
              </h2>
            </div>
            {error && (
              <div className="flex items-center justify-center bg-red-400 p-4 text-white text-center rounded-lg">
                <ExclamationCircleIcon className="h-4 w-4 mr-2" />
                Invalid Login Email / Password
              </div>
            )}
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
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
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  onClick={handleSubmit}
                  className={classNames(
                    `group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
                    loading ? "animate-pulse" : ""
                  )}
                  disabled={loading}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </button>
              </div>
              <div className="text-center">
                <span className="mt-4 text-black items-center font-medium">
                  Dont have an Account?{" "}
                  <Link className="text-blue-600" href="/register">
                    Sign up here
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

export default Login;
