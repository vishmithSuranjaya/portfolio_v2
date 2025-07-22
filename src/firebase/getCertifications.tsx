// lib/getCertifications.ts

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

type Certification = {
  id: string;
  title: string;
  description1: string;
  description2: string;
  media1: string;
  media2: string;
  media3: string;
  media4: string;
  tech_stack: string[];
};

export const getCertifications = async (): Promise<Certification[]> => {
  const querySnapshot = await getDocs(collection(db, "certifications"));
  const certifications: Certification[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data() as Omit<Certification, "id">;
    certifications.push({ id: doc.id, ...data });
  });

  return certifications;
};
