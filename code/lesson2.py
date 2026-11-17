# The shared chat: a list of messages, in order.
# Each message is a dictionary: who wrote it, and what it says.
chat = []

def post(who, text):
    chat.append({"who": who, "text": text})
    print(f"{who}: {text}")

# A bot: a name, its own instructions, and an LLM to write with
marketing = {"name": "Marketing",
             "instructions": "You plan Instagram posts for Amal Designers, a kids' dress brand. Write one caption, using only facts in the chat. When it is final, end with DONE."}
production = {"name": "Production",
              "instructions": "You run production at Amal Designers. Catalogue: pastel party frock, sizes 1 to 8 years, ₹1,450. We can sew 6 a week. Check every size and price."}

# What a bot reads: its own instructions + the chat so far.
# The last line is its own name, so the LLM writes as that bot.
def text_for(bot):
    lines = [bot["instructions"], "", "Chat so far:"]
    for m in chat:
        lines.append(m["who"] + ": " + m["text"])
    lines.append(bot["name"] + ":")
    return "\n".join(lines)

# Fake LLMs: each bot's replies, written by hand, in order
marketing_replies = ["Draft: “Twirl-ready pastel frocks 💫 Sizes 1 to 12 years. DM to order!” Production, are the details right?",
                     "Final: “Twirl-ready pastel frocks 💫 Sizes 1 to 8 years, ₹1,450. Only 6 this week, DM to order!” DONE"]
production_replies = ["Sizes are 1 to 8 years, not 12. Price ₹1,450. We can sew 6 this week."]

def fake_marketing(text):
    return marketing_replies.pop(0)

def fake_production(text):
    return production_replies.pop(0)

marketing["llm"] = fake_marketing
production["llm"] = fake_production

# Taking turns: turn 0 → bot 0, turn 1 → bot 1, turn 2 → bot 0 …
# (% gives what's left over after dividing: 2 % 2 is 0, 3 % 2 is 1)
print(3 % 2)

def run_chat(task, bots, turn_limit=6):
    post("CEO", task)
    for turn in range(turn_limit):
        bot = bots[turn % len(bots)]
        reply = bot["llm"](text_for(bot))
        post(bot["name"], reply)
        if "DONE" in reply:
            return "Done after " + str(turn + 1) + " turns."
    return "Stopped: the turn limit was reached."

print(run_chat("Write a caption for the new pastel party frock.", [marketing, production]))
