import React from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/RishwanthPerumandla", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/rishwanthperumandla", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/rishwanth1729", icon: Twitter, label: "X" },
  { href: "mailto:rishwanthperumandla28@gmail.com", icon: Mail, label: "Email" },
];

export default function FloatingSocials() {
  return (
    <aside className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40">
      <div className="flex flex-col gap-2 rounded-full border border-neutral-200/80 bg-white/85 p-2 shadow-xl backdrop-blur-xl">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={link.label}
            className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-500 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <link.icon size={18} />
          </a>
        ))}
      </div>
    </aside>
  );
}
