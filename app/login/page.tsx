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
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-base-content">
              Welcome to <span className="text-primary">Cognify</span>
            </h1>
            <p className="text-base-content/70 mt-2">
              AI-powered flashcards for your notes. Sign in or create an account
              to get started.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGithubLogin}
            className="btn btn-outline btn-neutral mb-6"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>

          {!signupSuccess ? (
            <form className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="input input-bordered"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="input input-bordered"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              {errorMsg && (
                <div className="alert alert-error">
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  formAction={handleLogin}
                  className="btn btn-primary flex-1"
                >
                  Log in
                </button>
                <button
                  type="submit"
                  formAction={handleSignup}
                  className="btn btn-outline btn-secondary flex-1"
                >
                  Sign up
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <CheckCircle2 className="w-20 h-20 text-success mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-success mb-2">
                  Account Created!
                </h3>
                <p className="text-base-content/80">
                  Please check your email inbox to confirm your sign-up and
                  activate your account.
                </p>
              </div>

              <Link
                href="https://mail.google.com/"
                rel="noopener noreferrer"
                className="btn btn-success btn-wide"
              >
                Open Gmail
              </Link>

              <p className="mt-6 text-xs text-base-content/60">
                Didn't get the email? Check your spam folder or{" "}
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
        </div>
      </div>
    </div>
  );
}
