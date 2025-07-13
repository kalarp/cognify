"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

/* TODO: add more robust validation as needed */

function validateEmail(email: string) {
  // Simple email regex for demonstration
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string) {
  // Example: at least 6 characters
  return typeof password === "string" && password.length >= 6;
}

export async function login(formData: FormData) {
  console.log("loginActions: login called", formData);
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validation
  if (!validateEmail(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!validatePassword(password)) {
    return { error: "Password must be at least 6 characters." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Return error message for client to display
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  console.log("loginActions: signup called", formData);
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validation
  if (!validateEmail(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!validatePassword(password)) {
    return { error: "Password must be at least 6 characters." };
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    // Return error message for client to display
    return { error: error.message };
  }

  return { success: true };
}

export async function signInWithGithub() {
  console.log("loginActions: signInWithGithub called");
  const supabase = await createClient();

  let siteUrl = "https://cognify-chaosweasl.vercel.app";
  if (process.env.NODE_ENV === "development") {
    siteUrl = "http://localhost:3000";
  }
  console.log("[signInWithGithub] NODE_ENV:", process.env.NODE_ENV);
  console.log("[signInWithGithub] siteUrl:", siteUrl);
  console.log(
    "[signInWithGithub] redirectTo:",
    `${siteUrl}/auth/callback?next=/dashboard`
  );

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${siteUrl}/auth/callback?next=/dashboard`,
    },
  });
  console.log("[signInWithOAuth] data:", data);
  console.log("[signInWithOAuth] error:", error);

  if (data?.url) {
    // Use Next.js redirect to send the user to the GitHub OAuth URL
    console.log("[signInWithGithub] Redirecting to:", data.url);
    redirect(data.url);
  }
  if (error) {
    throw new Error(error.message);
  }
}
