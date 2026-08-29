# AI Foundations, History & Terminology

> A beginner-to-developer primer on what AI actually is, where it came from, and the vocabulary you need before building AI-powered apps.

## 📖 Table of Contents

1. [Big Idea](#1-big-idea)
2. [Understanding Intelligence](#2-understanding-intelligence)
3. [Brief History of AI](#3-brief-history-of-ai)
4. [Types of AI & Key Concepts](#4-types-of-ai--key-concepts)
5. [How LLMs Actually Work](#5-how-llms-actually-work)
6. [Glossary](#6-glossary)
7. [Further Reading](#7-further-reading)

---

## 1. Big Idea

One-paragraph framing: AI is not magic, not just a chatbot — it's a way of building software that recognizes patterns, predicts, generates content, and supports decisions.

---

## 2. Understanding Intelligence

- **2.1** What intelligence actually means (problem-solving power, not memorization)
- **2.2** Intelligence is more than knowledge (the "locked out of the house" example)
- **2.3** Natural (biological) intelligence — human/animal examples, developer lesson
- **2.4** Artificial (synthetic) intelligence — comparison table (natural vs. artificial)
- **2.5** Everyday examples of AI (recommenders, spam filters, nav apps, copilots, chatbots, semantic search)

---

## 3. Brief History of AI

- **3.1** The Dream (1950s) — Turing Test, Dartmouth Conference, Symbolic AI
- **3.2** The Disappointment — the AI Winters, why rule-based AI failed
- **3.3** The Revival (2010s) — Big Data + GPUs → Deep Learning boom
- **3.4** The Revolution (2017) — "Attention Is All You Need," the Transformer architecture
- **3.5** Timeline summary table (era → main idea → why it mattered)
- **3.6** Why the rule-based approach was limited
- **3.7** Why Transformers were a big deal (the "bank" sentence example)

---

## 4. Types of AI & Key Concepts

- **4.1** The Layers of AI (nested circles: AI → ML → DL → Generative AI)
  - 4.1.1 Artificial Intelligence — the big circle
  - 4.1.2 Machine Learning — learning from data instead of hand-coded rules
  - 4.1.3 Deep Learning — neural networks, why "deep"
  - 4.1.4 Generative AI — discriminative vs. generative, examples (ChatGPT, DALL·E, Copilot)
- **4.2** The AI Landscape (plain-language recap of the nested-circle model)
- **4.3** The Model — what a "model" is (process vs. result, the student analogy, inference)
- **4.4** Levels of Intelligence
  - 4.4.1 ANI — Artificial Narrow Intelligence ("the specialist")
  - 4.4.2 AGI — Artificial General Intelligence ("human level")
  - 4.4.3 ASI — Artificial Superintelligence (theoretical)
  - 4.4.4 Foundation Models — table of model types (LLM, vision, audio, multimodal)

---

## 5. How LLMs Actually Work

- **5.1** The Next-Token Game (how generation actually happens, with examples)
- **5.2** Tokens (what they are, why they matter for cost/speed/limits)
- **5.3** Context Window (the "whiteboard" analogy, what fills it)
- **5.4** Temperature (low vs. medium vs. high — when to use each)
- **5.5** Hallucinations (why they happen, the "co-pilot not captain" rule)

---

## 6. Glossary

Quick-reference definitions for: AI, ML, DL, Generative AI, Model, Token, Context Window, Temperature, Hallucination, ANI, AGI, ASI, Foundation Model, Transformer, Inference.

---

## 7. Further Reading

- Turing, "Computing Machinery and Intelligence" (1950)
- Dartmouth Conference proposal (1956)
- Vaswani et al., "Attention Is All You Need" (2017)
- Docs for the LLM APIs/tools referenced (OpenAI, Anthropic, Google)

---

### 💡 Suggested repo layout (if splitting into multiple files)

```
ai-foundations/
├── README.md                  ← this file (index + Big Idea)
├── 01-understanding-intelligence.md
├── 02-history-of-ai.md
├── 03-types-of-ai.md
├── 04-how-llms-work.md
├── glossary.md
└── assets/
    └── diagrams/               ← nested-circle diagram, timeline graphic, etc.
```

**Rule for students:** AI is a co-pilot, not the captain — never accept code or explanations you can't explain, test, or verify.