# The shared chat, and a list of who the LLM wrote for.
# Every LLM write costs time and money, so we count them: len(calls).
chat = []
calls = []

def post(who, text):
    chat.append({"who": who, "text": text})
    print(f"{who}: {text}")

BOTS = ["Researcher", "Marketer", "Support"]
INSTRUCTIONS = {
    "Researcher": "Find kids' fashion trends. Say where each fact came from.",
    "Marketer": "Write Instagram captions from the facts in the chat.",
    "Support": "Check sizes and prices against the catalogue.",
}

def text_for(name):
    lines = [INSTRUCTIONS[name], "", "Chat so far:"]
    for m in chat:
        lines.append(m["who"] + ": " + m["text"])
    lines.append(name + ":")
    return "\n".join(lines)

# Fake LLM replies for each bot, in order. A fresh copy for each run.
def fresh_replies():
    return {
        "Researcher": ["Pastel tulle frocks are big for birthdays (from 3 kids' shops). @Marketer"],
        "Marketer": ["Caption: “Twirl-ready pastel frock 💫 Sizes 1 to 12 years.” @Support please check.",
                     "Fixed: “…Sizes 1 to 8 years.” @CEO ready to post."],
        "Support": ["The catalogue says sizes 1 to 8 years, not 12. @Marketer"],
    }

def fake_llm(name, text):
    calls.append(name)
    return replies[name].pop(0)

# Way 1: @mentions. The bots named with @ reply next. No LLM write to decide.
def by_mentions(text):
    names = []
    for name in BOTS:
        if "@" + name in text:
            names.append(name)
    return names

print(by_mentions("@Support please check."))

# Way 2: a coordinator reads the latest message and names who replies next.
# It is an LLM too, so it costs one write each time.
def by_coordinator(text):
    calls.append("Coordinator")
    name = coordinator_replies.pop(0)
    if name in BOTS:
        return [name]
    return []   # not a bot's name: wait for the CEO

# The loop: after each message, ask the router who replies next.
# chat[-1] is the last message (-1 counts from the end).
def run_chat(task, router, round_limit=5):
    post("CEO", task)
    for i in range(round_limit):
        names = router(chat[-1]["text"])
        if names == []:
            return "Waiting for the CEO."
        for name in names:
            post(name, fake_llm(name, text_for(name)))
    return "Stopped: the round limit was reached."

replies = fresh_replies()
print(run_chat("Plan a post for the pastel frock. @Researcher", by_mentions))
print("LLM writes:", len(calls))

# The same job with a coordinator: start a fresh chat and count again
chat.clear()
calls.clear()
replies = fresh_replies()
coordinator_replies = ["Researcher", "Marketer", "Support", "Marketer", "CEO"]
print(run_chat("Plan a post for the pastel frock. @Researcher", by_coordinator))
print("LLM writes:", len(calls))
