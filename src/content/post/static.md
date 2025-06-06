---

layout: ../../layouts/post.astro
title: Static Website Architecture
description: A professional case study on architecting a scalable, cost-efficient business website
slug: static-website-architecture
dateFormatted: June 5, 2025
cover: /assets/blog/static-site-cover.webp
------------------------------------------

> "Anyone can build a website. But designing one that scales, remains cost-efficient, and supports evolving business needs — that’s real architecture."

This is a professional case study on how I — as a Solutions Architect — approach building a modern website from scratch for a small-to-mid scale business.

---

## Introduction

A business approaches with a requirement to build a professional website. As a Solutions Architect, my role is not just to develop it, but to understand the problem from a business and technical perspective. The goal is to design a cost-efficient, scalable, and maintainable solution aligned with user expectations and operational constraints. This document represents my approach in handling such a requirement — from discovery to architecture decisions and cost estimation.

---

## Discovery Phase

### What we need to know

1. **What is the website for?**

   * Brand visibility?
   * Showcase of services?
   * Generating leads or inquiries?
   * Content publishing?

2. **Who is the target audience and expected traffic?**

   * What is the projected average daily traffic?
   * Are there seasonal spikes or marketing campaigns expected?

3. **What is the client's budget?**

   * Initial budget for design and development?
   * Ongoing yearly maintenance and hosting?

4. **What content will be available?**

   * Will the client provide structured web copy?
   * Do they expect help with content strategy?

5. **Design expectations?**

   * Do they want to use a pre-built template?
   * Are custom design elements or animations required?

📎 **[View Full Discovery Questionnaire →](https://github.com/RishwanthPerumandla/static-website-architecture/blob/main/docs/discovery-questionnaire.md)**

---

## Use Case: Static Business Website

Let’s assume the following requirement:

* Multi-page website (Home, About, Services, Contact)
* Basic contact form
* < 100 users/day
* Limited budget

This type of project seems simple — but my job is to ensure it’s resilient, fast, and future-ready.

---

## Evaluating Shared Hosting

The most common go-to for small business websites is shared hosting through providers like Hostinger, GoDaddy, or Bluehost.

These platforms offer plans starting as low as \$2–10/month and come with bundled features like:

* Domain + SSL
* One-click WordPress installation
* cPanel-based deployment

While this might seem ideal, these plans have a major limitation: **bandwidth**.

> Example: A basic shared plan might allow 10GB/month.
> If the homepage is 1MB and 1,000 people visit in one day, that's 1GB already used.

Additionally:

* You’re co-hosted with hundreds of other websites (performance varies)
* Server scaling is not possible
* DDoS protection and auto-healing are limited

As a Solutions Architect, my responsibility is to look beyond cost and consider future traffic surges, SEO performance, and uptime.

This is where we consider AWS.

---

## ☁️ Re-Architecting the Website with AWS

Instead of just “hosting” the site, the aim is to design for scalability, availability, and cost-efficiency — backed by AWS cloud services. The choice of services depends on technical complexity, required uptime, expected traffic, and budget.

---

### Option 1: **S3 + CloudFront** — Scalable Static Hosting

**Architecture**:

* HTML, CSS, JS, and assets are hosted on an S3 bucket.
* CloudFront is configured as the CDN with edge locations globally.
* Route 53 manages the DNS with low-latency routing.
* SSL is handled by ACM with TLS 1.2 enforcement.

**Why this setup?**

* Designed for durability (S3: 99.999999999%)
* Low-latency delivery globally using edge caching
* Pay-as-you-go — ideal for unpredictable traffic
* Serverless; no need for patching or scaling

**Security Controls**:

* S3 public access is blocked
* OAI (Origin Access Identity) used for secure CloudFront access
* All endpoints HTTPS-only

**Cost Example**:

* 3GB egress via CloudFront: \~\$0.25
* 2GB S3 storage: \~\$0.05
* Route 53 hosted zone: \$0.50
* ACM: Free

**Estimated Total**: **<\$1/month**

![S3 + CloudFront Architecture](/assets/images/posts/StaticWebsiteAWS.png)

---

### Option 2: **Lightsail + WordPress** — Simplified CMS Hosting

**Architecture**:

* Lightsail instance pre-configured with WordPress
* Static IP with TLS enabled
* Optional S3 media storage with WP-S3 plugin

**Why Lightsail?**

* Predictable pricing and UI simplicity
* Supports small teams and content editors
* Built-in monitoring and snapshots

**Security**:

* Regular patching required via SSH
* Enable UFW, fail2ban, and only expose HTTPS and SSH

**Cost**:

* \$5/month instance + \$1 static IP (if not attached)
* Optional: CloudFront for faster asset delivery

![Lightsail Wordpress Architecture](/assets/images/posts/Lightsail.png)
---

### Option 3: **Elastic Beanstalk (EC2 + RDS)** — Managed WordPress Stack

**Architecture**:

* EC2-based WordPress with auto-scaling
* RDS MySQL backend
* Load Balancer for HA
* Deployed via Beanstalk environment with health checks

**Why Beanstalk?**

* Infra managed behind the scenes
* Health dashboards and deployment rollbacks
* Horizontal scaling and blue-green deployments possible

**Cost**:

* EC2 t3.micro: \~\$9
* RDS t3.micro: \~\$15
* Load Balancer: \~\$18

**Total**: \~\$42/month

![S3 + CloudFront Architecture](/assets/images/posts/Beanstalk.png)
---

### Option 4: **Custom EC2 + RDS** — Fully Manual Infra

**Architecture**:

* Nginx + PHP-FPM setup on EC2
* MySQL database via RDS
* S3 for media + CloudFront as CDN
* Managed via SSH + SystemD + Cron

**Why this?**

* Complete flexibility and optimization
* Ideal for infrastructure-heavy teams

**Challenges**:

* Requires patching, scaling, and recovery scripts
* Higher learning curve and risks

**Estimated Cost**:

* \~\$60/month fully loaded

---

## Image & Asset Strategy

* Store all static media in S3 with lifecycle rules
* CDN delivered via CloudFront with caching headers
* Signed URLs and versioning for access control

**Advantages**:

* Reduced TTFB and origin server load
* Parallel domain strategy for high LCP pages
* Easy purging and asset invalidation via CLI/CDN APIs

---

## Summary Table

| Architecture Stack | Use Case            | Monthly Cost | Scalability | Maintenance | Extensibility |
| ------------------ | ------------------- | ------------ | ----------- | ----------- | ------------- |
| Shared Hosting     | Basic entry site    | \$2–10       | Low         | Low         | Low           |
| S3 + CloudFront    | Static brochureware | <\$1         | Very High   | Very Low    | Medium        |
| Lightsail          | Small CMS website   | \$6–10       | Medium      | Low         | Low           |
| Elastic Beanstalk  | Scalable CMS        | \~\$40–50    | High        | Medium      | High          |
| EC2 + RDS (Manual) | Custom workloads    | \$60+        | High        | High        | High          |

---

## Final Thoughts

This wasn’t just about publishing a few static pages. This was a rigorous evaluation and execution exercise — where I combined cost analysis, scalability planning, and system resilience principles to propose a future-proof solution. Each decision here reflects tradeoff reasoning, not just technology selection.

---

**Check out the GitHub Repo →** [Github](https://github.com/RishwanthPerumandla/static-website-architecture.git)

**View Architecture Diagrams →** [Diagrams](https://github.com/RishwanthPerumandla/static-website-architecture/diagrams)

*Have a similar requirement? Reach out via [rishwanth.perumandla@hotmail.com](mailto:rishwanth.perumandla@hotmail.com)*
