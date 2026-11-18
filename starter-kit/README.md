# Starter kit: Build an AI Team

Everything from the course, ready to use: four bots for a small business (Marketing, Production,
Operations and an Analyst), their instructions, safe settings, the team's week of scheduled jobs,
and the daily, weekly and update checklists. Written for Amal Designers, a kids' dress brand;
change the words to fit your business.

Course: https://mo-ri-ch.github.io/agent-team/ · Checked against Hermes Agent v0.23 (November 2026).

## What's inside
| File | What it is | Lesson |
|---|---|---|
| `setup.sh` | Makes the four bots, gives each its SOUL.md, makes the shared folder with sample data, locks .env files | 7, 8, 11 |
| `souls/` | A SOUL.md for each bot: who it helps, its job, never, hand off to | 7, 11 |
| `config/` | Settings to paste into each bot's config.yaml: sandbox, shared folder, memory cap, Telegram, approvals | 8, 9, 11 |
| `jobs.sh` | The team's week: sewing plan, daily task, packing list, evening check-in, weekly report | 10, 12 |
| `backup.sh` | Weekly backup of Hermes and the shared folder, to a place off the laptop | 12 |
| `CHECKS.md` | Daily, weekly, update and safety checklists | 11, 12 |
| `MY-TEAM-PLAN.md` | The final project: a one-page plan for your own business | 12 |
| `sample-shared/` | Made-up orders and catalogue, so the bots have something to read | — |

## Use it
1. Install Hermes (Lesson 6) and Docker (Lesson 8).
2. Download this folder (on GitHub: **Code → Download ZIP**, then open `starter-kit`), and in a terminal:
   ```bash
   cd starter-kit
   bash setup.sh
   ```
3. Follow the steps it prints for each bot: pick a model, paste its settings, connect Telegram.
4. When all four answer in your team group: `bash jobs.sh`
5. Every week: `bash backup.sh /path/to/a/drive`

Read a script before you run it: they're short and commented.
Bots plan and draft. People decide, post, sew, pack and send.
