# A real LLM: a small, free model that runs inside Colab
# (faster with a GPU: Runtime → Change runtime type → T4 GPU)
import torch                        # the library that does the model's math
from transformers import pipeline   # a ready-made way to load a model and use it

# Load Qwen2.5 1.5B (about 3 GB, downloaded the first time)
model = pipeline("text-generation", model="Qwen/Qwen2.5-1.5B-Instruct",
                 device=0 if torch.cuda.is_available() else -1)

def ask_model(text, max_new_tokens=80):
    out = model([{"role": "user", "content": text}], max_new_tokens=max_new_tokens, do_sample=False)
    return out[0]["generated_text"][-1]["content"]   # the model's reply: the last message

NAMES = ["CEO", "Coordinator"] + BOTS

# A bot's reply, cut where another name starts (as in Lesson 2)
def real_llm(name, text):
    calls.append(name)
    kept = []
    for line in ask_model(text).strip().split("\n"):
        if line.split(":")[0] in NAMES:
            if kept:
                break
            line = line.split(":", 1)[1]
        kept.append(line.strip())
    return " ".join(kept).strip()

# The coordinator: its own instructions, the chat, then "Next:"
COORDINATOR = """You run the team chat at Amal Designers, a kids' dress brand.
Bots: Marketing (writes captions), Production (checks sizes and prices), Operations (checks shipping).
Read the chat. Who should reply next? Reply with one name only.
Reply CEO when the caption is ready, or when the CEO must decide."""

def real_coordinator(text):
    calls.append("Coordinator")
    lines = [COORDINATOR, "", "Chat so far:"]
    for m in chat:
        lines.append(m["who"] + ": " + m["text"])
    lines.append("Next:")
    answer = ask_model("\n".join(lines), max_new_tokens=10)
    print("   (coordinator:", answer.strip() + ")")
    for name in BOTS:
        if name in answer:   # the first bot name in its answer
            return [name]
    return []                # no bot named: wait for the CEO

# run_chat calls fake_llm, so point that name at the real LLM
fake_llm = real_llm
chat.clear()
calls.clear()
print(run_chat("Plan an Instagram post for the new pastel party frock.", real_coordinator))
print("LLM writes:", len(calls))
