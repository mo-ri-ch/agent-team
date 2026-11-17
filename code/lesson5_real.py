# A real LLM picks the tool: a small, free model that runs inside Colab
# (faster with a GPU: Runtime → Change runtime type → T4 GPU)
import torch                        # the library that does the model's math
from transformers import pipeline   # a ready-made way to load a model and use it

# Load Qwen2.5 1.5B (about 3 GB, downloaded the first time)
model = pipeline("text-generation", model="Qwen/Qwen2.5-1.5B-Instruct",
                 device=0 if torch.cuda.is_available() else -1)

# The bot's instructions: its role, then the tool list from the MCP server (tools/list)
INSTRUCTIONS = ("You are Operations at Amal Designers. You can use these tools:\n"
                + describe(order_server) + "\n"
                + 'To use a tool, write one line: CALL {"name": "tool_name", "arguments": {...}}\n'
                + "Write only that line.")

def ask(question):
    text = INSTRUCTIONS + "\n\nQuestion: " + question
    out = model([{"role": "user", "content": text}], max_new_tokens=60, do_sample=False)
    reply = out[0]["generated_text"][-1]["content"]
    print("LLM:", reply)
    for line in reply.split("\n"):
        if line.strip().startswith("CALL "):
            return handle(line.strip(), order_server)   # the program checks and runs it
    return "Error: no CALL line"

print(ask("Where is order 101?"))
print(ask("Has order 102 been packed?"))
print(ask("What about order 999?"))   # not in the sheet: the tool says so
