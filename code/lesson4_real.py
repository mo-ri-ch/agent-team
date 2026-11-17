# A real LLM: a small, free model that runs inside Colab
# (faster with a GPU: Runtime → Change runtime type → T4 GPU)
import torch                        # the library that does the model's math
from transformers import pipeline   # a ready-made way to load a model and use it

# Load Qwen2.5 1.5B (about 3 GB, downloaded the first time)
model = pipeline("text-generation", model="Qwen/Qwen2.5-1.5B-Instruct",
                 device=0 if torch.cuda.is_available() else -1)

NAMES = ["CEO"] + BOTS

# A bot's reply, cut where another name starts (as in Lesson 2).
# Lines are kept as lines, so the HANDOFF line stays on its own.
def real_llm(name, text):
    out = model([{"role": "user", "content": text}], max_new_tokens=100, do_sample=False)
    reply = out[0]["generated_text"][-1]["content"]
    kept = []
    for line in reply.strip().split("\n"):
        if line.split(":")[0] in NAMES:
            if kept:
                break
            line = line.split(":", 1)[1]
        kept.append(line.strip())
    return "\n".join(kept).strip()

# No tools yet, so the Researcher must not make up facts
INSTRUCTIONS["Researcher"] = ("Suggest one idea for an Instagram post about a pastel party frock, in one sentence. "
                              "Never make up facts or prices. Then write on a new line: HANDOFF to Marketer: your idea")

# A fresh board and chat, and the real LLM for every bot
board.clear()
chat.clear()
add_task("Suggest a post idea", "Researcher")
add_task("Write the caption", "Marketer")
add_task("Check sizes and price", "Support")
fake_llm = real_llm   # run() calls fake_llm, so point that name at the real LLM
print(run("Researcher"))
print(show_board())   # tasks still "doing" mean a bot forgot its HANDOFF line
