#!/usr/bin/env bash
# The team's week (Lessons 10 and 12). Run once, after every bot answers on Telegram
# and you've sent /sethome in the chat where each bot should post.
# Check them afterwards with:  marketing cron list   (and test one with /cron run in a chat)
# Running this twice makes the jobs twice. Change the prompts to fit your business first.
set -euo pipefail

production cron create "0 8 * * 1-6" \
  "You are writing the sewing plan for the designer of Amal Designers, a kids' dress brand. Read the orders in /workspace/shared/. List today's orders to sew, earliest due date first, with size and fabric. Warn if fabric is low or orders outgrow sewing time. Under 80 words." \
  --name "Sewing plan" --deliver telegram

marketing cron create "0 9 * * *" \
  "You are writing to the social media manager of Amal Designers, a kids' dress brand. Pick one dress from the catalogue to post today. Give one clear task: the dress, a caption under 25 words, and the best time to post. Save the caption in /workspace/shared/posts/. Keep it under 60 words." \
  --name "Daily task" --deliver telegram

operations cron create "0 15 * * 1-5" \
  "You are writing the packing list for Amal Designers, a kids' dress brand. Read today's orders in /workspace/shared/. List each parcel: order, size, address city. Then draft one tracking message per customer for the CEO to send. Do not send anything." \
  --name "Packing list" --deliver telegram

marketing cron create "0 19 * * *" \
  "Check whether today's Instagram post for Amal Designers is up. If it is, reply [SILENT]. If not, ask the social media manager kindly what is stuck, and tell the CEO in one line." \
  --name "Check-in" --deliver telegram

analyst cron create "0 9 * * 1" \
  "You are writing the weekly report for the CEO of Amal Designers, a kids' dress brand. From /workspace/shared/, count last week's orders, sales and followers, and compare with the week before. Then show orders a month in 1, 2 and 3 years at this pace, labelled 'Projection, not a promise', and say what growth it assumes. Under 120 words." \
  --name "Weekly report" --deliver telegram

echo "✓ 5 jobs made. See them with: marketing cron list, production cron list, …"
