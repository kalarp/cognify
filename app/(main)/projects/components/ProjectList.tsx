import { ProjectCard } from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectList({
  projects,
  previewProjectId,
  deleteLoadingId,
  openEditPanel,
  handleDelete,
  setPreviewProjectId,
  parseFlashcards,
}: {
  projects: any[];
  previewProjectId: string | null;
  deleteLoadingId: string | null;
  openEditPanel: (project: any) => void;
  handleDelete: (id: string) => void;
  setPreviewProjectId: (id: string | null) => void;
  parseFlashcards: (flashcards: any) => any[];
}) {
  return (
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
                        {safeProject.flashcards.map(
                          (
                            fc: { question: string; answer: string },
                            idx: number
                          ) => (
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
                          )
                        )}
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
  );
}
