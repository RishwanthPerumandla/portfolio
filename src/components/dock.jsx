import React from "react";
import { 
  Home, 
  User, 
  FolderGit2, 
  BookOpenText,
  Sparkles,
} from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/about", icon: User, label: "About" },
  { href: "/projects", icon: FolderGit2, label: "Projects" },
  { href: "/posts", icon: BookOpenText, label: "Posts" },
  { href: "/ripe", icon: Sparkles, label: "RIPE" },
];

export default function Dock({ currentPath = "/" }) {
  const isActive = (href) => {
    if (href === "/") return currentPath === href;
    return currentPath.startsWith(href);
  };

  return (
    <nav className="flex max-w-[calc(100vw-2rem)] items-center justify-center gap-1 rounded-full border border-neutral-200/70 bg-white/92 px-2 py-2 shadow-xl backdrop-blur-xl md:gap-2">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={`flex items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium transition-all duration-200 md:px-4 ${
            isActive(item.href)
              ? "bg-neutral-900 text-white shadow-sm"
              : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
          }`}
          title={item.label}
        >
          <item.icon size={16} strokeWidth={2.2} />
          <span className="hidden whitespace-nowrap md:inline">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
