import React from "react";
import { 
  Home, 
  User,
  Linkedin, 
  Github, 
  Twitter, 
  Mail, 
  FolderGit2, 
  Instagram 
} from "lucide-react";

export default function Dock() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-white/90 backdrop-blur-xl border border-neutral-200/60 rounded-full shadow-2xl shadow-neutral-200/50 hover:scale-[1.01] transition-all duration-300">
      
      {/* 1. HOME */}
      <DockItem href="/" icon={<Home size={18} />} label="Home" />

      <Separator />

      {/* 2. ABOUT */}
      <DockItem href="/about" icon={<User size={18} />} label="About" />

      <Separator />

      {/* 4. PROJECTS */}
      <DockItem href="/projects" icon={<FolderGit2 size={18} />} label="Projects" />

      <Separator />
      {/* 3. RIPE LOGO LINK (Creative Hub) */}
      <a 
        href="/ripe" 
        className="group relative flex items-center justify-center px-3 py-1 hover:bg-neutral-100 rounded-full transition-all"
      >
        <span className="ripe ripe-shimmer text-2xl tracking-tight">RIPE</span>
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap">
            Creative & Writing
        </span>
      </a>

      <Separator />


      {/* 5. SOCIALS */}
      <DockItem href="https://github.com/RishwanthPerumandla" icon={<Github size={18} />} label="GitHub" external />
      <DockItem href="https://linkedin.com/in/rishwanthperumandla" icon={<Linkedin size={18} />} label="LinkedIn" external />
      <DockItem href="https://x.com/rishwanth1729" icon={<Twitter size={18} />} label="Twitter" external />
      <DockItem href="https://instagram.com/rishwanthperumandla" icon={<Instagram size={18} />} label="Instagram" external />
      <DockItem href="mailto:rishwanthperumandla28@gmail.com" icon={<Mail size={18} />} label="Email" external />

    </div>
  );
}

// Helper Components
function DockItem({ icon, label, href, external }) {
  return (
    <a 
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : ""}
      className="p-2.5 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-full transition-all duration-200 relative group"
    >
      {icon}
      <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap">
        {label}
      </span>
    </a>
  );
}

function Separator() {
  return <div className="w-px h-6 bg-neutral-200 mx-1"></div>;
}
