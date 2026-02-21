/**
 * FUTUREPROOF course data generated from syllabus source.
 * Source: /Users/rileywarren/Downloads/futureproof-syllabus.docx
 */

/**
 * @typedef {Object} Resource
 * @property {'course'|'book'|'article'|'documentation'|'tool'|'practice'|'video'} type
 * @property {string} name
 * @property {string|null} url
 * @property {boolean} isPrimary
 * @property {string=} estimatedTime
 */

export const COURSE = {
  "title": "FUTUREPROOF",
  "subtitle": "A Senior Security Professional's Roadmap to Lasting Relevance",
  "version": "1.0",
  "totalEstimatedHours": 312,
  "tracks": [
    {
      "id": "ai-automation",
      "shortId": "ai",
      "title": "AI & Intelligent Automation",
      "icon": "⚡",
      "color": "#E8FF47",
      "colorMuted": "#E8FF4722",
      "monthRanges": {
        "1": [
          1,
          2
        ],
        "2": [
          3,
          4
        ],
        "3": [
          5,
          8
        ]
      },
      "subtitle": "From AI Consumer to AI Architect",
      "description": "This track transforms you from someone who uses AI tools into someone who builds, evaluates, and governs AI systems. Your GRC background is the differentiator — most AI builders don't understand risk, and most risk professionals can't build. By the end of this track, you can do both. This is the rarest and most valuable combination in the market right now.",
      "phases": [
        {
          "id": "ai-phase-1",
          "order": 1,
          "title": "Phase 1: Applied AI Foundations",
          "timeframe": "Weeks 1–4",
          "objective": "Build working mental models of how modern AI actually works — not theory for theory's sake, but enough to make engineering and governance decisions with confidence.",
          "timelineStartMonth": 1,
          "timelineEndMonth": 2,
          "modules": [
            {
              "id": "ai-1-1",
              "originalNumber": "1.1",
              "title": "How LLMs Actually Work",
              "duration": "~8 hours",
              "durationHours": 8,
              "description": "Transformers, attention mechanisms, tokenization, embeddings, and inference. The goal isn't to become an ML researcher — it's to develop the intuition that lets you evaluate AI systems, spot limitations, and call BS when vendors oversell capabilities. You'll understand why hallucination happens, why context windows matter, and why some tasks are fundamentally hard for current models.",
              "resources": [
                {
                  "type": "video",
                  "name": "Andrej Karpathy — Neural Networks: Zero to Hero (YouTube series)",
                  "url": "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "The Illustrated Transformer — Jay Alammar (jalammar.github.io)",
                  "url": "https://jalammar.github.io/illustrated-transformer/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Anthropic's Research on Mechanistic Interpretability",
                  "url": "https://www.anthropic.com/research",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "3Blue1Brown — Neural Networks series (visual intuition)",
                  "url": "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Chip Huyen — Designing Machine Learning Systems (Chapter 1-3)",
                  "url": "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Written analysis (1,500–2,000 words): Take a real security use case from your GRC work. Explain how an LLM would process it — what it can handle, what it can't, and why. Include a section on where the model's limitations create risk. This builds the judgment muscle you'll rely on for the rest of the course.",
              "deliverableType": "code"
            },
            {
              "id": "ai-1-2",
              "originalNumber": "1.2",
              "title": "Prompt Engineering as a Professional Discipline",
              "duration": "~10 hours",
              "durationHours": 10,
              "description": "Systematic prompt design: chain-of-thought reasoning, few-shot learning, system prompts, structured output extraction, role prompting, and prompt chaining. This isn't about tricks — it's the interface layer between your domain expertise and AI capability. The best prompt engineers are domain experts who know how to communicate precisely, which gives you a natural advantage.",
              "resources": [
                {
                  "type": "documentation",
                  "name": "Anthropic Prompt Engineering Guide (docs.anthropic.com)",
                  "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "DeepLearning.AI — ChatGPT Prompt Engineering for Developers",
                  "url": "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "OpenAI Prompt Engineering Best Practices",
                  "url": "https://platform.openai.com/docs/guides/prompt-engineering",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Lilian Weng — Prompt Engineering (lilianweng.github.io)",
                  "url": "https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "Dair.ai — Prompt Engineering Guide (promptingguide.ai)",
                  "url": "https://www.promptingguide.ai/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Build a GRC Prompt Library: minimum 15 production-quality prompts covering policy review, risk assessment drafting, control mapping, evidence evaluation, vendor questionnaire analysis, and audit finding summarization. Each prompt must include: the system prompt, example input, expected output format, 3+ edge case tests, and a failure analysis documenting what breaks.",
              "deliverableType": "code"
            },
            {
              "id": "ai-1-3",
              "originalNumber": "1.3",
              "title": "AI Agents, Tool Use & Orchestration",
              "duration": "~10 hours",
              "durationHours": 10,
              "description": "Understand agentic AI — how models use tools, chain actions, make decisions, and operate with increasing autonomy. This is where AI stops being a chatbot and starts being a coworker. You'll learn the architectures (ReAct, function calling, multi-agent systems) and when each pattern is appropriate. Critical for understanding both the capability and the risk of autonomous AI systems.",
              "resources": [
                {
                  "type": "documentation",
                  "name": "Anthropic Tool Use Documentation (docs.anthropic.com)",
                  "url": "https://docs.anthropic.com/en/docs/build-with-claude/tool-use",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "LangChain / LangGraph Agent Documentation",
                  "url": "https://langchain-ai.github.io/langgraph/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "DeepLearning.AI — AI Agents in LangGraph",
                  "url": "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Andrew Ng — Agentic Design Patterns (deeplearning.ai)",
                  "url": "https://www.deeplearning.ai/short-courses/ai-agentic-design-patterns-with-autogen/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Lilian Weng — LLM Powered Autonomous Agents",
                  "url": "https://lilianweng.github.io/posts/2023-06-23-agent/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Build a working agent (using Claude API + tool use) that takes a compliance framework (NIST CSF or ISO 27001), reads an uploaded policy document, and produces a structured gap analysis with severity ratings. The agent should use at least 3 tools (file reader, web search for framework references, structured output formatter).",
              "deliverableType": "code"
            },
            {
              "id": "ai-1-4",
              "originalNumber": "1.4",
              "title": "The AI Ecosystem & Model Evaluation",
              "duration": "~6 hours",
              "durationHours": 6,
              "description": "Survey the landscape: foundation models (Claude, GPT, Gemini, Llama, Mistral), open vs. closed source tradeoffs, fine-tuning vs. RAG vs. prompt engineering, model benchmarks and how to interpret them, cost/performance tradeoffs. Know enough to make procurement and architecture decisions.",
              "resources": [
                {
                  "type": "documentation",
                  "name": "Artificial Analysis — Model Benchmarks & Comparisons (artificialanalysis.ai)",
                  "url": "https://artificialanalysis.ai/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Chatbot Arena Leaderboard (lmarena.ai)",
                  "url": "https://lmarena.ai/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Hugging Face Open LLM Leaderboard",
                  "url": "https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Simon Willison's Blog — LLM landscape analysis",
                  "url": "https://simonwillison.net/tags/llms/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Stanford HAI — AI Index Report (latest)",
                  "url": "https://hai.stanford.edu/ai-index",
                  "isPrimary": true
                }
              ],
              "deliverable": "Create a Model Evaluation Framework: a structured decision matrix for selecting AI models for enterprise security use cases. Include criteria for: accuracy, cost, latency, data privacy, compliance requirements, vendor risk, and deployment options. Apply it to 3 different GRC use cases with justified recommendations.",
              "deliverableType": "document"
            }
          ]
        },
        {
          "id": "ai-phase-2",
          "order": 2,
          "title": "Phase 2: Building AI-Powered Security Tools",
          "timeframe": "Weeks 5–10",
          "objective": "Ship real tools. Your OSCP proves you can hack; now prove you can build AI systems that solve security problems. Every module produces working software.",
          "timelineStartMonth": 3,
          "timelineEndMonth": 4,
          "modules": [
            {
              "id": "ai-2-1",
              "originalNumber": "2.1",
              "title": "Python for AI Security Applications",
              "duration": "~12 hours",
              "durationHours": 12,
              "description": "You can code — now sharpen the specific skills needed for AI integration: API consumption patterns, async programming for concurrent API calls, data pipelines with pandas, the AI Python ecosystem (langchain, instructor, pydantic, httpx), and proper error handling for non-deterministic systems. Also covers testing strategies for AI-powered code.",
              "resources": [
                {
                  "type": "tool",
                  "name": "Instructor Library — Structured Outputs from LLMs (python.useinstructor.com)",
                  "url": "https://python.useinstructor.com/",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "Pydantic V2 Documentation (docs.pydantic.dev)",
                  "url": "https://docs.pydantic.dev/latest/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "httpx — Async HTTP client for Python",
                  "url": "https://www.python-httpx.org/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "pytest — Testing AI applications (non-deterministic output strategies)",
                  "url": "https://docs.pytest.org/en/stable/",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "Typer — CLI application framework",
                  "url": "https://typer.tiangolo.com/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Build a CLI tool that ingests a SOC 2 Type II report (PDF), uses AI to extract key findings, maps them to control categories, assigns severity ratings, and outputs a structured risk summary in JSON and markdown formats. Must include proper error handling, retry logic, and cost estimation.",
              "deliverableType": "code"
            },
            {
              "id": "ai-2-2",
              "originalNumber": "2.2",
              "title": "RAG Systems for Compliance & Policy Intelligence",
              "duration": "~15 hours",
              "durationHours": 15,
              "description": "Retrieval-Augmented Generation — the architecture pattern that makes AI actually useful for enterprise security. Covers: document chunking strategies, embedding models, vector databases, hybrid search (semantic + keyword), retrieval evaluation, re-ranking, and citation generation. This is the most immediately deployable AI pattern for GRC.",
              "resources": [
                {
                  "type": "documentation",
                  "name": "Anthropic's Contextual Retrieval Guide",
                  "url": "https://docs.anthropic.com/en/docs/build-with-claude/context-windows",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "DeepLearning.AI — Building & Evaluating Advanced RAG",
                  "url": "https://www.deeplearning.ai/short-courses/building-and-evaluating-advanced-rag-applications/",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "ChromaDB Documentation (docs.trychroma.com)",
                  "url": "https://docs.trychroma.com/",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "LlamaIndex Documentation — especially the RAG evaluation framework",
                  "url": "https://docs.llamaindex.ai/",
                  "isPrimary": true
                },
                {
                  "type": "video",
                  "name": "Jerry Liu — Building Production RAG (conference talks)",
                  "url": "https://www.youtube.com/results?search_query=Jerry+Liu+production+RAG",
                  "isPrimary": true
                }
              ],
              "deliverable": "Build a production-grade RAG system over a compliance framework (ISO 27001 controls + organizational policies). Requirements: natural language query interface, cited responses with source references, confidence scoring, admin interface for document management, and evaluation suite measuring retrieval precision/recall and answer quality.",
              "deliverableType": "code"
            },
            {
              "id": "ai-2-3",
              "originalNumber": "2.3",
              "title": "Automating GRC Workflows End-to-End",
              "duration": "~12 hours",
              "durationHours": 12,
              "description": "Identify the highest-leverage repetitive tasks in GRC and automate them intelligently. Evidence collection, control testing, risk scoring, vendor assessments, policy reviews — all have automation potential. Covers workflow orchestration (n8n, Temporal), human-in-the-loop patterns, and knowing when NOT to automate.",
              "resources": [
                {
                  "type": "tool",
                  "name": "n8n — Workflow automation platform (n8n.io)",
                  "url": "https://n8n.io/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Temporal — Durable workflow orchestration",
                  "url": "https://temporal.io/",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "Claude Code — Agentic Coding Documentation",
                  "url": "https://docs.anthropic.com/en/docs/claude-code/overview",
                  "isPrimary": true
                },
                {
                  "type": "practice",
                  "name": "Map your current GRC workflows and identify automation candidates (self-directed)",
                  "url": "#/settings#self-directed-guidance",
                  "isPrimary": true
                },
                {
                  "type": "tool",
                  "name": "Zapier / Make.com for rapid prototyping",
                  "url": "https://zapier.com/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Automate a complete vendor risk assessment workflow: intake questionnaire generation → AI-powered response analysis → automated risk scoring using a defined rubric → draft assessment report → human review queue. Document the architecture, decision points, and where human judgment remains essential.",
              "deliverableType": "document"
            },
            {
              "id": "ai-2-4",
              "originalNumber": "2.4",
              "title": "Building Internal AI Tools with Web Interfaces",
              "duration": "~10 hours",
              "durationHours": 10,
              "description": "Make your tools usable by non-technical teammates. Covers rapid UI development with frameworks like Streamlit, Gradio, or React, authentication basics, deployment patterns (containerization, cloud hosting), and the UX principles that determine whether your tool gets adopted or ignored.",
              "resources": [
                {
                  "type": "documentation",
                  "name": "Streamlit Documentation (streamlit.io)",
                  "url": "https://docs.streamlit.io/",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "Gradio Documentation (gradio.app)",
                  "url": "https://www.gradio.app/docs",
                  "isPrimary": true
                },
                {
                  "type": "tool",
                  "name": "FastAPI for backend services",
                  "url": "https://fastapi.tiangolo.com/",
                  "isPrimary": true
                },
                {
                  "type": "tool",
                  "name": "Docker fundamentals for deployment",
                  "url": "https://docs.docker.com/get-started/",
                  "isPrimary": true
                },
                {
                  "type": "tool",
                  "name": "Basic UX principles for internal tools",
                  "url": "https://www.nngroup.com/articles/ten-usability-heuristics/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Take your RAG system or vendor assessment tool from previous modules and give it a web interface. Deploy it in a container. Write a one-page 'user guide' for a non-technical GRC analyst to use it. Get feedback from at least one colleague.",
              "deliverableType": "code"
            }
          ]
        },
        {
          "id": "ai-phase-3",
          "order": 3,
          "title": "Phase 3: AI Governance & Risk — Your Superpower Zone",
          "timeframe": "Weeks 11–16",
          "objective": "This is where your GRC background becomes a massive competitive advantage. The demand for people who can both build AI and govern it responsibly is exploding — and supply is almost nonexistent.",
          "timelineStartMonth": 5,
          "timelineEndMonth": 8,
          "modules": [
            {
              "id": "ai-3-1",
              "originalNumber": "3.1",
              "title": "AI Risk Management Frameworks",
              "duration": "~12 hours",
              "durationHours": 12,
              "description": "NIST AI RMF, EU AI Act, ISO/IEC 42001, the emerging patchwork of state-level AI legislation, and sector-specific requirements (healthcare, financial services, government). You're uniquely positioned to bridge the gap between AI engineering teams and compliance requirements. This module makes you the translator.",
              "resources": [
                {
                  "type": "documentation",
                  "name": "NIST AI Risk Management Framework (AI 100-1)",
                  "url": "https://www.nist.gov/itl/ai-risk-management-framework",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "EU AI Act — Full Text and Compliance Guidance (artificialintelligenceact.eu)",
                  "url": "https://artificialintelligenceact.eu/",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "ISO/IEC 42001 — AI Management Systems Standard",
                  "url": "https://www.iso.org/standard/81230.html",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "NIST AI 600-1 — Generative AI Profile",
                  "url": "https://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-generative-ai-profile",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "FedRAMP AI guidance (for government sector)",
                  "url": "https://www.fedramp.gov/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "State-level AI legislation tracker (IAPP or similar)",
                  "url": "https://iapp.org/resources/article/us-state-ai-governance-legislation-tracker/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Draft a comprehensive AI Governance Policy for a mid-size enterprise. Include: AI risk classification taxonomy (aligned to EU AI Act risk tiers), model evaluation and approval criteria, data governance requirements for AI training data, monitoring and incident response procedures for AI systems, roles and responsibilities (AI governance committee structure), and third-party AI vendor assessment criteria.",
              "deliverableType": "strategy"
            },
            {
              "id": "ai-3-2",
              "originalNumber": "3.2",
              "title": "AI Red Teaming & Adversarial Security",
              "duration": "~15 hours",
              "durationHours": 15,
              "description": "Your OSCP meets AI. Prompt injection (direct and indirect), jailbreaking techniques, data poisoning, model theft and extraction, adversarial examples, supply chain attacks on ML pipelines, and membership inference attacks. The OWASP Top 10 for LLMs becomes your new playbook. You already think like an attacker — now apply that mindset to AI systems.",
              "resources": [
                {
                  "type": "article",
                  "name": "OWASP Top 10 for LLM Applications (2025 edition)",
                  "url": "https://genai.owasp.org/llm-top-10/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "MITRE ATLAS — Adversarial Threat Landscape for AI Systems",
                  "url": "https://atlas.mitre.org/",
                  "isPrimary": true
                },
                {
                  "type": "practice",
                  "name": "Gandalf AI Red Teaming Challenge (gandalf.lakera.ai)",
                  "url": "https://gandalf.lakera.ai/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "HackAPrompt — Prompt Injection competition",
                  "url": "https://www.hackaprompt.com/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Trail of Bits — AI/ML Security Research",
                  "url": "https://blog.trailofbits.com/tags/machine-learning/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "NIST AI 100-2 — Adversarial Machine Learning",
                  "url": "https://www.nist.gov/publications/adversarial-machine-learning-taxonomy-and-terminology-artificial-intelligence",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Anthropic's research on model safety and jailbreaking",
                  "url": "https://www.anthropic.com/research",
                  "isPrimary": true
                }
              ],
              "deliverable": "Red team your own RAG system from Phase 2. Produce a pentest-style report including: methodology, findings with severity ratings (develop a CVSS-equivalent scoring system adapted for AI-specific risks), proof-of-concept exploits, remediation recommendations, and a reusable AI red teaming methodology that your organization could adopt.",
              "deliverableType": "document"
            },
            {
              "id": "ai-3-3",
              "originalNumber": "3.3",
              "title": "Responsible AI Operations",
              "duration": "~10 hours",
              "durationHours": 10,
              "description": "Bias testing and mitigation, fairness metrics, transparency and explainability requirements, accountability frameworks, AI incident management, model monitoring and drift detection, and the ethics of autonomous decision-making. Not just buzzwords — operational requirements you'll need to implement, audit, and defend to regulators.",
              "resources": [
                {
                  "type": "article",
                  "name": "Anthropic's Core Views on AI Safety",
                  "url": "https://www.anthropic.com/news/core-views-on-ai-safety",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Google's Responsible AI Practices & Model Cards",
                  "url": "https://ai.google/responsibilities/responsible-ai-practices/",
                  "isPrimary": true
                },
                {
                  "type": "tool",
                  "name": "IBM AI Fairness 360 Toolkit",
                  "url": "https://github.com/Trusted-AI/AIF360",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "Microsoft Responsible AI Standard",
                  "url": "https://www.microsoft.com/en-us/ai/principles-and-approach",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Partnership on AI — Best Practices",
                  "url": "https://partnershiponai.org/",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "Algorithmic Impact Assessments — methodology guides",
                  "url": "https://www.aialliance.org/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Design a Responsible AI Audit Playbook: a complete, reusable audit program that a GRC team could use to evaluate any AI deployment. Include: audit scope and objectives template, bias testing procedures with specific metrics, data governance assessment criteria, explainability evaluation framework, ongoing monitoring requirements and KPIs, incident response procedures for AI-specific failures, and a maturity model for organizational AI responsibility (5 levels).",
              "deliverableType": "document"
            },
            {
              "id": "ai-3-4",
              "originalNumber": "3.4",
              "title": "AI Governance Program Design (Capstone)",
              "duration": "~15 hours",
              "durationHours": 15,
              "description": "Integrate everything from this track into a complete, board-ready AI governance program. This is your portfolio piece — the deliverable that demonstrates you can lead AI governance at the enterprise level.",
              "resources": [
                {
                  "type": "article",
                  "name": "All previous module outputs",
                  "url": "#/module/ai-3-4",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "World Economic Forum — AI Governance Alliance resources",
                  "url": "https://initiatives.weforum.org/ai-governance-alliance/home",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "OECD AI Policy Observatory",
                  "url": "https://oecd.ai/en/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Board-level AI governance presentations from Fortune 500 companies",
                  "url": "https://www.sec.gov/edgar/search/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Gartner / Forrester AI governance maturity models",
                  "url": "https://www.gartner.com/en/topics/ai-governance",
                  "isPrimary": true
                }
              ],
              "deliverable": "Complete AI Governance Program Package: (1) Executive summary and business case for AI governance, (2) AI risk framework with classification taxonomy, (3) AI policy suite (acceptable use, development, procurement, monitoring), (4) AI red teaming and security program, (5) Responsible AI audit program, (6) Roles, responsibilities, and governance committee charter, (7) Implementation roadmap with 30/60/90/180-day milestones, (8) Metrics and reporting framework for board and executive reporting.",
              "deliverableType": "strategy"
            }
          ]
        }
      ]
    },
    {
      "id": "cyber",
      "shortId": "cyber",
      "title": "Next-Generation Cybersecurity",
      "icon": "🛡️",
      "color": "#47E8FF",
      "colorMuted": "#47E8FF22",
      "monthRanges": {
        "1": [
          5,
          8
        ],
        "2": [
          9,
          10
        ]
      },
      "subtitle": "Staying on the Cutting Edge",
      "description": "Your OSCP, CCSP, CISSP, and CCNA give you a strong foundation in core security domains. This track pushes you into the areas that will define cybersecurity for the next decade: cloud-native architectures, zero trust implementation, AI-augmented offense and defense, and post-quantum cryptography. Every module assumes senior-level baseline knowledge and focuses on the frontier.",
      "phases": [
        {
          "id": "cyber-phase-1",
          "order": 1,
          "title": "Phase 1: Cloud-Native & Zero Trust Architecture",
          "timeframe": "Weeks 1–8",
          "objective": "Move from understanding cloud security concepts (CCSP-level) to designing and implementing cloud-native security architectures. Hands-on, not theoretical.",
          "timelineStartMonth": 5,
          "timelineEndMonth": 8,
          "modules": [
            {
              "id": "cyber-1-1",
              "originalNumber": "1.1",
              "title": "Zero Trust Architecture: Design & Implementation",
              "duration": "~15 hours",
              "durationHours": 15,
              "description": "NIST SP 800-207 in practice, not in a study guide. Identity-centric security, microsegmentation, continuous verification, software-defined perimeters, and the real-world challenges of implementing zero trust in hybrid environments. Covers the political and organizational dimensions too — zero trust is as much a cultural change as a technical one.",
              "resources": [
                {
                  "type": "article",
                  "name": "NIST SP 800-207 — Zero Trust Architecture",
                  "url": "https://csrc.nist.gov/publications/detail/sp/800-207/final",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "CISA Zero Trust Maturity Model v2.0",
                  "url": "https://www.cisa.gov/zero-trust-maturity-model",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "SANS SEC530 — Defensible Security Architecture and Engineering",
                  "url": "https://www.sans.org/cyber-security-courses/defensible-security-architecture-and-engineering/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Google BeyondCorp papers (original and follow-ups)",
                  "url": "https://research.google/pubs/beyondcorp-a-new-approach-to-enterprise-security/",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "Zscaler / Cloudflare Zero Trust architecture guides (vendor-specific but instructive)",
                  "url": "https://www.cloudflare.com/learning/access-management/what-is-zero-trust/",
                  "isPrimary": true
                },
                {
                  "type": "book",
                  "name": "Evan Gilman & Doug Barth — Zero Trust Networks (O'Reilly)",
                  "url": "https://www.oreilly.com/library/view/zero-trust-networks/9781491962183/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Design a zero trust architecture for a hybrid cloud organization (5,000 employees, AWS + Azure, legacy on-prem apps). Produce: (1) Architecture design document with identity flows, network segmentation maps, and monitoring strategy, (2) Migration plan from current perimeter-based model to zero trust in 4 phases, (3) Technology selection rationale, (4) Success criteria and metrics.",
              "deliverableType": "strategy"
            },
            {
              "id": "cyber-1-2",
              "originalNumber": "1.2",
              "title": "Cloud Security Engineering & DevSecOps",
              "duration": "~15 hours",
              "durationHours": 15,
              "description": "Infrastructure as Code security (Terraform, CloudFormation), container security (Docker, runtime scanning), Kubernetes hardening (CIS benchmarks, network policies, RBAC), CSPM, CWPP, and CI/CD pipeline security. Move from understanding cloud risks to engineering cloud defenses. Your CCSP gives you the 'what' — this module gives you the 'how.'",
              "resources": [
                {
                  "type": "documentation",
                  "name": "CIS Benchmarks for AWS, Azure, and GCP",
                  "url": "https://www.cisecurity.org/cis-benchmarks",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Practical DevSecOps — Certified DevSecOps Professional (CDP)",
                  "url": "https://www.practical-devsecops.com/certified-devsecops-professional/",
                  "isPrimary": true
                },
                {
                  "type": "book",
                  "name": "Kubernetes Security — Liz Rice (O'Reilly)",
                  "url": "https://www.oreilly.com/library/view/kubernetes-security/9781492039075/",
                  "isPrimary": true
                },
                {
                  "type": "tool",
                  "name": "Terraform security scanning tools (tfsec, checkov, snyk)",
                  "url": "https://developer.hashicorp.com/terraform/cli/commands/validate",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "AWS Well-Architected Security Pillar / Azure Security Benchmark",
                  "url": "https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "SANS SEC540 — Cloud Security and DevSecOps Automation",
                  "url": "https://www.sans.org/cyber-security-courses/cloud-security-devsecops-automation/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Build a CI/CD pipeline with comprehensive security gates: SAST (Semgrep), DAST (ZAP), SCA (Snyk/Trivy), container image scanning, IaC scanning (Checkov), secrets detection (Gitleaks). Include: pipeline configuration files, security gate policies (what blocks a build vs. warns), dashboard for security metrics, and a runbook for responding to pipeline security findings.",
              "deliverableType": "code"
            },
            {
              "id": "cyber-1-3",
              "originalNumber": "1.3",
              "title": "Software Supply Chain Security",
              "duration": "~10 hours",
              "durationHours": 10,
              "description": "SBOMs, dependency management, third-party risk at the code level, SLSA framework, sigstore, in-toto attestations. SolarWinds, Log4j, and XZ Utils changed the industry — supply chain security is now a board-level concern and a regulatory requirement. This is a rapidly growing specialty with too few experts.",
              "resources": [
                {
                  "type": "documentation",
                  "name": "NIST SSDF — Secure Software Development Framework (SP 800-218)",
                  "url": "https://csrc.nist.gov/publications/detail/sp/800-218/final",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "SLSA Framework — Supply Chain Levels for Software Artifacts (slsa.dev)",
                  "url": "https://slsa.dev/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "OpenSSF Scorecard (securityscorecards.dev)",
                  "url": "https://securityscorecards.dev/",
                  "isPrimary": true
                },
                {
                  "type": "tool",
                  "name": "CISA SBOM guidance and tooling",
                  "url": "https://www.cisa.gov/sbom",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Sigstore project — software signing and verification",
                  "url": "https://www.sigstore.dev/",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "In-toto — Supply chain integrity framework",
                  "url": "https://in-toto.io/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Perform a supply chain security assessment of a significant open-source project. Deliverables: (1) Generated SBOMs (CycloneDX and SPDX formats), (2) Dependency analysis with risk scoring, (3) SLSA level assessment, (4) OpenSSF Scorecard analysis, (5) Report with findings and remediation recommendations, (6) Template and methodology guide that could be reused for any project.",
              "deliverableType": "document"
            },
            {
              "id": "cyber-1-4",
              "originalNumber": "1.4",
              "title": "API Security & Modern Application Architecture",
              "duration": "~10 hours",
              "durationHours": 10,
              "description": "APIs are the new network perimeter. REST, GraphQL, gRPC security patterns, OAuth 2.0 / OIDC deep dive, API gateway security, rate limiting, and the OWASP API Security Top 10. As organizations move to microservices and API-first architectures, API security becomes foundational.",
              "resources": [
                {
                  "type": "article",
                  "name": "OWASP API Security Top 10 (2023)",
                  "url": "https://owasp.org/API-Security/editions/2023/en/0x00-header/",
                  "isPrimary": true
                },
                {
                  "type": "course",
                  "name": "APIsec University (free courses)",
                  "url": "https://www.apisecuniversity.com/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "OAuth 2.0 Simplified (oauth.com)",
                  "url": "https://www.oauth.com/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Hacking APIs — Corey J. Ball (No Starch Press)",
                  "url": "https://nostarch.com/hacking-apis",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "SANS SEC522 — Application Security",
                  "url": "https://www.sans.org/cyber-security-courses/application-security-securing-web-apps-apis-microservices/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Design an API security architecture for a microservices environment: authentication/authorization strategy, API gateway configuration, rate limiting and throttling policies, input validation framework, logging and monitoring requirements, and an API security testing checklist.",
              "deliverableType": "strategy"
            }
          ]
        },
        {
          "id": "cyber-phase-2",
          "order": 2,
          "title": "Phase 2: Offensive AI & Emerging Threats",
          "timeframe": "Weeks 9–16",
          "objective": "Understand how attackers will use AI, how quantum computing changes cryptography, and how defenders need to adapt. This is the frontier of cybersecurity.",
          "timelineStartMonth": 9,
          "timelineEndMonth": 10,
          "modules": [
            {
              "id": "cyber-2-1",
              "originalNumber": "2.1",
              "title": "AI-Powered Offensive Security",
              "duration": "~12 hours",
              "durationHours": 12,
              "description": "AI-generated phishing at scale, automated vulnerability discovery and exploitation, deepfakes for social engineering, voice cloning attacks, autonomous attack agents, and AI-powered malware that adapts to defenses. The threat landscape is changing fundamentally — understand the shift to defend against it.",
              "resources": [
                {
                  "type": "article",
                  "name": "MITRE ATLAS — AI Adversarial Threat Matrix",
                  "url": "https://atlas.mitre.org/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Research papers on AI-powered cyberattacks (arXiv, conference proceedings)",
                  "url": "https://arxiv.org/search/?query=AI+cybersecurity+attacks&searchtype=all",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Europol — AI in Criminal Tactics reports",
                  "url": "https://www.europol.europa.eu/publications-events",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "Daniel Miessler — AI security threat modeling frameworks",
                  "url": "https://danielmiessler.com/",
                  "isPrimary": true
                },
                {
                  "type": "practice",
                  "name": "Experiment with AI-assisted authorized penetration testing (your OSCP labs)",
                  "url": "#/settings#self-directed-guidance",
                  "isPrimary": true
                }
              ],
              "deliverable": "Write a comprehensive threat assessment: 'How AI Transforms the Cyber Threat Landscape for [your industry].' Include: (1) Specific AI-powered attack scenarios with kill chains, (2) Likelihood and impact assessments using FAIR methodology, (3) Current defensive gaps, (4) Recommended countermeasures and detection strategies, (5) Timeline projections for when each threat becomes mainstream.",
              "deliverableType": "document"
            },
            {
              "id": "cyber-2-2",
              "originalNumber": "2.2",
              "title": "AI-Augmented Detection & Response",
              "duration": "~12 hours",
              "durationHours": 12,
              "description": "Modern detection engineering, SIGMA rules, detection-as-code, and the detection engineering lifecycle. Then layer in AI: anomaly detection, automated alert triage and enrichment, AI-assisted threat hunting, and natural language interfaces to security data. The SOC of the future will be AI-augmented — understand how to build it.",
              "resources": [
                {
                  "type": "article",
                  "name": "SIGMA rules and detection engineering (sigmahq.io)",
                  "url": "https://sigmahq.io/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "SANS SEC555 — SIEM with Tactical Analytics",
                  "url": "https://www.sans.org/cyber-security-courses/siem-with-tactical-analytics/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Florian Roth — Detection Engineering methodology",
                  "url": "https://www.nextron-systems.com/",
                  "isPrimary": true
                },
                {
                  "type": "practice",
                  "name": "Elastic Security Labs — ML-based detection resources",
                  "url": "https://www.elastic.co/security-labs",
                  "isPrimary": true
                },
                {
                  "type": "tool",
                  "name": "Build AI-powered log analysis tools (self-directed, using Phase 1 AI skills)",
                  "url": "#/settings#self-directed-guidance",
                  "isPrimary": true
                }
              ],
              "deliverable": "Build an AI-assisted threat hunting tool: ingest sample security logs (can use BOTS dataset or similar), use AI to identify anomalies and suspicious patterns, generate investigation hypotheses with evidence chains, and produce investigation playbooks. Include an evaluation of the tool's false positive rate and detection coverage.",
              "deliverableType": "code"
            },
            {
              "id": "cyber-2-3",
              "originalNumber": "2.3",
              "title": "Post-Quantum Cryptography & Crypto Agility",
              "duration": "~10 hours",
              "durationHours": 10,
              "description": "The quantum threat timeline is debated, but the migration is happening now. NIST PQC standards (ML-KEM, ML-DSA, SLH-DSA), crypto agility as an architectural principle, the 'harvest now, decrypt later' threat, and practical migration planning. This is a 5-10 year initiative for most organizations — getting ahead of it now is a career differentiator.",
              "resources": [
                {
                  "type": "documentation",
                  "name": "NIST Post-Quantum Cryptography Standards (FIPS 203, 204, 205)",
                  "url": "https://csrc.nist.gov/projects/post-quantum-cryptography",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "NSA CNSA 2.0 Algorithm Guidance",
                  "url": "https://media.defense.gov/2022/Sep/07/2003071838/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF",
                  "isPrimary": true
                },
                {
                  "type": "tool",
                  "name": "IBM Quantum Learning platform",
                  "url": "https://learning.quantum.ibm.com/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Cloudflare — PQC migration blog series",
                  "url": "https://blog.cloudflare.com/tag/post-quantum-cryptography/",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "ETSI Quantum-Safe Cryptography standards",
                  "url": "https://www.etsi.org/technologies/quantum-safe-cryptography",
                  "isPrimary": true
                }
              ],
              "deliverable": "Develop a post-quantum cryptography migration roadmap for an enterprise: (1) Cryptographic inventory of current algorithm usage across the organization, (2) Risk assessment using 'harvest now, decrypt later' threat model, (3) Prioritized migration plan (what to migrate first and why), (4) Crypto agility architecture recommendations, (5) Testing and validation strategy for PQC algorithms, (6) Budget estimation and business case.",
              "deliverableType": "strategy"
            },
            {
              "id": "cyber-2-4",
              "originalNumber": "2.4",
              "title": "Identity Security & Attack Path Analysis",
              "duration": "~10 hours",
              "durationHours": 10,
              "description": "Identity is the new perimeter. Active Directory / Entra ID attack paths, privilege escalation in cloud environments, identity threat detection and response (ITDR), and attack path analysis tools. With your OSCP background, you understand the attacker's perspective — now formalize that into enterprise identity security strategy.",
              "resources": [
                {
                  "type": "tool",
                  "name": "SpecterOps — BloodHound Enterprise and attack path theory",
                  "url": "https://specterops.io/bloodhound-enterprise/",
                  "isPrimary": true
                },
                {
                  "type": "video",
                  "name": "Andy Robbins — attack path analysis talks and papers",
                  "url": "https://www.specterops.io/team/andy-robbins/",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "Microsoft ITDR documentation",
                  "url": "https://learn.microsoft.com/en-us/security/itdr/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "CrowdStrike / SentinelOne identity threat detection resources",
                  "url": "https://www.crowdstrike.com/en-us/cybersecurity-101/identity-protection/identity-threat-detection-and-response-itdr/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "SANS SEC560 — Network Penetration Testing (identity-focused sections)",
                  "url": "https://www.sans.org/cyber-security-courses/enterprise-penetration-testing/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Perform an identity security assessment (in a lab environment or your organization with authorization): (1) Map attack paths from standard user to domain admin, (2) Identify tier 0 assets and their exposure, (3) Produce an identity security hardening guide, (4) Design an ITDR monitoring strategy with specific detection rules.",
              "deliverableType": "strategy"
            }
          ]
        }
      ]
    },
    {
      "id": "leadership",
      "shortId": "lead",
      "title": "Strategic Leadership & Executive Readiness",
      "icon": "🎯",
      "color": "#FF47E8",
      "colorMuted": "#FF47E822",
      "monthRanges": {
        "1": [
          1,
          4
        ],
        "2": [
          5,
          10
        ]
      },
      "subtitle": "From Practitioner to Decision-Maker",
      "description": "Your MBA gives you business acumen. Your certifications give you credibility. This track builds the leadership skills that put you in the room where decisions are made. Whether you're targeting CISO, VP of Security, or an advisory/board role, these skills are what separate senior individual contributors from executives who shape organizational strategy.",
      "phases": [
        {
          "id": "lead-phase-1",
          "order": 1,
          "title": "Phase 1: Executive Communication & Business Alignment",
          "timeframe": "Weeks 1–8",
          "objective": "Learn to translate technical risk into business language. The security leader who can talk to the board is worth 10x the one who can't. This phase makes you fluent in both languages.",
          "timelineStartMonth": 1,
          "timelineEndMonth": 4,
          "modules": [
            {
              "id": "lead-1-1",
              "originalNumber": "1.1",
              "title": "Board-Level Risk Communication & FAIR Methodology",
              "duration": "~15 hours",
              "durationHours": 15,
              "description": "How to present cyber risk to non-technical executives and board members. Quantitative risk analysis using the FAIR (Factor Analysis of Information Risk) methodology, risk appetite frameworks, and the art of the 5-minute board briefing. Covers the psychology of executive decision-making and how to frame security as a business enabler, not a cost center.",
              "resources": [
                {
                  "type": "course",
                  "name": "FAIR Institute resources and training (fairinstitute.org)",
                  "url": "https://www.fairinstitute.org/",
                  "isPrimary": true
                },
                {
                  "type": "course",
                  "name": "Open FAIR Certification program",
                  "url": "https://www.opengroup.org/certifications/openfair",
                  "isPrimary": true
                },
                {
                  "type": "book",
                  "name": "NACD Director's Handbook on Cyber-Risk Oversight",
                  "url": "https://www.nacdonline.org/insights/publications/directors-handbook-on-cyber-risk-oversight/",
                  "isPrimary": true
                },
                {
                  "type": "book",
                  "name": "Jack Jones — Measuring and Managing Information Risk (book)",
                  "url": "https://www.risklens.com/resources/books/measuring-and-managing-information-risk",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Richard Seiersen — How to Measure Anything in Cybersecurity Risk",
                  "url": "https://www.wiley.com/en-us/How+to+Measure+Anything+in+Cybersecurity+Risk-p-9781119085294",
                  "isPrimary": true
                },
                {
                  "type": "practice",
                  "name": "Study real board-level security presentations (SEC filings, proxy statements)",
                  "url": "https://www.sec.gov/edgar/search/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Take a real or realistic cyber risk scenario from your work. Produce: (1) A FAIR-based quantitative risk analysis with Monte Carlo simulation, (2) A 5-slide board presentation with business-language framing, (3) A one-page executive brief, (4) Three strategic options with trade-offs and cost/benefit analysis. Practice delivering the board presentation in under 5 minutes and get feedback.",
              "deliverableType": "presentation"
            },
            {
              "id": "lead-1-2",
              "originalNumber": "1.2",
              "title": "Security Program Strategy & Metrics",
              "duration": "~12 hours",
              "durationHours": 12,
              "description": "Design security programs that align with business objectives. Covers: security program maturity models, KPI/KRI design, security metrics that executives actually care about, program roadmapping, and budget justification. The goal is to think and communicate like a business leader who happens to be an expert in security.",
              "resources": [
                {
                  "type": "article",
                  "name": "NIST CSF 2.0 — especially the governance and program management sections",
                  "url": "https://www.nist.gov/cyberframework",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "CIS Controls v8 — Implementation Groups for program maturity",
                  "url": "https://www.cisecurity.org/controls/v8",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Andrew Jaquith — Security Metrics: Replacing Fear, Uncertainty, and Doubt",
                  "url": "https://www.pearson.com/en-us/subject-catalog/p/security-metrics-replacing-fear-uncertainty-and-doubt/P200000003736/9780321349989",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Gartner security program effectiveness metrics",
                  "url": "https://www.gartner.com/en/information-technology/insights/security",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Phil Venables' blog (philvenables.com) — board-level security strategy",
                  "url": "https://www.philvenables.com/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Design a 3-year security program strategy for an organization: (1) Current state assessment using a maturity model, (2) Target state with business alignment mapping, (3) Strategic roadmap with quarterly milestones, (4) Metrics framework with leading and lagging indicators, (5) Budget model with ROI justification for each major initiative, (6) Risk-based prioritization methodology.",
              "deliverableType": "strategy"
            },
            {
              "id": "lead-1-3",
              "originalNumber": "1.3",
              "title": "Strategic Decision-Making Under Uncertainty",
              "duration": "~10 hours",
              "durationHours": 10,
              "description": "Mental models for security leaders: second-order thinking, inversion, probabilistic reasoning, pre-mortem analysis, and the OODA loop applied to security strategy. How to make better decisions faster with incomplete information — which is every decision in security.",
              "resources": [
                {
                  "type": "article",
                  "name": "Annie Duke — Thinking in Bets",
                  "url": "https://www.penguinrandomhouse.com/books/545847/thinking-in-bets-by-annie-duke/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Richard Rumelt — Good Strategy Bad Strategy",
                  "url": "https://www.goodstrategybadstrategy.com/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Stephen Bungay — The Art of Action",
                  "url": "https://www.amazon.com/Art-Action-Strategy-Management-Business/dp/1857885596",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Shane Parrish — The Great Mental Models (Farnam Street)",
                  "url": "https://fs.blog/mental-models/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Philip Tetlock — Superforecasting",
                  "url": "https://www.penguinrandomhouse.com/books/239482/superforecasting-by-philip-e-tetlock-and-dan-gardner/",
                  "isPrimary": true
                }
              ],
              "deliverable": "Apply a structured decision framework to a real strategic challenge: (1) Define the decision and success criteria, (2) Identify assumptions and unknowns, (3) Analyze using at least 3 mental models, (4) Document your reasoning process transparently, (5) Define leading metrics that would tell you early if the decision was wrong, (6) Create a pre-mortem analysis.",
              "deliverableType": "document"
            },
            {
              "id": "lead-1-4",
              "originalNumber": "1.4",
              "title": "Negotiation & Influence for Security Leaders",
              "duration": "~8 hours",
              "durationHours": 8,
              "description": "Security leaders spend most of their time persuading people to do things they don't want to do — patch systems, follow policies, fund programs. Covers principled negotiation, stakeholder management, building coalitions, managing up, and influencing without authority.",
              "resources": [
                {
                  "type": "article",
                  "name": "Chris Voss — Never Split the Difference",
                  "url": "https://www.harpercollins.com/products/never-split-the-difference-chris-voss-tahl-raz",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Robert Cialdini — Influence: The Psychology of Persuasion",
                  "url": "https://www.influenceatwork.com/book/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Harvard Business Review — articles on influence and negotiation",
                  "url": "https://hbr.org/topic/subject/negotiating",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "William Ury — Getting Past No",
                  "url": "https://www.penguinrandomhouse.com/books/330982/getting-past-no-by-william-ury/",
                  "isPrimary": true
                },
                {
                  "type": "practice",
                  "name": "Observe and document how effective security leaders in your organization persuade stakeholders",
                  "url": "#/settings#self-directed-guidance",
                  "isPrimary": true
                }
              ],
              "deliverable": "Negotiation Case Studies: document 3 real scenarios from your work where you needed to influence a decision. For each: (1) The situation and stakeholders, (2) Your approach and tactics used, (3) The outcome, (4) What you would do differently using frameworks from this module. Then: prepare a persuasion strategy for a current initiative you're trying to advance.",
              "deliverableType": "strategy"
            }
          ]
        },
        {
          "id": "lead-phase-2",
          "order": 2,
          "title": "Phase 2: Thought Leadership & Career Positioning",
          "timeframe": "Weeks 9–16",
          "objective": "The professionals who will thrive aren't just skilled — they're visible. Build your professional brand, expand your influence, and position yourself for the opportunities you want.",
          "timelineStartMonth": 5,
          "timelineEndMonth": 10,
          "modules": [
            {
              "id": "lead-2-1",
              "originalNumber": "2.1",
              "title": "Writing, Speaking & Professional Brand",
              "duration": "~12 hours (then ongoing)",
              "durationHours": 12,
              "description": "Write about what you're learning. Publish consistently. Speaking at conferences. Building a professional brand that opens doors. Teaching is the highest form of learning, and visibility compounds over time. This module creates the habit and the system.",
              "resources": [
                {
                  "type": "practice",
                  "name": "Study how top security leaders communicate: Phil Venables, Wendy Nather, Bruce Schneier, Keren Elazari",
                  "url": "https://www.linkedin.com/",
                  "isPrimary": true
                },
                {
                  "type": "course",
                  "name": "David Perell — Write of Passage (writing course)",
                  "url": "https://writeofpassage.school/",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "CFP submission guides for BSides, ISACA, RSA Conference, Black Hat",
                  "url": "https://www.blackhat.com/call-for-papers.html",
                  "isPrimary": true
                },
                {
                  "type": "book",
                  "name": "Julian Shapiro — Writing Well (handbook)",
                  "url": "https://www.julian.com/guide/write/intro",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "Personal branding frameworks for technical professionals",
                  "url": "https://hbr.org/2014/08/a-new-approach-to-building-your-personal-brand",
                  "isPrimary": true
                }
              ],
              "deliverable": "(1) Publish 4 substantial articles (LinkedIn, personal blog, or industry publication) on topics from this course, (2) Submit at least 2 CFP proposals to security conferences, (3) Create a 12-month content calendar with topics mapped to your expertise areas, (4) Establish your professional writing voice and publishing rhythm.",
              "deliverableType": "document"
            },
            {
              "id": "lead-2-2",
              "originalNumber": "2.2",
              "title": "Building & Leading High-Performance Security Teams",
              "duration": "~10 hours",
              "durationHours": 10,
              "description": "Hiring and retaining talent, developing people, building psychological safety, managing burnout (including your own), creating teams that outperform, and navigating the politics of organizational change. The human side of security leadership — arguably the hardest and most important skill.",
              "resources": [
                {
                  "type": "article",
                  "name": "Will Larson — An Elegant Puzzle: Systems of Engineering Management",
                  "url": "https://www.oreilly.com/library/view/an-elegant-puzzle/9781732265189/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Camille Fournier — The Manager's Path",
                  "url": "https://www.oreilly.com/library/view/the-managers-path/9781491973882/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Kim Scott — Radical Candor",
                  "url": "https://www.radicalcandor.com/the-book/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Patrick Lencioni — The Five Dysfunctions of a Team",
                  "url": "https://www.tablegroup.com/product/dysfunctions/",
                  "isPrimary": true
                },
                {
                  "type": "practice",
                  "name": "Shadow a CISO or security director — observe how they allocate time",
                  "url": "#/settings#self-directed-guidance",
                  "isPrimary": true
                }
              ],
              "deliverable": "Design a security team for a scaling company (200 → 2,000 employees): (1) Organizational structure with roles and reporting lines, (2) Hiring plan with prioritized roles and job descriptions, (3) Competency framework and career ladders, (4) Onboarding program for new security team members, (5) Team culture and operating principles document, (6) Metrics for team health and effectiveness.",
              "deliverableType": "document"
            },
            {
              "id": "lead-2-3",
              "originalNumber": "2.3",
              "title": "Business Case Development & Budget Ownership",
              "duration": "~10 hours",
              "durationHours": 10,
              "description": "The ability to build compelling business cases for security investment is the single most important skill separating senior ICs from executives. Learn to speak ROI, build financial models, and frame security spending as business investment. Your MBA gives you the foundation — this module applies it directly to security.",
              "resources": [
                {
                  "type": "documentation",
                  "name": "McKinsey / BCG frameworks applied to technology investment",
                  "url": "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "The Business Model Canvas applied to security programs",
                  "url": "https://www.strategyzer.com/library/the-business-model-canvas",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "Publicly available CISO budget presentations and frameworks",
                  "url": "https://www.gartner.com/en/information-technology/topics/it-spending",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "Gartner IT spending benchmarks for security",
                  "url": "https://www.gartner.com/en/information-technology/insights/it-spending",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Harvard Business Review — capital allocation and investment decision articles",
                  "url": "https://hbr.org/topic/subject/capital-budgeting",
                  "isPrimary": true
                }
              ],
              "deliverable": "Build a comprehensive business case for an AI-powered security initiative: (1) Problem statement with business impact quantification, (2) Solution architecture overview, (3) Total cost of ownership model (3-year), (4) Risk reduction quantification using FAIR, (5) ROI analysis with sensitivity modeling, (6) Implementation timeline with resource requirements, (7) Board-ready executive summary (1 page).",
              "deliverableType": "code"
            },
            {
              "id": "lead-2-4",
              "originalNumber": "2.4",
              "title": "Advisory Network & Career Architecture",
              "duration": "~6 hours (then ongoing)",
              "durationHours": 6,
              "description": "Your network is your moat. Build relationships with CISOs, founders, investors, and peers who push you to grow. Also: design your career intentionally — understand the paths available (CISO, VP Security, advisory, board roles, consulting, entrepreneurship) and make deliberate choices about which to pursue.",
              "resources": [
                {
                  "type": "article",
                  "name": "IANS Research Network or equivalent CISO peer group",
                  "url": "https://www.iansresearch.com/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Heidrick & Struggles — CISO career path reports",
                  "url": "https://www.heidrick.com/Knowledge-Center/Publication",
                  "isPrimary": true
                },
                {
                  "type": "documentation",
                  "name": "Executive coaching resources and frameworks",
                  "url": "https://www.icf.com/",
                  "isPrimary": true
                },
                {
                  "type": "article",
                  "name": "Advisory board best practices",
                  "url": "https://hbr.org/2020/04/do-you-need-an-advisory-board",
                  "isPrimary": true
                },
                {
                  "type": "practice",
                  "name": "Study career trajectories of CISOs you admire",
                  "url": "https://www.linkedin.com/",
                  "isPrimary": true
                }
              ],
              "deliverable": "(1) Personal advisory board: identify 5 people, reach out, establish regular touchpoints (these should be 2-5 years ahead of where you want to be), (2) 5-year career architecture document: target roles, required capabilities, gap analysis, and development plan, (3) Professional network growth plan: specific communities, conferences, and relationship-building activities, (4) Personal brand audit: how you're perceived today vs. how you want to be perceived.",
              "deliverableType": "code"
            }
          ]
        }
      ]
    }
  ]
};

export function getAllModules() {
  return COURSE.tracks.flatMap((track) =>
    track.phases.flatMap((phase) =>
      phase.modules.map((module) => ({
        ...module,
        trackId: track.id,
        trackTitle: track.title,
        trackColor: track.color,
        phaseId: phase.id,
        phaseTitle: phase.title,
      }))
    )
  );
}

export function getModuleById(id) {
  for (const track of COURSE.tracks) {
    for (const phase of track.phases) {
      const module = phase.modules.find((item) => item.id === id);
      if (module) {
        return { module, phase, track };
      }
    }
  }
  return null;
}

export function getAdjacentModules(moduleId) {
  const allModules = getAllModules();
  const index = allModules.findIndex((module) => module.id === moduleId);
  return {
    prev: index > 0 ? allModules[index - 1] : null,
    next: index >= 0 && index < allModules.length - 1 ? allModules[index + 1] : null,
  };
}
