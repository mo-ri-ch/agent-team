# The shared chat: a list of messages, in order.
# Each message is a dictionary: who wrote it, and what it says.
chat = []

def post(who, text):
    chat.append({"who": who, "text": text})
    print(f"{who}: {text}")

# A bot: a name, its own instructions, and an LLM to write with
researcher = {"name": "Researcher",
              "instructions": "You are the Researcher at Amal Designers, a kids' dress brand. Find trends and prices. Say where each fact came from."}
marketer = {"name": "Marketer",
            "instructions": "You are the Marketer at Amal Designers. Write one Instagram caption from the facts in the chat. When it is final, end with DONE."}

# What a bot reads: its own instructions + the chat so far.
# The last line is its own name, so the LLM writes as that bot.
def text_for(bot):
    lines = [bot["instructions"], "", "Chat so far:"]
    for m in chat:
        lines.append(m["who"] + ": " + m["text"])
    lines.append(bot["name"] + ":")
    return "\n".join(lines)

# Fake LLMs: each bot's replies, written by hand, in order
researcher_replies = ["Pastel frocks are big for birthdays this month (from 3 kids' shops). Most cost ₹1,200 to ₹1,800.",
                      "Yes: buyers in those shops' reviews ask for handmade. Say that."]
marketer_replies = ["Draft: “Twirl-ready pastel frocks for birthdays 💫 DM to order!” Researcher, anything to add?",
                    "Final: “Twirl-ready pastel frocks for birthdays 💫 Handmade by Amal Designers. DM to order!” DONE"]

def fake_researcher(text):
    return researcher_replies.pop(0)

def fake_marketer(text):
    return marketer_replies.pop(0)

researcher["llm"] = fake_researcher
marketer["llm"] = fake_marketer

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

print(run_chat("Write a caption for the new pastel party frock.", [researcher, marketer]))
