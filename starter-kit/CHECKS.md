# Running the team: the checklists

## Every day (1 minute)
- Did the 8 AM, 9 AM, 3 PM and 7 PM messages arrive? If one didn't:
  `marketing gateway status` → `marketing logs` → `hermes doctor` (use that bot's name).

## Every week (5 minutes)
- Back up, off the laptop: `bash backup.sh /path/to/your/drive`
- Read the Analyst's Monday report. Remember: future numbers are projections, not promises.
- Check spending: `/usage` in each bot's chat, and your credits at the model service.

## When there's an update (at a quiet time, never before a sale)
1. `hermes update --check`
2. `hermes update --backup`
3. `hermes doctor`
4. `marketing gateway status` (and the other three)

## Safety, once (Lesson 11)
- [ ] `approvals.mode: manual` and a timeout in every bot's config.yaml
- [ ] No bot has a tool that sends, publishes, pays or refunds
- [ ] `chmod 600 ~/.hermes/profiles/*/.env`
- [ ] Prepaid credits, auto top-up off
- [ ] A key leaked? Revoke it at the service (or BotFather), put the new one in .env

## If the laptop dies or is stolen
Revoke every key → install Hermes on the new machine → stop the gateways →
`hermes import hermes-backup-<date>.zip` → untar the shared folder → put in new keys →
`<bot> gateway install` for each bot.
