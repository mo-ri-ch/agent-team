# The board: one dictionary per task. What, who owns it, and its status.
board = []

def add_task(task, owner):
    board.append({"id": len(board) + 1, "task": task, "owner": owner, "status": "todo"})

def show_board():
    lines = []
    for t in board:
        lines.append(f'{t["id"]}. {t["task"]} | {t["owner"]} | {t["status"]}')
    return "\n".join(lines)

add_task("Find this week's trend", "Researcher")
add_task("Write the caption", "Marketer")
add_task("Check sizes and price", "Support")
print(show_board())

# The chat, as before
chat = []

def post(who, text):
    chat.append({"who": who, "text": text})
    print(f"{who}: {text}")

BOTS = ["Researcher", "Marketer", "Support"]
INSTRUCTIONS = {
    "Researcher": "Find kids' fashion trends. When done, write: HANDOFF to Marketer: what you found",
    "Marketer": "Write the caption. When done, write: HANDOFF to Support: what to check",
    "Support": "Check sizes and prices. When done, write: HANDOFF to CEO: your answer",
}

# What a bot reads now: its instructions, the board, and only the last few messages
WINDOW = 3

def text_for(name):
    lines = [INSTRUCTIONS[name], "", "Board:", show_board(), "", "Last messages:"]
    for m in chat[-WINDOW:]:   # chat[-3:] is the last 3 messages
        lines.append(m["who"] + ": " + m["text"])
    lines.append(name + ":")
    return "\n".join(lines)

# Find a bot's task with a given status, or None if it has none
def task_of(name, status):
    for t in board:
        if t["owner"] == name and t["status"] == status:
            return t
    return None

# A handoff line moves the work on: my task is done, the next bot's task starts
def handoff(name, reply):
    for line in reply.split("\n"):
        if line.startswith("HANDOFF to "):
            to = line.split(":")[0].replace("HANDOFF to ", "")
            mine = task_of(name, "doing")
            if mine is not None:
                mine["status"] = "done"
            if to in BOTS:
                nxt = task_of(to, "todo")
                if nxt is not None:
                    nxt["status"] = "doing"
                return to
            return None   # handed to the CEO: wait
    return None           # no handoff line: wait for the CEO

# Fake LLM replies
replies = {
    "Researcher": ["Pastel tulle frocks are big for birthdays (from 3 kids' shops).\nHANDOFF to Marketer: pastel tulle, birthdays"],
    "Marketer": ["Caption: “Twirl-ready pastel frock 💫 Sizes 1 to 8 years.”\nHANDOFF to Support: check sizes 1 to 8"],
    "Support": ["The catalogue says sizes 1 to 8 years, ₹1,450. All correct.\nHANDOFF to CEO: ready to post"],
}

def fake_llm(name, text):
    return replies[name].pop(0)

# The loop: whoever got the handoff writes next
def run(first, turn_limit=6):
    name = first
    task_of(name, "todo")["status"] = "doing"
    for i in range(turn_limit):
        reply = fake_llm(name, text_for(name))
        post(name, reply)
        name = handoff(name, reply)
        if name is None:
            return "Waiting for the CEO."
    return "Stopped: the turn limit was reached."

print(run("Researcher"))
print(show_board())
