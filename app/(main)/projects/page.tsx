"use client";

import { useEffect, useState } from "react";
import { formatDate } from "./actions";
import { Loader2, BookOpen } from "lucide-react";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "./actions";
import { ProjectCard } from "./components/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { ProjectDrawer } from "./components/ProjectDrawer";
import { SidebarNav } from "./components/SidebarNav";

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
  const [previewProjectId, setPreviewProjectId] = useState<string | null>(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);

  // Unsaved changes protection state
  const [originalForm, setOriginalForm] = useState<{
    name: string;
    description: string;
    flashcards: Flashcard[];
  } | null>(null);
  const hasUnsavedChanges =
    projectFormState.open &&
    originalForm &&
    (projectFormState.form.name !== originalForm.name ||
      projectFormState.form.description !== originalForm.description ||
      JSON.stringify(projectFormState.form.flashcards) !==
        JSON.stringify(originalForm.flashcards));

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      setError(null);
      try {
        const data = await getProjects();
        const formatted = data.map((project: Project) => ({
          ...project,
          flashcards: parseFlashcards(project.flashcards),
          formattedCreatedAt: formatDate(project.created_at),
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

  // Warn on browser/tab close if unsaved changes
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave? Unsaved changes will be lost.";
        return e.returnValue;
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  // Sidebar navigation
  function handleTab(tab: "all" | "create") {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave? Unsaved changes will be lost."
      );
      if (!confirmLeave) return;
    }
    setActiveTab(tab);
    setProjectFormState((prev) => ({
      ...prev,
      open: tab !== "all",
      editing: false,
      projectId: undefined,
      form: { name: "", description: "", flashcards: [] },
      error: null,
    }));
    setPreviewProjectId(null);
    if (tab === "create") {
      setOriginalForm({ name: "", description: "", flashcards: [] });
    } else {
      setOriginalForm(null);
    }
  }

  function openEditPanel(project: Project & { formattedCreatedAt?: string }) {
    setActiveTab("edit");
    const form = {
      name: project.name,
      description: project.description,
      flashcards: Array.isArray(project.flashcards) ? project.flashcards : [],
    };
    setProjectFormState({
      open: true,
      editing: true,
      projectId: project.id,
      form,
      loading: false,
      error: null,
    });
    setOriginalForm(form);
    setPreviewProjectId(null);
  }

  // Only prompt if the panel is being closed by user action, not after save
  function closePanel({ force = false } = {}) {
    if (!force && hasUnsavedChanges) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Are you sure you want to close? Unsaved changes will be lost."
      );
      if (!confirmClose) return;
    }
    setActiveTab("all");
    setProjectFormState((prev) => ({
      ...prev,
      open: false,
      editing: false,
      projectId: undefined,
      form: { name: "", description: "", flashcards: [] },
      error: null,
    }));
    setOriginalForm(null);
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
            formattedCreatedAt: formatDate(new Date()),
          },
          ...prev,
        ]);
        await createProject({
          name: projectFormState.form.name,
          description: projectFormState.form.description,
          flashcards: projectFormState.form.flashcards,
        });
      }
      setOriginalForm(null);
      closePanel({ force: true }); // Don't prompt after save
      // Reload from server for consistency
      const data = await getProjects();
      const formatted = data.map((project: Project) => ({
        ...project,
        flashcards: parseFlashcards(project.flashcards),
        formattedCreatedAt: formatDate(project.created_at),
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

  // Soft delete with undo
  function handleDelete(id: string) {
    setDeleteLoadingId(id);
    const deletedProject = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    let undo = false;
    toast(
      (t) => (
        <div>
          <span>Project deleted.</span>
          <button
            className="btn btn-xs btn-ghost ml-2"
            onClick={() => {
              undo = true;
              setProjects((prev) => [deletedProject!, ...prev]);
              setDeleteLoadingId(null);
              toast.dismiss(t.id);
            }}
          >
            Undo
          </button>
        </div>
      ),
      { duration: 5000 }
    );
    setTimeout(async () => {
      if (!undo) {
        try {
          await deleteProject(id);
          // Reload from server for consistency
          const data = await getProjects();
          const formatted = data.map((project: Project) => ({
            ...project,
            flashcards: parseFlashcards(project.flashcards),
            formattedCreatedAt: formatDate(project.created_at),
          }));
          setProjects(formatted);
        } catch {
          setError("Failed to delete project");
        } finally {
          setDeleteLoadingId(null);
        }
      }
    }, 5000);
  }

  return (
    <div className="min-h-screen flex bg-base-100">
      {/* Sidebar */}
      <SidebarNav
        activeTab={activeTab === "edit" ? "all" : activeTab}
        onTab={handleTab}
      />
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Your Projects</h1>
        </div>
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin w-5 h-5" /> Loading...
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center text-base-content/70">
            <BookOpen
              size={80}
              className="mx-auto mb-4 text-base-300 dark:text-base-400"
            />
            <div className="text-xl font-semibold mb-2">No projects yet</div>
            <div className="mb-4">
              Start by creating your first flashcard project!
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleTab("create")}
            >
              <span className="mr-2">+</span> New Project
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const safeProject = {
                ...project,
                flashcards: Array.isArray(project.flashcards)
                  ? project.flashcards
                  : parseFlashcards(project.flashcards),
              };
              const isPreviewing = previewProjectId === safeProject.id;
              return (
                <li key={safeProject.id} className="relative">
                  <ProjectCard
                    project={safeProject}
                    onEdit={openEditPanel}
                    onDelete={handleDelete}
                    onPreview={() =>
                      setPreviewProjectId(isPreviewing ? null : safeProject.id)
                    }
                    isPreviewing={isPreviewing}
                    deleteLoading={deleteLoadingId === safeProject.id}
                  />
                  <AnimatePresence>
                    {isPreviewing && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 top-full z-20 mt-2"
                      >
                        <div className="bg-base-100 border border-base-300 rounded-xl shadow-lg p-4 flex flex-col gap-3 animate-fade-in">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-lg">
                              Flashcards Preview
                            </span>
                            <button className="btn btn-xs btn-primary" disabled>
                              Study (Coming Soon)
                            </button>
                          </div>
                          {safeProject.flashcards.length === 0 ? (
                            <div className="text-base-content/50 text-sm">
                              No flashcards yet.
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 gap-2">
                              {safeProject.flashcards.map((fc, idx) => (
                                <motion.div
                                  key={idx}
                                  className="rounded-lg bg-blue-50/80 border border-blue-200 px-4 py-3 flex flex-col cursor-pointer select-none transition-transform hover:scale-[1.02]"
                                  whileHover={{ rotateY: 6 }}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                >
                                  <div className="font-bold text-blue-900 flex items-center gap-1">
                                    Q:{" "}
                                    <span className="font-normal text-blue-800">
                                      {fc.question}
                                    </span>
                                  </div>
                                  <div className="text-green-900 mt-1 flex items-center gap-1">
                                    <span className="font-bold">A:</span>
                                    <span className="font-normal text-green-800">
                                      {fc.answer}
                                    </span>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        )}
        {error && <p className="text-error mt-4">{error}</p>}
        <Toaster position="top-center" />

        {/* In-page drawer/panel for create/edit */}
        <ProjectDrawer
          open={projectFormState.open}
          editing={projectFormState.editing}
          form={projectFormState.form}
          loading={projectFormState.loading}
          error={projectFormState.error}
          onClose={closePanel}
          onFormChange={handleFormChange}
          onFlashcardChange={handleFlashcardChange}
          onAddFlashcard={addFlashcard}
          onRemoveFlashcard={removeFlashcard}
          onSubmit={handleFormSubmit}
        />
      </main>
    </div>
  );
}
