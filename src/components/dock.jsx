import React, { useState, useEffect } from "react";
import { 
  Home, 
  User, 
  FolderGit2, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  Mail,
  Menu,
  X,
} from "lucide-react";

// Nav items always visible
const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/about", icon: User, label: "About" },
  { href: "/projects", icon: FolderGit2, label: "Projects" },
];

// Desktop social links
const desktopSocials = [
  { href: "https://github.com/RishwanthPerumandla", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/rishwanthperumandla", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/rishwanth1729", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com/rishwanthperumandla", icon: Instagram, label: "Instagram" },
  { href: "mailto:rishwanthperumandla28@gmail.com", icon: Mail, label: "Email" },
];

// Mobile social links (shown in expanded menu)
const mobileSocials = [
  { href: "https://github.com/RishwanthPerumandla", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/rishwanthperumandla", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/rishwanth1729", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com/rishwanthperumandla", icon: Instagram, label: "Instagram" },
  { href: "mailto:rishwanthperumandla28@gmail.com", icon: Mail, label: "Email" },
];

export default function Dock({ currentPath = "/" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = (href) => {
    if (href === "/") return currentPath === href;
    return currentPath.startsWith(href);
  };

  // Desktop Dock
  if (!isMobile) {
    return (
      <div className="flex items-center gap-1 px-2 py-2 bg-white/90 backdrop-blur-xl border border-neutral-200/60 rounded-full shadow-xl">
        {/* Navigation */}
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
              isActive(item.href) 
                ? "text-black bg-neutral-100" 
                : "text-neutral-500 hover:text-black hover:bg-neutral-50"
            }`}
            title={item.label}
          >
            <item.icon size={18} strokeWidth={isActive(item.href) ? 2.5 : 2} />
          </a>
        ))}

        <div className="w-px h-5 bg-neutral-200 mx-1" />

        {/* RIPE */}
        <a
          href="/ripe"
          className={`flex items-center justify-center px-3 h-10 rounded-full transition-colors ${
            isActive("/ripe") ? "bg-neutral-100" : ""
          }`}
        >
          <span className="ripe ripe-shimmer text-lg font-bold bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            RIPE
          </span>
        </a>

        <div className="w-px h-5 bg-neutral-200 mx-1" />

        {/* Social Links */}
        {desktopSocials.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center justify-center w-10 h-10 text-neutral-500 hover:text-black rounded-full transition-colors"
            title={item.label}
          >
            <item.icon size={18} />
          </a>
        ))}
      </div>
    );
  }

  // Mobile Dock
  return (
    <>
      {/* Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Expanded Menu */}
      {mobileMenuOpen && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 p-2 bg-white border border-neutral-200 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-1">
            {mobileSocials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center justify-center w-11 h-11 text-neutral-500 hover:text-black hover:bg-neutral-50 rounded-full transition-colors"
                title={item.label}
              >
                <item.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main Dock Bar */}
      <div className="flex items-center gap-1 px-2 py-2 bg-white/95 backdrop-blur-xl border border-neutral-200/60 rounded-full shadow-xl">
        {/* Nav - First 3 items */}
        {navItems.slice(0, 3).map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              isActive(item.href) ? "text-black bg-neutral-100" : "text-neutral-500"
            }`}
          >
            <item.icon size={18} />
          </a>
        ))}

        <div className="w-px h-4 bg-neutral-200 mx-0.5" />

        {/* RIPE */}
        <a
          href="/ripe"
          className={`flex items-center justify-center px-2 h-10 rounded-full transition-colors ${
            isActive("/ripe") ? "bg-neutral-100" : ""
          }`}
        >
          <span className="ripe ripe-shimmer text-sm font-bold bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            RIPE
          </span>
        </a>

        <div className="w-px h-4 bg-neutral-200 mx-0.5" />

        {/* Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
            mobileMenuOpen ? "text-black bg-neutral-100" : "text-neutral-500"
          }`}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </>
  );
}
