import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Hook: Animate numbers counting up when scrolled into view
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!isInView) return;
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);
  
  return [count, ref];
}

// Component: Individual metric with count-up animation
function Metric({ value, unit, label }) {
  // Extract number from strings like "12ms", "50k/s", "99.9%"
  const numericMatch = value.toString().match(/[\d.]+/);
  const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const [count, ref] = useCountUp(Math.floor(numericValue), 1500);
  
  // Preserve original formatting (decimals, suffixes)
  const formattedCount = value.toString().includes(".") 
    ? (count / 10).toFixed(1) 
    : count;
  
  return (
    <span ref={ref} className="font-mono text-[10px] tabular-nums flex flex-col items-end">
      <span className="text-neutral-400 uppercase tracking-wider">{label}</span>
      <span className="text-neutral-700 font-medium">
        {formattedCount}{unit}
      </span>
    </span>
  );
}

// Component: Individual Stack Card
function StackCard({ title, items, dotColor, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Parse metric strings like "Latency: 12ms" into components
  const parseMetric = (metricStr) => {
    const [label, value] = metricStr.split(": ");
    const unitMatch = value?.match(/[a-zA-Z%/]+/) || [""];
    const unit = unitMatch[0];
    return { label, value, unit };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-xl p-6 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-200/50 hover:-translate-y-1 transition-all duration-300 ease-out cursor-crosshair"
    >
      {/* Header with status dot */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className={`relative flex h-2 w-2 ${dotColor} rounded-full`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColor} opacity-40`}></span>
          </span>
          <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-medium">
            {title}
          </h3>
        </div>
        
        {/* Connection lines (decorative, visible on hover) */}
        <div className={`h-px bg-gradient-to-r from-transparent via-${dotColor.replace('bg-', '')} to-transparent w-0 group-hover:w-12 transition-all duration-500 opacity-30`} />
      </div>

      {/* Stack Items */}
      <div className="space-y-4 relative">
        {items.map((item, i) => {
          const metric = parseMetric(item.metric);
          return (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index * 0.1) + (i * 0.05) + 0.2 }}
              className="flex items-center justify-between group/item py-1"
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-neutral-900 group-hover/item:text-neutral-600 transition-colors duration-200">
                  {item.name}
                </span>
                <span className="text-[11px] text-neutral-400 font-medium">
                  {item.subtext}
                </span>
              </div>
              
              {/* Metric: Hidden by default, revealed on card hover */}
              <div className={`transition-all duration-300 transform ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
                <Metric 
                  value={metric.value} 
                  unit={metric.unit} 
                  label={metric.label}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Subtle grid texture on hover */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity duration-500"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #171717 1px, transparent 0)',
          backgroundSize: '16px 16px'
        }}
      />
      
      {/* Corner accent on hover */}
      <div className={`absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
        <div className={`absolute top-0 right-0 w-px h-4 bg-gradient-to-b ${dotColor.replace('bg-', 'from-')} to-transparent`} />
        <div className={`absolute top-0 right-0 h-px w-4 bg-gradient-to-l ${dotColor.replace('bg-', 'from-')} to-transparent`} />
      </div>
    </motion.div>
  );
}

// Main Stack Component
export default function Stack() {
  const stackData = [
    {
      title: "Runtime",
      dotColor: "bg-blue-500",
      items: [
        { name: "Python", subtext: "FastAPI", metric: "Latency: 12ms" },
        { name: "Go", subtext: "Concurrency", metric: "Throughput: 50k/s" },
        { name: "Java", subtext: "Spring Boot", metric: "Uptime: 99.9%" },
        { name: "Node.js", subtext: "Async/Await", metric: "Memory: 128MB" },
      ],
    },
    {
      title: "Orchestration",
      dotColor: "bg-purple-500",
      items: [
        { name: "Kubernetes", subtext: "EKS / GKE", metric: "Pods: 99/99" },
        { name: "Docker", subtext: "Containers", metric: "Images: 47" },
        { name: "Terraform", subtext: "IaC", metric: "Resources: 234" },
        { name: "AWS / GCP", subtext: "Cloud Native", metric: "Regions: 8" },
      ],
    },
    {
      title: "Data Grid",
      dotColor: "bg-amber-500",
      items: [
        { name: "Kafka", subtext: "Streaming", metric: "Events: 2M/min" },
        { name: "Redis", subtext: "Caching", metric: "Hit Rate: 98%" },
        { name: "PostgreSQL", subtext: "Relational", metric: "Queries: 10k/s" },
        { name: "Elastic", subtext: "Search", metric: "Index: 50GB" },
      ],
    },
    {
      title: "Intelligence",
      dotColor: "bg-emerald-400",
      items: [
        { name: "RAG Systems", subtext: "LangChain", metric: "Tokens: 1M/day" },
        { name: "Vector DBs", subtext: "Pinecone", metric: "Vectors: 50M" },
        { name: "Inference", subtext: "vLLM", metric: "TPS: 120" },
        { name: "PyTorch", subtext: "Training", metric: "GPU: A100x4" },
      ],
    },
  ];

  return (
    <section className="mb-32 relative">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-8"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">System Architecture</h2>
          <p className="text-sm text-neutral-500 font-medium">Real-time metrics from production environments</p>
        </div>
        
        <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
          </span>
          <span className="uppercase tracking-wider">Live</span>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stackData.map((card, index) => (
          <StackCard
            key={card.title}
            title={card.title}
            items={card.items}
            dotColor={card.dotColor}
            index={index}
          />
        ))}
      </div>
      
      {/* Background decoration (subtle) */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}