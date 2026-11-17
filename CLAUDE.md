# Build an AI Team — notes for Claude

- Read the design guidelines first: https://github.com/mo-ri-ch/study-notebook-design/blob/main/GUIDELINES.md
  (also at ../study-notebook-design/GUIDELINES.md when that repo is checked out next to this one).
- The shared look comes from study-notebook-design/v1; this repo has the lessons, assets/course.js
  (lesson list, the team's sticky notes, AG helpers), assets/course.css and assets/practice.js.
- **Standalone course.** Every topic is taught here, from scratch (Lesson 1 opens with a quick recap of what an agent is).
  It follows on naturally from Build an AI Agent (gradlabs.in/learn/agents), but never requires it; links are optional extras.
  Don't repeat that course's "Teams of agents" lesson (manager / checker / cost): this course is about the group chat,
  @mentions, who speaks next, shared notes, handoffs, MCP / A2A, and a real free tool.
- The team: Researcher (orange, search), Writer (pink), Checker (green). `<p class="bot-say" data-bot="writer">…</p>`.
- Lesson numbers start at 1. Saved progress uses `n`; never change `n` or the id "agent-team".
- Lesson 1: browser activities only. Code (Colab) starts in Lesson 2.
- Messages shown before Lesson 2 are examples written for the page; say so (a peek or a note).
- Tools change fast (Hermes Agent had releases every few weeks in 2026). Keep tool-specific steps in one lesson (6),
  check them against the current docs before each update, and keep the other lessons tool-free.
- Check pages with `python3 ../build-an-llm-from-scratch/tools/check_pages.py` (run from this repo) before pushing.
