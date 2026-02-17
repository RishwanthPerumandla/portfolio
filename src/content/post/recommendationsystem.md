---
title: Hybrid Recommendation System
description: A real-world case study of designing and deploying a hybrid content + collaborative recommendation system
slug: hybrid-recommendation-system
dateFormatted: June 11, 2025
cover: /assets/images/projects/hrs2.png
math: true
category: Case Study
---

> "This project wasn't just about building a recommender. It was about making user engagement meaningful — blending machine learning, scalable architecture, and real-time analytics to surface what truly matters."

This case study walks through my approach to designing, developing, and deploying a production-grade **Hybrid Recommendation System** that powers personalized content delivery using **text, image, and interaction signals**.

---

## Backstory

Ever since I realized how hooked I was to platforms like Instagram, Pinterest, and Reddit, I started asking myself *why*. What was it that kept pulling me back? The answer: **relevance**. The posts that showed up were eerily well-aligned with my preferences. Sometimes they looked like the ones I liked, sometimes they were liked by people I follow — and sometimes, both.

That’s when I dove into the world of recommendation engines.

There are three core types:

1. **Content-Based Filtering**
2. **Collaborative Filtering**
3. **Hybrid Systems**

Most tutorials on the internet walk through movie or music recommendations. But I wanted to go deeper — to simulate a **social media recommendation system**.

So, I curated and cleaned datasets mimicking real-world post interactions. Posts, users, likes — all injected into MongoDB with realistic object IDs. My goal was to **replicate how Instagram or Pinterest might structure their backend** — just at a smaller scale.

---

## Architecture Overview

### ML Pipeline Components

#### 🔍 1. Content-Based Recommendations

This strategy focuses on the *content* itself — posts that are textually and visually similar to what a user has already liked.

Why is this important? Because human attention is drawn to familiarity — we gravitate toward content that matches our interests and past behavior.

##### 🔧 Implementation Details:

* **Text Embeddings:**

  * Model Used: `all-MiniLM-L6-v2` from Sentence Transformers (384-dim output)
  * Chosen for its excellent trade-off between **speed**, **size**, and **semantic similarity accuracy**. Larger models like `all-mpnet-base-v2` offer slightly better performance but are computationally expensive.
  * Converts post captions, hashtags, and metadata into dense vectors:

    ```python
    from sentence_transformers import SentenceTransformer
    model = SentenceTransformer("all-MiniLM-L6-v2")
    emb = model.encode(text, normalize_embeddings=True)
    ```

* **Image Embeddings:**

  * Model Used: `resnet50` (from torchvision)
  * Chosen over ViT due to faster inference and availability on CPU/GPU out-of-the-box
  * We used the feature vector from the penultimate layer (2048-dim), then reduced using PCA to match text embedding size

    ```python
    from torchvision.models import resnet50
    from torchvision import transforms
    model = resnet50(pretrained=True)
    model = nn.Sequential(*list(model.children())[:-1])  # remove final classifier
    emb = model(image).flatten()
    ```

* **Final Post Embedding:**

  * After PCA reduction, we concatenate both:
    $v_{post} = [v_{text}; v_{image}] \Rightarrow 768 \text{ dim}$

* **User Vector:**

  * Mean of embeddings of liked posts:

    ```python
    user_vector = np.mean(liked_post_vectors, axis=0)
    ```

* **Similarity Score:**

  * Cosine similarity to all other post vectors:

    ```python
    cosine_scores = cosine_similarity(user_vector.reshape(1, -1), post_matrix)
    ```

This allowed us to recommend posts that **looked and read** like what the user already enjoyed — even if no one else had liked them.

---

#### 🤝 2. Collaborative Filtering

This approach leverages **implicit interactions** — likes — to map behavioral similarity between users and posts.

Psychologically, it taps into *social proof* — what others like you enjoy.

##### 🔧 Implementation Details:

* **Data Format:** CSV with `user_id`, `post_id`, `interaction (1 or 0)`

* **Matrix Factorization Model:** Surprise SVD

  * Formula:
    $\hat{r}_{ui} = \mu + b_u + b_i + q_i^T p_u$
    Where:

    * $\mu$: global average
    * $b_u, b_i$: user/item biases
    * $q_i, p_u$: latent factors

* **Loss Function:**
  $L = \sum_{(u,i) \in R} (r_{ui} - \hat{r}_{ui})^2 + \lambda (\|p_u\|^2 + \|q_i\|^2)$

* **Training Pipeline:**

  ```python
  from surprise import SVD, Dataset, Reader
  reader = Reader(rating_scale=(0, 1))
  data = Dataset.load_from_df(df[['user_id', 'post_id', 'interaction']], reader)
  trainset = data.build_full_trainset()
  model = SVD()
  model.fit(trainset)
  ```

* **Model Evaluation:** RMSE metric on test split

* **Caching:**

  * Precompute top-5 post recommendations per user
  * Store as `user_recommendations.json`
  * Serve via FastAPI endpoint for quick access

We use **joblib** to persist model (`cf_model.pkl`) and **MLflow** to track metrics, parameters, and artifacts.

---

#### 🔀 3. Hybrid Recommendation System

This combines the **semantic richness** of content-based embeddings with the **behavioral accuracy** of collaborative filtering.

##### 🔧 Fusion Formula:

* Given:

  * `c_score`: cosine similarity (normalized)
  * `cf_score`: collaborative prediction (also normalized to \[0,1])

* Compute Final Score:
  $\text{final\_score} = \alpha \cdot c\_score + (1 - \alpha) \cdot cf\_score$

  * where $\alpha = 0.6$

* This score is used to re-rank all available posts:

  ```python
  final_scores = 0.6 * content_scores + 0.4 * collab_scores
  ```

##### 📉 Why Weighted Fusion?

* Combats cold-start problem
* Prioritizes **meaningful unseen posts** (from content) but doesn’t ignore social signals
* α is tunable — can be auto-optimized using a held-out validation set

---

## Production-Ready API with FastAPI

Initially, I used Flask — but as the project grew, I migrated to **FastAPI** for:

* Faster async support
* Built-in validation with Pydantic
* Cleaner route management

I built endpoints like:

* `/likes/{user_id}` → fetch liked posts
* `/recommend/content` → content-based
* `/recommend/collab` → collaborative
* `/recommend/hybrid` → hybrid

### Performance Bottlenecks & Fixes

When I tested the system, the initial API responses were **30–40 seconds**. Not acceptable.

Here’s what I did:

* **Pagination** — to serve results in chunks
* **Reduced embedding recomputation** — used cached values
* **Optimized queries** with `$nin` in MongoDB
* **Improved sorting and slicing** logic

Current average response time? **Under 5 seconds** — even with image and text embeddings running in-memory.

> Total dataset: 132 users, 481 posts, 1.5K likes

This is still a small dataset. The next version will focus on **large-scale, distributed computation**, perhaps with **Faiss**, **Redis caching**, and **batch inference pipelines**.

---

## Frontend: Designed for Clarity

Built using:

* **React**
* **Material UI (MUI)**
* **React Router**
* **Vite**

### UX Flow:

1. **User List Page** → All users shown (paginated)
2. Click a user → Navigate to `UserDetail`
3. Tabs show:

   * Liked Posts
   * Content-Based
   * Collaborative
   * Hybrid

Each tab shows paginated results and uses loading states with MUI `CircularProgress`.

> View the Frontend Code → `src/pages/UserDetail.jsx`

---

## Final Summary Table

| Recommendation Type | Method              | Model Used       | Source Data       | Pagination | Explainability |
| ------------------- | ------------------- | ---------------- | ----------------- | ---------- | -------------- |
| Liked Posts         | Query by user\_id   | Mongo Aggregates | Likes Collection  | ✅          | ❌              |
| Content-Based       | Cosine + Embeddings | MiniLM + ResNet  | Posts Collection  | ✅          | ✅              |
| Collaborative       | SVD                 | Surprise         | interactions.csv  | ❌ (cached) | ❌              |
| Hybrid              | Weighted Scoring    | Fusion           | Merged from above | ✅          | ✅              |

---

## What I Learned

This project made me fall in love with **ML engineering** — not just the models, but the plumbing:

* Embedding engineering
* Model serialization
* API design
* Real-world latency constraints
* UI that makes AI interpretable

It taught me the **math behind relevance** — and how good engineering makes AI actually usable.

---

## What's Next?

* Use **Faiss** or **Annoy** for faster vector retrieval
* Add **Redis caching** for hot queries
* Integrate **user feedback loop** for model retraining
* Experiment with **session-based recommendations**
* Extend to **audio/video posts**

---

**GitHub Repo →** [hybrid-recommendation-system](https://github.com/RishwanthPerumandla/hybrid-recommendation-system)

**Want a system like this built for your team?** Reach out → [rishwanth.perumandla@hotmail.com](mailto:rishwanth.perumandla@hotmail.com)
