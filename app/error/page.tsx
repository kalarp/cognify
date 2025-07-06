"use client";

import Link from "next/link";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-xl max-w-md w-full">
        <div className="card-body text-center">
          <div className="flex justify-center mb-6">
            <div className="avatar placeholder">
              <div className="bg-error/10 text-error rounded-full w-20 h-20">
                <AlertCircle size={40} />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-base-content mb-2">
            Oops! Something went wrong
          </h1>

          <p className="text-base-content/70 mb-6">
            We're sorry, but something unexpected happened. Please try again or
            return to the home page.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              <ArrowLeft size={16} />
              Try Again
            </button>

            <Link href="/" className="btn btn-outline">
              <Home size={16} />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
