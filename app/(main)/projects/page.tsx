"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/toast-provider";
import { createProject, getProjects } from "./actions";

type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
};

export default function ProjectsPage() {
  console.log("ProjectsPage: render");
  const [projects, setProjects] = useState<
    (Project & { formattedCreatedAt: string })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log("ProjectsPage: useEffect fetchProjects");
    async function fetchProjects() {
      setLoading(true);
      try {
        const data = await getProjects();
        // Format created_at on the client for hydration safety
        const formatted = data.map((project: Project) => ({
          ...project,
          formattedCreatedAt: new Date(project.created_at).toLocaleString(),
        }));
        setProjects(formatted);
      } catch {
        showToast("Failed to load projects", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    console.log("ProjectsPage: handleCreate called", { name, description });
    e.preventDefault();
    setLoading(true);
    try {
      await createProject({ name, description });
      setName("");
      setDescription("");
      const data = await getProjects();
      const formatted = data.map((project: Project) => ({
        ...project,
        formattedCreatedAt: new Date(project.created_at).toLocaleString(),
      }));
      setProjects(formatted);
    } catch {
      showToast("Failed to create project", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Your Projects</h1>
        <form onSubmit={handleCreate} className="mb-8 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input input-bordered"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered"
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Create Project
          </button>
        </form>
        {loading && <p>Loading...</p>}
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="p-4 bg-base-200 rounded-box">
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <p>{project.description}</p>
              <p className="text-xs text-base-content/50">
                Created: {project.formattedCreatedAt}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

//.
