"use client";
import { useState, useEffect } from "react";
import { getProjects } from "../../firebase/getProjects";
import HoverCard from "../hoverCard/HoverCard";

export default function ProjectsDetails() {
  const [projects, setProjects] = useState<{
    id: string;
    title: string;
    description1: string;
    description2: string;
    media1: string;
    media2: string;
    media3: string;
    media4: string;
    tech_stack: string[];
  }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    loadData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {projects.map((proj) => (
        <HoverCard key={proj.id} project={proj} />
      ))}
      <div className="col-span-full text-center text-white mt-8">
        <p className="text-xs text-white">All Rights Reserved. Vishmith Suranjaya.</p>
      </div>
    </div>
  );
}
