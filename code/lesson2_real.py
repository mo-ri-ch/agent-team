# A real LLM: a small, free model that runs inside Colab
# (faster with a GPU: Runtime → Change runtime type → T4 GPU)
import torch                        # the library that does the model's math
from transformers import pipeline   # a ready-made way to load a model and use it

# Load Qwen2.5 1.5B (about 3 GB, downloaded the first time).
# device=0 means "use the GPU", -1 means "use the CPU": it picks the GPU if there is one.
model = pipeline("text-generation", model="Qwen/Qwen2.5-1.5B-Instruct",
                 device=0 if torch.cuda.is_available() else -1)

NAMES = ["CEO", "Marketing", "Production"]

def real_llm(text):
    # The model gets one message: all the text the bot reads.
    # max_new_tokens=80: write at most 80 tokens (pieces of words).
    # do_sample=False: always pick the most likely next piece, so every run is the same.
    out = model([{"role": "user", "content": text}], max_new_tokens=80, do_sample=False)
    reply = out[0]["generated_text"][-1]["content"]   # the model's reply: the last message
    kept = []
    for line in reply.strip().split("\n"):
        if line.split(":")[0] in NAMES:   # a line that starts with a name, like "CEO:"
            if kept:
                break                     # someone else's turn: cut the reply here
            line = line.split(":", 1)[1]  # its own name again at the start: drop it
        kept.append(line.strip())
    return " ".join(kept).strip()

# Start a new chat, and give both bots the real LLM
chat.clear()   # empty the list
marketing["llm"] = real_llm
production["llm"] = real_llm
print(run_chat("Write a caption for the new pastel party frock.", [marketing, production]))
