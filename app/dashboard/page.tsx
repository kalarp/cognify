import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="navbar bg-base-100 shadow-sm border-b border-base-200">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl font-bold">Cognify Dashboard</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                {data.user.email?.charAt(0).toUpperCase()}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="/settings">Settings</a>
              </li>
              <li>
                <a href="/logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-8">
        <div className="hero bg-base-200 rounded-box mb-8">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold text-base-content">
                Welcome back! 👋
              </h1>
              <p className="py-6 text-base-content/70">
                Hello{" "}
                <span className="font-semibold text-primary">
                  {data.user.email}
                </span>
                ! Ready to create some amazing flashcards?
              </p>
              <button className="btn btn-primary btn-lg">
                Create New Flashcard Set
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stat bg-base-100 shadow-lg rounded-box">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Flashcards</div>
            <div className="stat-value text-primary">0</div>
            <div className="stat-desc">Ready to create your first set?</div>
          </div>

          <div className="stat bg-base-100 shadow-lg rounded-box">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Study Sessions</div>
            <div className="stat-value text-secondary">0</div>
            <div className="stat-desc">Start studying today!</div>
          </div>

          <div className="stat bg-base-100 shadow-lg rounded-box">
            <div className="stat-figure text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Success Rate</div>
            <div className="stat-value text-accent">--%</div>
            <div className="stat-desc">Take your first quiz!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
