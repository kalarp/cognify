import React from "react";
import { Layers, Plus } from "lucide-react";

interface SidebarNavProps {
  activeTab: "all" | "create";
  onTab: (tab: "all" | "create") => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, onTab }) => (
  <aside className="w-64 bg-base-200 border-r border-base-300 flex flex-col p-4 gap-2">
    <button
      className={`btn btn-ghost justify-start ${
        activeTab === "all" ? "bg-base-300" : ""
      }`}
      onClick={() => onTab("all")}
    >
      <Layers className="w-4 h-4 mr-2" /> All Projects
    </button>
    <button
      className={`btn btn-ghost justify-start ${
        activeTab === "create" ? "bg-base-300" : ""
      }`}
      onClick={() => onTab("create")}
    >
      <Plus className="w-4 h-4 mr-2" /> Create New
    </button>
    {/* Future: <button className="btn btn-ghost justify-start">Archived</button> */}
  </aside>
);
