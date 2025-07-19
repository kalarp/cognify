import React from "react";
import { Trash2 } from "lucide-react";

type FlashcardInputProps = {
  idx: number;
  question: string;
  answer: string;
  loading: boolean;
  onChange: (idx: number, field: "question" | "answer", value: string) => void;
  onRemove: (idx: number) => void;
};

export const FlashcardInput: React.FC<FlashcardInputProps> = ({
  idx,
  question,
  answer,
  loading,
  onChange,
  onRemove,
}) => {
  return (
    <li className="rounded bg-blue-50/80 border border-blue-200 px-3 py-2 flex flex-col gap-1 relative animate-fade-in">
      <div className="flex items-center gap-2">
        <span className="font-bold text-blue-900">Q:</span>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => onChange(idx, "question", e.target.value)}
          className="input input-bordered input-xs flex-1"
          disabled={loading}
        />
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="font-bold text-green-900">A:</span>
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => onChange(idx, "answer", e.target.value)}
          className="input input-bordered input-xs flex-1"
          disabled={loading}
        />
        <button
          type="button"
          className="btn btn-xs btn-error ml-2"
          onClick={() => onRemove(idx)}
          disabled={loading}
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </li>
  );
};
