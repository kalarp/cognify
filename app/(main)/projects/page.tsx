"use client";

import { useEffect, useState } from "react";
import {
  Layers,
  Plus,
  Loader2,
  BookOpen,
  Edit2,
  Trash2,
  Check,
} from "lucide-react";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "./actions";

// --- Types ---
type Flashcard = {
  question: string;
  answer: string;
};

type SerializedFlashcards = string | Flashcard[];

type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  flashcards?: SerializedFlashcards;
  formattedCreatedAt?: string;
};

function parseFlashcards(
  flashcards: SerializedFlashcards | undefined
): Flashcard[] {
  if (!flashcards) return [];
  if (typeof flashcards === "string") {
    try {
      return JSON.parse(flashcards);
    } catch {
      return [];
    }
  }
  if (Array.isArray(flashcards)) return flashcards;
  return [];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "create" | "edit">("all");
  const [projectFormState, setProjectFormState] = useState<{
    open: boolean;
    editing: boolean;
    projectId?: string;
    form: {
      name: string;
      description: string;
      flashcards: Flashcard[];
    };
    loading: boolean;
    error: string | null;
  }>({
    open: false,
    editing: false,
    projectId: undefined,
    form: { name: "", description: "", flashcards: [] },
    loading: false,
    error: null,
  });

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      setError(null);
      try {
        const data = await getProjects();
        const formatted = data.map((project: Project) => ({
          ...project,
          flashcards: parseFlashcards(project.flashcards),
          formattedCreatedAt: new Date(project.created_at).toLocaleString(),
        }));
        setProjects(formatted);
      } catch {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Sidebar navigation
  function handleTab(tab: "all" | "create") {
    setActiveTab(tab);
    setProjectFormState((prev) => ({
      ...prev,
      open: tab !== "all",
      editing: false,
      projectId: undefined,
      form: { name: "", description: "", flashcards: [] },
      error: null,
    }));
  }

  function openEditPanel(project: Project & { formattedCreatedAt?: string }) {
    setActiveTab("edit");
    setProjectFormState({
      open: true,
      editing: true,
      projectId: project.id,
      form: {
        name: project.name,
        description: project.description,
        flashcards: Array.isArray(project.flashcards) ? project.flashcards : [],
      },
      loading: false,
      error: null,
    });
  }

  function closePanel() {
    setActiveTab("all");
    setProjectFormState((prev) => ({
      ...prev,
      open: false,
      editing: false,
      projectId: undefined,
      form: { name: "", description: "", flashcards: [] },
      error: null,
    }));
  }

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setProjectFormState((prev) => ({
      ...prev,
      form: { ...prev.form, [e.target.name]: e.target.value },
    }));
  }

  function handleFlashcardChange(
    idx: number,
    field: keyof Flashcard,
    value: string
  ) {
    setProjectFormState((prev) => {
      const flashcards = [...prev.form.flashcards];
      flashcards[idx] = { ...flashcards[idx], [field]: value };
      return { ...prev, form: { ...prev.form, flashcards } };
    });
  }

  function addFlashcard() {
    setProjectFormState((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        flashcards: [...prev.form.flashcards, { question: "", answer: "" }],
      },
    }));
  }

  function removeFlashcard(idx: number) {
    setProjectFormState((prev) => {
      const flashcards = [...prev.form.flashcards];
      flashcards.splice(idx, 1);
      return { ...prev, form: { ...prev.form, flashcards } };
    });
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProjectFormState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      if (projectFormState.editing && projectFormState.projectId) {
        // Optimistic update
        setProjects((prev) =>
          prev.map((p) =>
            p.id === projectFormState.projectId
              ? {
                  ...p,
                  name: projectFormState.form.name,
                  description: projectFormState.form.description,
                  flashcards: projectFormState.form.flashcards,
                }
              : p
          )
        );
        await updateProject({
          id: projectFormState.projectId,
          name: projectFormState.form.name,
          description: projectFormState.form.description,
          flashcards: projectFormState.form.flashcards,
        });
      } else {
        // Optimistic add
        const tempId = "temp-" + Date.now();
        setProjects((prev) => [
          {
            id: tempId,
            name: projectFormState.form.name,
            description: projectFormState.form.description,
            flashcards: projectFormState.form.flashcards,
            created_at: new Date().toISOString(),
            formattedCreatedAt: new Date().toLocaleString(),
          },
          ...prev,
        ]);
        await createProject({
          name: projectFormState.form.name,
          description: projectFormState.form.description,
          flashcards: projectFormState.form.flashcards,
        });
      }
      closePanel();
      // Reload from server for consistency
      const data = await getProjects();
      const formatted = data.map((project: Project) => ({
        ...project,
        flashcards: parseFlashcards(project.flashcards),
        formattedCreatedAt: new Date(project.created_at).toLocaleString(),
      }));
      setProjects(formatted);
    } catch {
      setProjectFormState((prev) => ({
        ...prev,
        error: projectFormState.editing
          ? "Failed to update project"
          : "Failed to create project",
      }));
    } finally {
      setProjectFormState((prev) => ({ ...prev, loading: false }));
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    // Optimistic remove
    setProjects((prev) => prev.filter((p) => p.id !== id));
    try {
      await deleteProject(id);
      // Reload from server for consistency
      const data = await getProjects();
      const formatted = data.map((project: Project) => ({
        ...project,
        flashcards: parseFlashcards(project.flashcards),
        formattedCreatedAt: new Date(project.created_at).toLocaleString(),
      }));
      setProjects(formatted);
    } catch {
      setError("Failed to delete project");
    }
  }

  return (
    <div className="min-h-screen flex bg-base-100">
      {/* Sidebar */}
      <aside className="w-64 bg-base-200 border-r border-base-300 flex flex-col p-4 gap-2">
        <button
          className={`btn btn-ghost justify-start ${
            activeTab === "all" ? "bg-base-300" : ""
          }`}
          onClick={() => handleTab("all")}
        >
          <Layers className="w-4 h-4 mr-2" /> All Projects
        </button>
        <button
          className={`btn btn-ghost justify-start ${
            activeTab === "create" ? "bg-base-300" : ""
          }`}
          onClick={() => handleTab("create")}
        >
          <Plus className="w-4 h-4 mr-2" /> Create New
        </button>
        {/* Future: <button className="btn btn-ghost justify-start">Archived</button> */}
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Your Projects</h1>
        </div>
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin w-5 h-5" /> Loading...
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <li
                key={project.id}
                className="bg-base-200 rounded-xl shadow p-5 flex flex-col gap-3 border border-base-300 relative h-full min-h-[180px]"
                style={{
                  minHeight: "180px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex items-center justify-between">
                  <h2
                    className="text-xl font-bold flex-1 truncate max-w-[60%]"
                    title={project.name}
                  >
                    {project.name.length > 40
                      ? project.name.slice(0, 37) + "..."
                      : project.name}
                  </h2>
                  <span className="badge badge-info badge-sm ml-2 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {Array.isArray(project.flashcards)
                      ? project.flashcards.length
                      : 0}{" "}
                    Flashcards
                  </span>
                </div>
                <p
                  className="text-base-content/80 mb-1 text-sm truncate"
                  style={{ maxWidth: "100%" }}
                  title={project.description}
                >
                  {project.description.length > 70
                    ? project.description.slice(0, 67) + "..."
                    : project.description}
                </p>
                <p className="text-xs text-base-content/50 mb-2 truncate">
                  Created: {project.formattedCreatedAt}
                </p>
                <div className="flex gap-2 mt-auto">
                  <button
                    className="btn btn-xs btn-outline flex items-center gap-1"
                    onClick={() => openEditPanel(project)}
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    className="btn btn-xs btn-error flex items-center gap-1"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {error && <p className="text-error mt-4">{error}</p>}

        {/* In-page drawer/panel for create/edit */}
        {projectFormState.open && (
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-base-100 border-l border-base-300 shadow-lg z-50 animate-slide-in flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-base-300">
              <h2 className="text-xl font-bold">
                {projectFormState.editing ? "Edit Project" : "New Project"}
              </h2>
              <button
                className="btn btn-sm btn-ghost"
                onClick={closePanel}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col gap-3 p-4 flex-1 overflow-y-auto"
            >
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={projectFormState.form.name}
                onChange={handleFormChange}
                required
                className="input input-bordered"
                disabled={projectFormState.loading}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={projectFormState.form.description}
                onChange={handleFormChange}
                className="textarea textarea-bordered"
                disabled={projectFormState.loading}
              />
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">Flashcards</span>
                  <button
                    type="button"
                    className="btn btn-xs btn-primary"
                    onClick={addFlashcard}
                    disabled={projectFormState.loading}
                  >
                    <Plus className="w-3 h-3" /> Add Flashcard
                  </button>
                </div>
                {projectFormState.form.flashcards.length === 0 && (
                  <p className="text-xs text-base-content/50">
                    No flashcards yet.
                  </p>
                )}
                <ul className="space-y-2">
                  {projectFormState.form.flashcards.map((fc, idx) => (
                    <li
                      key={idx}
                      className="rounded bg-blue-50/80 border border-blue-200 px-3 py-2 flex flex-col gap-1 relative"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-900">Q:</span>
                        <input
                          type="text"
                          placeholder="Question"
                          value={fc.question}
                          onChange={(e) =>
                            handleFlashcardChange(
                              idx,
                              "question",
                              e.target.value
                            )
                          }
                          className="input input-bordered input-xs flex-1"
                          disabled={projectFormState.loading}
                        />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-green-900">A:</span>
                        <input
                          type="text"
                          placeholder="Answer"
                          value={fc.answer}
                          onChange={(e) =>
                            handleFlashcardChange(idx, "answer", e.target.value)
                          }
                          className="input input-bordered input-xs flex-1"
                          disabled={projectFormState.loading}
                        />
                        <button
                          type="button"
                          className="btn btn-xs btn-error ml-2"
                          onClick={() => removeFlashcard(idx)}
                          disabled={projectFormState.loading}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={projectFormState.loading}
                >
                  {projectFormState.loading ? (
                    <Loader2 className="animate-spin w-4 h-4 inline-block mr-1" />
                  ) : projectFormState.editing ? (
                    <Check className="w-4 h-4 inline-block mr-1" />
                  ) : (
                    <Plus className="w-4 h-4 inline-block mr-1" />
                  )}
                  {projectFormState.editing ? "Save Changes" : "Create Project"}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost flex-1"
                  onClick={closePanel}
                  disabled={projectFormState.loading}
                >
                  Cancel
                </button>
              </div>
              {projectFormState.error && (
                <p className="text-error mt-2">{projectFormState.error}</p>
              )}
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
