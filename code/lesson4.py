# The board: one dictionary per task. What, who owns it, and its status.
board = []

def add_task(task, owner):
    board.append({"id": len(board) + 1, "task": task, "owner": owner, "status": "todo"})

def show_board():
    lines = []
    for t in board:
        lines.append(f'{t["id"]}. {t["task"]} | {t["owner"]} | {t["status"]}')
    return "\n".join(lines)

add_task("Write the post", "Marketing")
add_task("Check sizes and stock", "Production")
add_task("Book the courier", "Operations")
print(show_board())

# The chat, as before
chat = []

def post(who, text):
    chat.append({"who": who, "text": text})
    print(f"{who}: {text}")

BOTS = ["Marketing", "Production", "Operations"]
INSTRUCTIONS = {
    "Marketing": "Write the Instagram post. When done, write: HANDOFF to Production: what to check",
    "Production": "Check sizes and stock. Catalogue: pastel frock, sizes 1 to 8 years, 6 ready on Friday. When done, write: HANDOFF to Operations: what is ready",
    "Operations": "Book the courier. When done, write: HANDOFF to CEO: what you booked",
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
    "Marketing": ["Caption: “Twirl-ready pastel frock 💫 Sizes 1 to 8 years.”\nHANDOFF to Production: check sizes 1 to 8"],
    "Production": ["Sizes 1 to 8 are right. 6 frocks ready on Friday.\nHANDOFF to Operations: 6 frocks, Friday"],
    "Operations": ["Courier pickup booked for Saturday, 4 PM.\nHANDOFF to CEO: pickup Saturday 4 PM"],
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

print(run("Marketing"))
print(show_board())
