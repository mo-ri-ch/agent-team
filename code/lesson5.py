import json   # JSON: text that holds lists and dictionaries, so programs can send them to each other

# An MCP server for the order sheet. It lists its tools, and runs one when asked.
ORDERS = {101: "red frock, size 5, paid", 102: "pastel frock, size 3, packed"}

def order_status(args):
    return ORDERS.get(args["order_id"], "No order with that number")

order_server = {
    "tools": [{"name": "order_status",
               "description": "Look up one order by its number.",
               "inputSchema": {"type": "object",
                               "properties": {"order_id": {"type": "integer"}},
                               "required": ["order_id"]}}],
    "run": {"order_status": order_status},
}

# tools/list: the first thing a client asks
def list_tools(server):
    return {"jsonrpc": "2.0", "id": 1, "result": {"tools": server["tools"]}}

# The client turns the list into lines for the bot's instructions
def describe(server):
    lines = []
    for t in list_tools(server)["result"]["tools"]:
        needs = ", ".join(t["inputSchema"]["required"])
        lines.append(f'{t["name"]}({needs}): {t["description"]}')
    return "\n".join(lines)

print(describe(order_server))

# tools/call: run one tool with its arguments, or send back an error
def call_tool(server, request):
    name = request["params"]["name"]
    args = request["params"]["arguments"]
    tool = None
    for t in server["tools"]:
        if t["name"] == name:
            tool = t
    if tool is None:
        return {"jsonrpc": "2.0", "id": request["id"], "error": {"message": "Unknown tool: " + name}}
    for need in tool["inputSchema"]["required"]:
        if need not in args:
            return {"jsonrpc": "2.0", "id": request["id"], "error": {"message": "Missing: " + need}}
    text = server["run"][name](args)
    return {"jsonrpc": "2.0", "id": request["id"], "result": {"content": [{"type": "text", "text": text}]}}

# A bot asks for a tool by writing one line: CALL, then JSON
def handle(line, server):
    try:
        call = json.loads(line.replace("CALL ", "", 1))
    except Exception:
        return "Error: not valid JSON"
    request = {"jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": call}
    reply = call_tool(server, request)
    if "error" in reply:
        return "Error: " + reply["error"]["message"]
    return reply["result"]["content"][0]["text"]

print(handle('CALL {"name": "order_status", "arguments": {"order_id": 101}}', order_server))
print(handle('CALL {"name": "order_status", "arguments": {"id": 101}}', order_server))

# A2A: another company's agent. First, read its Agent Card: who it is, what it can do.
courier_card = {"name": "SwiftShip Courier Agent",
                "url": "https://swiftship.example/a2a",
                "skills": [{"id": "book_pickup", "description": "Book a parcel pickup"}]}
print(courier_card["name"], "can:", courier_card["skills"][0]["description"])

# Send it a task. It works on its own side; we watch the task's status change.
def send_task(card, message):
    task = {"id": "t-7", "status": "submitted", "message": message}
    print(task["status"])
    for status in ["working", "completed"]:   # what the courier's agent reports back
        task["status"] = status
        print(task["status"])
    task["result"] = "Pickup booked: Saturday 4 PM, 6 parcels"
    return task

task = send_task(courier_card, "Pick up 6 parcels from Kochi on Saturday.")
print(task["result"])
