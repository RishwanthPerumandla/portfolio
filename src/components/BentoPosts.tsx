"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

interface Post {
  slug: string;
  data: {
    title: string;
    description: string;
    category?: string;
    dateFormatted: string;
  };
}

interface BentoPostsProps {
  posts: Post[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const smallCardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {},
};

export default function BentoPosts({ posts }: BentoPostsProps) {
  const largePost = posts[0];
  const smallPosts = posts.slice(1, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
      {/* Large Card - First Post */}
      {largePost && (
        <motion.a
          href={`/post/${largePost.slug}`}
          className="md:col-span-1 md:row-span-2 group relative bg-white border border-neutral-200 rounded-2xl p-8 flex flex-col justify-between overflow-hidden min-h-[400px]"
          whileHover="hover"
          initial="initial"
        >
          {/* Gradient Background on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 opacity-0"
            variants={{
              initial: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Border Darken & Shadow on Hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
            variants={{
              initial: { borderColor: "transparent", boxShadow: "none" },
              hover: { 
                borderColor: "rgba(0,0,0,0.2)", 
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.15)" 
              },
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="relative z-10">
            <motion.span
              className="inline-block font-mono text-[10px] tracking-widest text-neutral-500 bg-neutral-100 px-2 py-1 rounded"
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.05 },
              }}
              transition={{ duration: 0.2 }}
            >
              {largePost.data.category || "ARTICLE"}
            </motion.span>
          </div>

          <div className="relative z-10 mt-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
              <span className="relative">
                {largePost.data.title}
                {/* Title Underline Draw Animation */}
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-rose-500 to-blue-500"
                  variants={{
                    initial: { width: "0%" },
                    hover: { width: "100%" },
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </span>
            </h3>
            <p className="text-neutral-600 leading-relaxed line-clamp-3">
              {largePost.data.description}
            </p>
          </div>

          {/* Arrow */}
          <motion.svg
            className="absolute top-8 right-8 w-5 h-5 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            variants={{
              initial: { x: 0, y: 0 },
              hover: { x: 4, y: -4 },
            }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </motion.a>
      )}

      {/* Small Cards - Remaining Posts */}
      {smallPosts.map((post, index) => (
        <motion.a
          key={post.slug}
          href={`/post/${post.slug}`}
          className="group relative bg-white border border-neutral-200 rounded-xl p-6 flex flex-col justify-between overflow-hidden min-h-[190px]"
          variants={smallCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover="hover"
        >
          {/* Lift Effect on Hover */}
          <motion.div
            className="absolute inset-0 rounded-xl border border-transparent pointer-events-none"
            variants={{
              hover: { 
                y: -4,
                borderColor: "rgba(0,0,0,0.15)", 
                boxShadow: "0 12px 24px -8px rgba(0,0,0,0.12)" 
              },
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />

          <div className="relative z-10 flex justify-between items-start">
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-tighter">
              {post.data.category || "ARTICLE"}
            </span>
            
            {/* Arrow with 45deg Rotation on Hover */}
            <motion.svg
              className="w-4 h-4 text-neutral-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              variants={{
                initial: { rotate: 0 },
                hover: { rotate: 45, color: "#171717" },
              }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </motion.svg>
          </div>

          <h3 className="relative z-10 text-lg font-bold leading-tight text-neutral-900 mt-auto">
            {post.data.title}
          </h3>
        </motion.a>
      ))}
    </div>
  );
}
