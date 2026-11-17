"""One plain sentence for each line of the lesson code, shown by "Step through".
The key is the line's code (without its comment).
"""

EXPLAIN = {
    # ---------- Lesson 2 ----------
    "chat = []": "Make the shared chat: an empty list. Every message will be added to the end of it.",
    "def post(who, text):": "Define post: it adds one message to the chat. Nothing runs yet; it runs each time a message is posted.",
    'chat.append({"who": who, "text": text})': "Make the message, a dictionary with who wrote it and what it says, and add it to the end of the chat.",
    'print(f"{who}: {text}")': "Show the message on screen, like a line in a group chat.",
    'researcher = {"name": "Researcher",': "Make the Researcher bot: a dictionary with its name and its own instructions.",
    'marketer = {"name": "Marketer",': "Make the Marketer bot the same way, with different instructions. Same kind of bot, different role.",
    "def text_for(bot):": "Define text_for: it builds the text one bot reads before it writes.",
    'lines = [bot["instructions"], "", "Chat so far:"]': "Start with this bot's own instructions, an empty line, and a heading for the chat.",
    "for m in chat:": "Go through every message in the chat, in order.",
    'lines.append(m["who"] + ": " + m["text"])': "Add the message as one line: who, a colon, then what they said.",
    'lines.append(bot["name"] + ":")': "End with this bot's own name and a colon, so the LLM writes the next line as this bot.",
    'return "\\n".join(lines)': "Glue all the lines together into one text, one per line, and hand it back.",
    'researcher_replies = ["Pastel frocks are big for birthdays this month (from 3 kids\' shops). Most cost ₹1,200 to ₹1,800.",': "The fake Researcher's replies, written out by hand, in order.",
    'marketer_replies = ["Draft: “Twirl-ready pastel frocks for birthdays 💫 DM to order!” Researcher, anything to add?",': "The fake Marketer's replies, written out by hand, in order.",
    "def fake_researcher(text):": "Define the fake LLM for the Researcher. Like a real one, it takes the text and gives back a reply.",
    "return researcher_replies.pop(0)": "Take the Researcher's next reply off its list and hand it back. It ignores the text.",
    "def fake_marketer(text):": "Define the fake LLM for the Marketer.",
    "return marketer_replies.pop(0)": "Take the Marketer's next reply off its list and hand it back.",
    'researcher["llm"] = fake_researcher': "Give the Researcher its LLM: store the function in its dictionary, under \"llm\".",
    'marketer["llm"] = fake_marketer': "Give the Marketer its LLM the same way.",
    "print(3 % 2)": "3 divided by 2 is 1, with 1 left over. % gives the left-over part: 1.",
    "def run_chat(task, bots, turn_limit=6):": "Define the chat loop. It takes the task, the list of bots, and a turn limit (6 unless we say otherwise).",
    'post("CEO", task)': "The CEO posts the task. It's the first message in the chat.",
    "for turn in range(turn_limit):": "One turn each time round: turn is 0, then 1, then 2 … up to the turn limit.",
    "bot = bots[turn % len(bots)]": "Whose turn? len(bots) is 2, so turn % 2 goes 0, 1, 0, 1 … : the bots take turns.",
    'reply = bot["llm"](text_for(bot))': "Build the text this bot reads, and give it to the bot's own LLM. It writes the reply.",
    'post(bot["name"], reply)': "Post the reply in the chat, under this bot's name. Now every bot can read it.",
    'if "DONE" in reply:': "Did the reply say DONE? Then the job is finished.",
    'return "Done after " + str(turn + 1) + " turns."': "Stop the loop and say how many turns it took. turn starts at 0, so add 1.",
    'return "Stopped: the turn limit was reached."': "No DONE within the turn limit: stop anyway, so the chat can't go on forever.",
    'print(run_chat("Write a caption for the new pastel party frock.", [researcher, marketer]))': "Run the chat with two bots, Researcher first, and show what it returns at the end.",
}
