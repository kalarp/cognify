"use server";

import { createClient } from "@/utils/supabase/server";

export async function getProjects() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("id, name, description, created_at, flashcards")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) return [];
  return data || [];
}

export async function createProject({
  name,
  description,
  flashcards = [],
}: {
  name: string;
  description: string;
  flashcards?: any[];
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("Not authenticated");

  const { error } = await supabase.from("projects").insert([
    {
      user_id: user.id,
      name,
      description,
      flashcards,
    },
  ]);
  if (error) throw error;
}

export async function updateProject({
  id,
  name,
  description,
  flashcards = [],
}: {
  id: string;
  name: string;
  description: string;
  flashcards?: any[];
}) {
  console.log("projectsActions: updateProject called", {
    id,
    name,
    description,
    flashcards,
  });
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("projects")
    .update({ name, description, flashcards })
    .eq("id", id)
    .eq("user_id", user.id);
  if (error) throw error;
}

export async function deleteProject(id: string) {
  console.log("projectsActions: deleteProject called", { id });
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);
  if (error) throw error;
}

export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString(undefined, options);
}
