import React, { useEffect, useRef, useState } from "react";
import ProjectRow from "./ProjectRow";

interface Project {
  id: string;
  name: string;
  role: string;
  desc: string;
  link: string;
}

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col border-t border-neutral-200">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="transition-all duration-500 ease-out motion-safe:transform"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: `${index * 100}ms`,
          }}
        >
          <ProjectRow
            id={project.id}
            name={project.name}
            role={project.role}
            desc={project.desc}
            link={project.link}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}
