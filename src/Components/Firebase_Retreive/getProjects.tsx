// lib/getProjects.ts (or .js if you're not using TS)

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

type Project = {
  id: string; // 
  title: string;
  description1: string;
  description2: string;
  media1: string;
  media2: string;
  media3: string;
  media4: string;
  tech_stack: string[];
};

export const getProjects = async (): Promise<Project[]> => {
  const querySnapshot = await getDocs(collection(db, "projects"));
  const projects: Project[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data() as Omit<Project, "id">;
    projects.push({ id: doc.id, ...data });
  });

  return projects;
};
