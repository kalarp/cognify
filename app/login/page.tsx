"use client";

import { useState } from "react";
import { login, signup } from "./actions";

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  async function handleLogin(formData: FormData) {
    setErrorMsg(null);
    const result = await login(formData);
    if (result?.error) {
      setErrorMsg(result.error);
    }
  }

  async function handleSignup(formData: FormData) {
    setErrorMsg(null);
    const result = await signup(formData);
    if (result?.error) {
      setErrorMsg(result.error);
    } else if (result?.success) {
      setSignupSuccess(true);
    }
  }

  return (
    <div
      data-theme="light"
      className="min-h-screen flex items-center justify-center bg-base-200"
    >
      <div className="w-full max-w-md shadow-xl bg-base-100 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Sign in to Paideia
        </h2>
        {!signupSuccess ? (
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input input-bordered w-full"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input input-bordered w-full"
                placeholder="••••••••"
              />
            </div>
            {errorMsg && (
              <div className="alert alert-error py-2 px-4 text-sm">
                {errorMsg}
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                formAction={handleLogin}
                className="btn btn-primary w-1/2"
              >
                Log in
              </button>
              <button
                type="submit"
                formAction={handleSignup}
                className="btn btn-outline w-1/2"
              >
                Sign up
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6 text-center text-sm text-base-content/70">
            <p>
              After signing up, please check your email to confirm your account.
              <br />
              <a
                href="https://mail.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                Go to Gmail
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
