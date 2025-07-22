"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

type Certification = {
  title: string;
  description: string;
  image: string;
};

export default function CertificationCard({ certification }: { certification: Certification }) {
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
        backgroundImage: `url(${certification.image})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[400px] border border-white text-white rounded-2xl shadow-xl p-6 mb-4 flex flex-col justify-end bg-blend-overlay bg-black/50"
    >
      <h2 className="text-xl font-semibold mb-2">{certification.title}</h2>
      <p className="text-sm text-gray-300 mb-4">{certification.description}</p>

      <a
        href={certification.image}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline text-sm"
      >
        View Certificate
      </a>
    </motion.div>
  );
}
