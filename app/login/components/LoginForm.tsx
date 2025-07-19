import { Github, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";

interface LoginFormProps {
  signupSuccess: boolean;
  handleLogin: (formData: FormData) => Promise<void>;
  handleSignup: (formData: FormData) => Promise<void>;
  handleGithubLogin: (e: React.MouseEvent) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  signupSuccess,
  handleLogin,
  handleSignup,
  handleGithubLogin,
}) => (
  <>
    {!signupSuccess ? (
      <div>
        <form className="space-y-6">
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-medium text-base">Email</span>
            </label>
            <input
              name="email"
              type="email"
              required
              className="input input-bordered input-lg w-full"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-medium text-base">Password</span>
            </label>
            <input
              name="password"
              type="password"
              required
              className="input input-bordered input-lg w-full"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              formAction={handleLogin}
              className="btn btn-primary btn-lg flex-1"
            >
              Log in
            </button>
            <button
              type="submit"
              formAction={handleSignup}
              className="btn btn-outline btn-secondary btn-lg flex-1"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="divider text-base-content/50">OR</div>
        <button
          type="button"
          onClick={handleGithubLogin}
          className="btn btn-outline btn-accent btn-lg w-full gap-2"
        >
          <Github className="w-5 h-5" />
          Continue with GitHub
        </button>
      </div>
    ) : (
      <div className="text-center py-6">
        <div className="mb-8">
          <CheckCircle2 className="w-24 h-24 text-success mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-success mb-4">
            Account Created!
          </h3>
          <p className="text-base-content/80 text-lg leading-relaxed">
            Please check your email inbox to confirm your sign-up and activate
            your account.
          </p>
        </div>
        <Link
          href="https://mail.google.com/"
          rel="noopener noreferrer"
          className="btn btn-success btn-lg btn-wide mb-6"
        >
          Open Gmail
        </Link>
        <p className="text-sm text-base-content/60 leading-relaxed">
          Didn&apos;t get the email? Check your spam folder or{" "}
          <Link
            target="_blank"
            href="https://github.com/chaosweasl/cognify/issues"
            className="link link-primary hover:link-hover"
          >
            contact support
          </Link>
          .
        </p>
      </div>
    )}
  </>
);
