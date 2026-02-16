import React, { useState, useCallback } from "react";
import { 
  Home, 
  User, 
  FolderGit2, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  Mail,
  type LucideIcon,
} from "lucide-react";

interface DockItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  external?: boolean;
  isActive?: boolean;
}

function DockItem({ icon: Icon, label, href, external, isActive }: DockItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a 
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : ""}
      className="relative p-3 text-neutral-500 hover:text-black rounded-full transition-colors duration-200 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Active indicator dot */}
      {isActive && (
        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-neutral-900 rounded-full" />
      )}
      
      {/* Icon */}
      <span
        className="block transition-transform duration-200 ease-out"
        style={{
          transform: isHovered ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)",
        }}
      >
        <Icon size={20} strokeWidth={isHovered ? 2.5 : 2} />
      </span>
      
      {/* Tooltip */}
      <span 
        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] font-bold px-2 py-1 rounded pointer-events-none whitespace-nowrap"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered 
            ? "translateX(-50%) translateY(0)" 
            : "translateX(-50%) translateY(4px)",
          transition: "opacity 200ms ease-out, transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {label}
      </span>
    </a>
  );
}

function Separator() {
  return <div className="w-px h-6 bg-neutral-200 mx-1" />;
}

interface DockProps {
  currentPath?: string;
}

export default function Dock({ currentPath = "/" }: DockProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMouseEnter = useCallback((label: string) => {
    setHoveredItem(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);

  return (
    <div 
      className="flex items-center gap-1 px-2 py-2 bg-white/90 backdrop-blur-xl border border-neutral-200/60 rounded-full shadow-2xl shadow-neutral-200/50"
      onMouseLeave={handleMouseLeave}
    >
      
      {/* NAVIGATION */}
      <div onMouseEnter={() => handleMouseEnter("home")}>
        <DockItem href="/" icon={Home} label="Home" isActive={currentPath === "/"} />
      </div>
      
      <div onMouseEnter={() => handleMouseEnter("about")}>
        <DockItem href="/about" icon={User} label="About" isActive={currentPath === "/about"} />
      </div>
      
      <div onMouseEnter={() => handleMouseEnter("projects")}>
        <DockItem href="/projects" icon={FolderGit2} label="Projects" isActive={currentPath === "/projects"} />
      </div>

      <Separator />

      {/* RIPE */}
      <a 
        href="/ripe" 
        className="relative p-3 text-neutral-500 hover:text-black rounded-full transition-colors duration-200 group"
        onMouseEnter={() => handleMouseEnter("ripe")}
        onMouseLeave={handleMouseLeave}
      >
        <span className="ripe ripe-shimmer text-xl tracking-tight">RIPE</span>
        <span 
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] font-bold px-2 py-1 rounded pointer-events-none whitespace-nowrap"
          style={{
            opacity: hoveredItem === "ripe" ? 1 : 0,
            transform: hoveredItem === "ripe"
              ? "translateX(-50%) translateY(0)"
              : "translateX(-50%) translateY(4px)",
            transition: "opacity 200ms ease-out, transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          Creative Hub
        </span>
      </a>

      <Separator />

      {/* SOCIALS */}
      <div onMouseEnter={() => handleMouseEnter("github")}>
        <DockItem href="https://github.com/RishwanthPerumandla" icon={Github} label="GitHub" external />
      </div>
      <div onMouseEnter={() => handleMouseEnter("linkedin")}>
        <DockItem href="https://linkedin.com/in/rishwanthperumandla" icon={Linkedin} label="LinkedIn" external />
      </div>
      <div onMouseEnter={() => handleMouseEnter("twitter")}>
        <DockItem href="https://x.com/rishwanth1729" icon={Twitter} label="Twitter" external />
      </div>
      <div onMouseEnter={() => handleMouseEnter("instagram")}>
        <DockItem href="https://instagram.com/rishwanthperumandla" icon={Instagram} label="Instagram" external />
      </div>
      <div onMouseEnter={() => handleMouseEnter("email")}>
        <DockItem href="mailto:rishwanthperumandla28@gmail.com" icon={Mail} label="Email" external />
      </div>

    </div>
  );
}
