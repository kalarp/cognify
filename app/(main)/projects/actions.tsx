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
    .select("id, name, description, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) return [];
  return data || [];
}

export async function createProject({
  name,
  description,
}: {
  name: string;
  description: string;
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
    },
  ]);
  if (error) throw error;
}
