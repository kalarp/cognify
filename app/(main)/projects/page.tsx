"use client";

import { useEffect, useState } from "react";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "./actions";

type Flashcard = {
  question: string;
  answer: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  flashcards?: Flashcard[];
};
function ProjectsPage() {
  const [projects, setProjects] = useState<
    (Project & { formattedCreatedAt: string })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<
    (Project & { formattedCreatedAt?: string }) | null
  >(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    flashcards: [] as Flashcard[],
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const data = await getProjects();
        const formatted = data.map((project: Project) => {
          let flashcards: any = [];
          if (project.flashcards) {
            if (typeof project.flashcards === "string") {
              try {
                flashcards = JSON.parse(project.flashcards);
              } catch {
                flashcards = [];
              }
            } else if (Array.isArray(project.flashcards)) {
              flashcards = project.flashcards;
            }
          }
          return {
            ...project,
            flashcards,
            formattedCreatedAt: new Date(project.created_at).toLocaleString(),
          };
        });
        setProjects(formatted);
      } catch {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  function openCreateModal() {
    setEditingProject(null);
    setForm({ name: "", description: "", flashcards: [] });
    setModalOpen(true);
  }

  function openEditModal(project: Project & { formattedCreatedAt?: string }) {
    setEditingProject(project);
    setForm({
      name: project.name,
      description: project.description,
      flashcards: Array.isArray(project.flashcards) ? project.flashcards : [],
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingProject(null);
    setForm({ name: "", description: "", flashcards: [] });
  }

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFlashcardChange(
    idx: number,
    field: keyof Flashcard,
    value: string
  ) {
    setForm((prev) => {
      const flashcards = [...prev.flashcards];
      flashcards[idx] = { ...flashcards[idx], [field]: value };
      return { ...prev, flashcards };
    });
  }

  function addFlashcard() {
    setForm((prev) => ({
      ...prev,
      flashcards: [...prev.flashcards, { question: "", answer: "" }],
    }));
  }

  function removeFlashcard(idx: number) {
    setForm((prev) => {
      const flashcards = [...prev.flashcards];
      flashcards.splice(idx, 1);
      return { ...prev, flashcards };
    });
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (editingProject) {
        await updateProject({
          id: editingProject.id,
          name: form.name,
          description: form.description,
          flashcards: form.flashcards,
        });
      } else {
        await createProject({
          name: form.name,
          description: form.description,
          flashcards: form.flashcards,
        });
      }
      closeModal();
      const data = await getProjects();
      const formatted = data.map((project: Project) => {
        let flashcards: any = [];
        if (project.flashcards) {
          if (typeof project.flashcards === "string") {
            try {
              flashcards = JSON.parse(project.flashcards);
            } catch {
              flashcards = [];
            }
          } else if (Array.isArray(project.flashcards)) {
            flashcards = project.flashcards;
          }
        }
        return {
          ...project,
          flashcards,
          formattedCreatedAt: new Date(project.created_at).toLocaleString(),
        };
      });
      setProjects(formatted);
    } catch {
      setError(
        editingProject ? "Failed to update project" : "Failed to create project"
      );
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    setLoading(true);
    try {
      await deleteProject(id);
      const data = await getProjects();
      const formatted = data.map((project: Project) => {
        let flashcards: any = [];
        if (project.flashcards) {
          if (typeof project.flashcards === "string") {
            try {
              flashcards = JSON.parse(project.flashcards);
            } catch {
              flashcards = [];
            }
          } else if (Array.isArray(project.flashcards)) {
            flashcards = project.flashcards;
          }
        }
        return {
          ...project,
          flashcards,
          formattedCreatedAt: new Date(project.created_at).toLocaleString(),
        };
      });
      setProjects(formatted);
    } catch {
      setError("Failed to delete project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Your Projects</h1>
          <button className="btn btn-primary" onClick={openCreateModal}>
            + New Project
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li
                key={project.id}
                className="p-4 bg-base-200 rounded-box relative"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{project.name}</h2>
                    <p>{project.description}</p>
                    <p className="text-xs text-base-content/50">
                      Created: {project.formattedCreatedAt}
                    </p>
                    {Array.isArray(project.flashcards) &&
                      project.flashcards.length > 0 && (
                        <div className="mt-2">
                          <span className="font-semibold text-sm">
                            Flashcards:
                          </span>
                          <ul className="list-disc ml-6 mt-1">
                            {project.flashcards.map((fc, idx) => (
                              <li key={idx} className="text-sm">
                                <span className="font-semibold">Q:</span>{" "}
                                {fc.question}{" "}
                                <span className="font-semibold">A:</span>{" "}
                                {fc.answer}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => openEditModal(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {error && <p className="text-error mt-4">{error}</p>}

        {/* Modal for create/edit project */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
              <button
                className="absolute top-2 right-2 btn btn-sm btn-ghost"
                onClick={closeModal}
                aria-label="Close"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4">
                {editingProject ? "Edit Project" : "New Project"}
              </h2>
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Project Name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  className="input input-bordered"
                  disabled={formLoading}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleFormChange}
                  className="textarea textarea-bordered"
                  disabled={formLoading}
                />
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">Flashcards</span>
                    <button
                      type="button"
                      className="btn btn-xs btn-primary"
                      onClick={addFlashcard}
                      disabled={formLoading}
                    >
                      + Add Flashcard
                    </button>
                  </div>
                  {form.flashcards.length === 0 && (
                    <p className="text-xs text-base-content/50">
                      No flashcards yet.
                    </p>
                  )}
                  <ul className="space-y-2">
                    {form.flashcards.map((fc, idx) => (
                      <li key={idx} className="flex gap-2 items-center">
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
                          disabled={formLoading}
                        />
                        <input
                          type="text"
                          placeholder="Answer"
                          value={fc.answer}
                          onChange={(e) =>
                            handleFlashcardChange(idx, "answer", e.target.value)
                          }
                          className="input input-bordered input-xs flex-1"
                          disabled={formLoading}
                        />
                        <button
                          type="button"
                          className="btn btn-xs btn-error"
                          onClick={() => removeFlashcard(idx)}
                          disabled={formLoading}
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    type="submit"
                    className="btn btn-primary flex-1"
                    disabled={formLoading}
                  >
                    {formLoading
                      ? editingProject
                        ? "Saving..."
                        : "Creating..."
                      : editingProject
                      ? "Save Changes"
                      : "Create Project"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost flex-1"
                    onClick={closeModal}
                    disabled={formLoading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;
