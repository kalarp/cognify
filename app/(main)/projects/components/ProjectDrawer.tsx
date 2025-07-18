import React from "react";
import { Plus, Loader2, Check, Trash2 } from "lucide-react";
import { FlashcardInput } from "./FlashcardInput";

type Flashcard = {
  question: string;
  answer: string;
};

interface ProjectDrawerProps {
  open: boolean;
  editing: boolean;
  form: {
    name: string;
    description: string;
    flashcards: Flashcard[];
  };
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFlashcardChange: (
    idx: number,
    field: keyof Flashcard,
    value: string
  ) => void;
  onAddFlashcard: () => void;
  onRemoveFlashcard: (idx: number) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({
  open,
  editing,
  form,
  loading,
  error,
  onClose,
  onFormChange,
  onFlashcardChange,
  onAddFlashcard,
  onRemoveFlashcard,
  onSubmit,
}) => {
  if (!open) return null;
  return (
    <div className="fixed right-0 top-0 h-full w-full max-w-md bg-base-100 border-l border-base-300 shadow-lg z-50 animate-slide-in flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-base-300">
        <h2 className="text-xl font-bold">
          {editing ? "Edit Project" : "New Project"}
        </h2>
        <button
          className="btn btn-sm btn-ghost"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 p-4 flex-1 overflow-y-auto"
      >
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={onFormChange}
          required
          className="input input-bordered"
          disabled={loading}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={onFormChange}
          className="textarea textarea-bordered"
          disabled={loading}
        />
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold">Flashcards</span>
            <button
              type="button"
              className="btn btn-xs btn-primary"
              onClick={onAddFlashcard}
              disabled={loading}
            >
              <Plus className="w-3 h-3" /> Add Flashcard
            </button>
          </div>
          {form.flashcards.length === 0 && (
            <p className="text-xs text-base-content/50">No flashcards yet.</p>
          )}
          <ul className="space-y-2">
            {form.flashcards.map((fc, idx) => (
              <FlashcardInput
                key={idx}
                idx={idx}
                question={fc.question}
                answer={fc.answer}
                loading={loading}
                onChange={onFlashcardChange}
                onRemove={onRemoveFlashcard}
              />
            ))}
          </ul>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="btn btn-primary flex-1"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4 inline-block mr-1" />
            ) : editing ? (
              <Check className="w-4 h-4 inline-block mr-1" />
            ) : (
              <Plus className="w-4 h-4 inline-block mr-1" />
            )}
            {editing ? "Save Changes" : "Create Project"}
          </button>
          <button
            type="button"
            className="btn btn-ghost flex-1"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
        {error && <p className="text-error mt-2">{error}</p>}
      </form>
    </div>
  );
};
