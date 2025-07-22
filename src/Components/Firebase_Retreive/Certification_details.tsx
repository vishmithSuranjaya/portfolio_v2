"use client";
import { useState, useEffect } from "react";
import { getCertifications } from "../../../../lib/getCertifications";
import CertificationCard from "../hoverCard/CertificationCard";

export default function Certification_details() {
  const [certifications, setCertifications] = useState<{
    id: string;
    title: string;
    description: string;
    image: string;
  }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getCertifications();
      setCertifications(data);
    };
    loadData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {certifications.map((certification) => (
        <CertificationCard key={certification.id} certification={certification} />
      ))}
      <div className="col-span-full text-center text-white mt-8">
        <p className="text-xs text-white">All Rights Reserved. Vishmith Suranjaya.</p>
      </div>
    </div>
  );
}
