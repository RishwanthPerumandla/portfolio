import React from "react";
import StackCard from "./micro/StackCard";

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
    dotColor: "bg-yellow-500",
    items: [
      { name: "Kafka", subtext: "Streaming", metric: "Events: 2M/min" },
      { name: "Redis", subtext: "Caching", metric: "Hit Rate: 98%" },
      { name: "PostgreSQL", subtext: "Relational", metric: "Queries: 10k/s" },
      { name: "Elastic", subtext: "Search", metric: "Index: 50GB" },
    ],
  },
  {
    title: "Intelligence",
    dotColor: "bg-green-400",
    variant: "intelligence" as const,
    items: [
      { name: "RAG Systems", subtext: "LangChain", metric: "Tokens: 1M/day" },
      { name: "Vector DBs", subtext: "Pinecone", metric: "Vectors: 50M" },
      { name: "Inference", subtext: "vLLM", metric: "TPS: 120" },
      { name: "PyTorch", subtext: "Training", metric: "GPU: A100x4" },
    ],
  },
];

export default function Stack() {
  return (
    <section className="mb-32">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl font-bold text-neutral-900">System Architecture</h2>
        <span className="font-mono text-xs text-neutral-400">STACK_V2.0</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stackData.map((card, index) => (
          <StackCard
            key={card.title}
            title={card.title}
            items={card.items}
            dotColor={card.dotColor}
            variant={card.variant}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
