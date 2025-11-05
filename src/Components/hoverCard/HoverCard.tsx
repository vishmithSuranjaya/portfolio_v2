"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

type Project = {
  id: string;
  title: string;
  description1: string;
  description2: string;
  media1: string;
  media2: string;
  media3: string;
  media4: string;
  tech_stack: string[];
  url: string;
};

export default function HoverCard({ project }: { project: Project }) {

  const colors = ["#5D0E41", "#0C1844", "#461111", "#0A1D37", "#7C0A02"];

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const bounds = cardRef.current?.getBoundingClientRect();
      if (!bounds) return;

      const x = (e.clientX - bounds.left) / bounds.width;
      const y = (e.clientY - bounds.top) / bounds.height;

      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      animate(mouseX, 0.5, { type: "spring", stiffness: 300, damping: 20 });
      animate(mouseY, 0.5, { type: "spring", stiffness: 300, damping: 20 });
    };

    const el = cardRef.current;
    if (!el) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        backgroundImage: `url(${project.media1})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[400] border border-white text-white rounded-2xl shadow-xl p-6 mb-4 flex flex-col justify-end bg-blend-overlay bg-black/40"
    >
      <h2 className="text-xl font-semibold">{project.title}</h2>
      <p className="text-sm text-gray-300">{project.description1}</p>

      <div className="flex flex-wrap space-x-4">
  {project.tech_stack.map((tech, index) => (
    <div key={index} style={{ background: colors[index % colors.length] }} 
     className="p-1 rounded-md mt-1"
    >
    <h6 key={index} >
      {tech}
    </h6>
    <h6>{project.url}</h6>
    </div>
  ))}
</div>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline mt-2 text-sm"
      >
        Visit Project
      </a>
    </motion.div>
  );
}
