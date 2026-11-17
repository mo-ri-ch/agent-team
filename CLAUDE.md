# Build an AI Team — notes for Claude

- Read the design guidelines first: https://github.com/mo-ri-ch/study-notebook-design/blob/main/GUIDELINES.md
  (also at ../study-notebook-design/GUIDELINES.md when that repo is checked out next to this one).
- The shared look comes from study-notebook-design/v1; this repo has the lessons, assets/course.js
  (lesson list, the team's sticky notes, AG helpers), assets/course.css and assets/practice.js.
- **Standalone course.** Every topic is taught here, from scratch (Lesson 1 opens with a quick recap of what an agent is).
  It follows on naturally from Build an AI Agent (gradlabs.in/learn/agents), but never requires it; links are optional extras.
  Don't repeat that course's "Teams of agents" lesson (manager / checker / cost): this course is about the group chat,
  @mentions, who speaks next, shared notes, handoffs, MCP / A2A, and a real free tool.
- **The story (Rishal, 17 Nov 2026):** the reader is the CEO of Amal Designers, a real family brand of handmade dresses
  for kids under 10 (Instagram + WhatsApp; Rishal runs the tech, his sister does the Instagram posts). Bots help the
  people, never replace their final say. Never show real customers: names, numbers and chats are made up, and so are prices.
- The team so far: Researcher (orange, search), Marketer (pink), Support (green, catalogue). `<p class="bot-say" data-bot="marketer">…</p>`.
- Lesson numbers start at 1. Saved progress uses `n`; never change `n` or the id "agent-team".
- Lesson 1: browser activities only. Code (Colab) starts in Lesson 2.
- Messages shown before Lesson 2 are examples written for the page; say so (a peek or a note).
- **Goal (Rishal, 17 Nov 2026): production, not a classroom toy.** By the end, a student runs a team of assistants on
  their own laptop every day: Hermes Agent with Bot Mode, a sandbox (Docker) per bot, Telegram from their phone,
  scheduled jobs, approvals before risky actions, secret API keys, cost limits, restarts, logs and backups.
- Lessons 1–5 are tool-free and from scratch (Python). Lessons 6–12 use Hermes Agent. Be honest: free local models
  are fine for simple jobs; for dependable daily use, a cheap paid model is often better. Teach both.
- Hermes changes fast (releases every few weeks in 2026). Check every Hermes step against
  https://hermes-agent.nousresearch.com/docs/ before writing or updating Lessons 6–12, and say which version was used.
- Check pages with `python3 ../build-an-llm-from-scratch/tools/check_pages.py` (run from this repo) before pushing.
