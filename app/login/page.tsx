"use client";

import { useState } from "react";
import { Github } from "lucide-react";
import { signInWithGithub, login, signup } from "./actions";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

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

  async function handleGithubLogin(e: React.MouseEvent) {
    e.preventDefault();
    await signInWithGithub();
  }

  return (
    <div
      data-theme="cognify"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-base-200 to-white"
    >
      <div className="w-full max-w-md bg-white/90 shadow-2xl rounded-3xl p-10 border border-base-300 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 mb-2">
          <h2 className="text-3xl font-extrabold text-center text-primary tracking-tight">
            Welcome to <span className="text-emerald-400">Cognify</span>
          </h2>
          <p className="text-base-content/70 text-center text-base">
            AI-powered flashcards for your notes. Sign in or create an account
            to get started.
          </p>
        </div>
        <button
          type="button"
          onClick={handleGithubLogin}
          className="btn btn-outline btn-neutral flex items-center gap-2 w-full mb-4"
        >
          <Github className="w-5 h-5" />
          Continue with GitHub
        </button>
        {!signupSuccess ? (
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input input-bordered w-full bg-base-100"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input input-bordered w-full bg-base-100"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            {errorMsg && (
              <div className="alert alert-error py-2 px-4 text-sm mt-2">
                <span>{errorMsg}</span>
              </div>
            )}
            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                formAction={handleLogin}
                className="btn btn-primary w-1/2 shadow-md"
              >
                Log in
              </button>
              <button
                type="submit"
                formAction={handleSignup}
                className="btn btn-outline btn-secondary w-1/2 shadow-md"
              >
                Sign up
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <CheckCircle2 className="w-20 h-20 text-success mb-6 drop-shadow-sm animate-in fade-in" />
            <h3 className="text-2xl font-bold text-success mb-2">
              Account Created!
            </h3>
            <p className="mb-6 text-base-content/80 text-lg text-center max-w-xs">
              Please check your email inbox to confirm your sign-up and activate
              your account.
            </p>
            <Link
              href="https://mail.google.com/"
              rel="noopener noreferrer"
              className="btn btn-success btn-wide btn-lg shadow"
            >
              Open Gmail
            </Link>
            {/*for now contact support redirects to /issues*/}
            <p className="mt-6 text-xs text-base-content/60 text-center">
              Didn&apos;t get the email? Check your spam folder or&nbsp;
              <Link
                target="_blank"
                href="https://github.com/chaosweasl/cognify/issues"
                className="link link-primary"
              >
                contact support
              </Link>
              .
            </p>
          </div>
        )}
        {/* <div className="text-xs text-base-content/60 text-center mt-6">
          By signing up, you agree to our{" "}
          <a href="/terms" className="link link-primary">
            Terms of Service
          </a>
          .
        </div> */}
      </div>
    </div>
  );
}
