// course.js — everything that belongs to this course only.
// The shared look and features come from study-notebook-design (loaded after this file),
// which reads the settings below.

// Extra Python words for this course: tap a dotted word in a code block for a short explanation.
// (The shared codewalk.js adds these to its own list. "in" replaces the shared one, which only covers for loops.)
window.PYWORDS_EXTRA = {
  "in": { what: "With for: go through each item. On its own, a in b asks: is a inside b? True or False.", ex: "print(\"DONE\" in \"Final caption DONE\")\nfor ch in \"hi\":\n    print(ch)", out: "True\nh\ni" },
  "f": { what: "An f-string: the f lets you put a value inside {} in the text.", ex: "who = \"CEO\"\nprint(f\"{who}: hello\")", out: "CEO: hello" },
  "str": { what: "Turns a value into text (a string), so it can be joined to other text with +.", ex: "print(\"Done after \" + str(4) + \" turns.\")", out: "Done after 4 turns." },
  "join": { what: "Glues a list of texts into one text, with the given text between them. \"\\n\" puts each on its own line.", ex: "print(\" + \".join([\"a\", \"b\", \"c\"]))", out: "a + b + c" },
  "pop": { what: "Takes an item out of a list and gives it back. pop(0) takes the first one.", ex: "replies = [\"one\", \"two\"]\nprint(replies.pop(0))\nprint(replies)", out: "one\n['two']" },
  "split": { what: "Cuts text into a list of pieces, at every place the given text appears. split(\":\", 1) cuts only at the first one.", ex: "print(\"CEO: hi: there\".split(\":\", 1))", out: "['CEO', ' hi: there']" },
  "strip": { what: "Takes spaces off both ends of the text.", ex: "print(\"  hi  \".strip() + \"!\")", out: "hi!" },
  "None": { what: "Python's word for \"nothing here\". task_of gives None when it finds no task.", ex: "x = None\nprint(x)", out: "None" },
  "is": { what: "Checks if two things are the very same thing. Mostly used as is None, or is not None.", ex: "x = None\nprint(x is None)\nprint(5 is not None)", out: "True\nTrue" },
  "not": { what: "Flips True and False. is not None asks: is there something here?", ex: "print(not True)", out: "False" },
  "and": { what: "True only when both sides are True.", ex: "owner = \"Support\"\nstatus = \"todo\"\nprint(owner == \"Support\" and status == \"todo\")", out: "True" },
  "startswith": { what: "True if the text begins with the given text.", ex: "print(\"HANDOFF to CEO: ok\".startswith(\"HANDOFF to \"))", out: "True" },
  "replace": { what: "Gives the text with every copy of the first text swapped for the second.", ex: "print(\"HANDOFF to Support\".replace(\"HANDOFF to \", \"\"))", out: "Support" },
  "try": { what: "Try the indented lines. If one goes wrong, jump to except instead of crashing.", ex: "try:\n    print(10 / 0)\nexcept Exception:\n    print(\"can't divide by 0\")", out: "can't divide by 0" },
  "except": { what: "What to do when the lines under try go wrong.", ex: "try:\n    print(int(\"abc\"))\nexcept Exception:\n    print(\"not a number\")", out: "not a number" },
  "Exception": { what: "Python's name for any error. except Exception: catches them all.", ex: "try:\n    print(10 / 0)\nexcept Exception:\n    print(\"an error\")", out: "an error" },
  "get": { what: "Looks a key up in a dictionary. If it isn't there, you get the second value instead.", ex: "orders = {101: \"paid\"}\nprint(orders.get(101, \"none\"))\nprint(orders.get(999, \"none\"))", out: "paid\nnone" },
  "loads": { what: "json.loads reads JSON text and gives back the list or dictionary it holds.", ex: "import json\nd = json.loads('{\"order_id\": 101}')\nprint(d[\"order_id\"] + 1)", out: "102" },
  "clear": { what: "Empties a list: every item is taken out.", ex: "chat = [1, 2]\nchat.clear()\nprint(chat)", out: "[]" },
};

const COURSE_LESSONS = [
  // n: lesson number used for saved progress (never change it) · label: the number students see
  // Lessons 1–5: how a team works, built from scratch. Lessons 6–12: a real team on your own laptop (Hermes Agent).
  { n: 1, label: "1", step: "roles", title: "Why a team?", file: "lesson1.html", ready: true, test: 7,
    summary: "You're the CEO. Your AI employees each have one role and talk in one group chat.",
    leaves: "You've watched a team chat. Can you build two bots that talk, yourself?" },
  { n: 2, label: "2", step: "build it", title: "Two bots talk", file: "lesson2.html", ready: true, test: 10,
    summary: "Write two agents in plain Python that pass messages back and forth.",
    leaves: "Two bots take turns easily. With five, who speaks next?" },
  { n: 3, label: "3", step: "who speaks", title: "Who speaks next", file: "lesson3.html", ready: true, test: 11,
    summary: "@mentions, routing each message to the right bot, and a limit so the chat never goes round forever.",
    leaves: "The chat grows long. How does the team keep track of the work?" },
  { n: 4, label: "4", step: "handoffs", title: "Shared notes and handoffs", file: "lesson4.html", ready: true, test: 10,
    summary: "A shared board of tasks, and clean handoffs from one bot to the next.",
    leaves: "Your bots only use tools you wrote. How do they plug into everything else?" },
  { n: 5, label: "5", step: "standards", title: "MCP and A2A", file: "lesson5.html", ready: true, test: 11,
    summary: "The open standards: MCP plugs a bot into tools, A2A lets agents talk to each other.",
    leaves: "You know how it works inside. Time to set up a real one on your laptop." },
  { n: 6, label: "6", step: "install", title: "Hermes on your laptop", file: "lesson6.html", ready: true, test: 9,
    summary: "Install Hermes Agent and pick a model: free on your own laptop, or a cheap one online.",
    leaves: "One agent runs. How do you make it a team?" },
  { n: 7, label: "7", step: "your team", title: "Your team of bots", file: "lesson7.html", ready: false,
    summary: "Hire Amal Designers' team in Bot Mode: Marketing, Production, Operations and an Analyst, each with its own role, model, memory and skills.",
    leaves: "Your bots share one computer. What if one deletes another's files?" },
  { n: 8, label: "8", step: "own computer", title: "A computer for each bot", file: "lesson8.html", ready: false,
    summary: "Each bot works in its own sandbox (a Docker container), so it can't touch your files or the others'.",
    leaves: "Your team lives on your laptop. How do you reach it when you're out?" },
  { n: 9, label: "9", step: "phone", title: "Reach it from your phone", file: "lesson9.html", ready: false,
    summary: "Connect your team to Telegram, so only you can message it from anywhere.",
    leaves: "It answers when you ask. Can it start work on its own?" },
  { n: 10, label: "10", step: "schedules", title: "Jobs on a schedule", file: "lesson10.html", ready: false,
    summary: "Every morning, today's post idea and caption, sent to your phone. Jobs that run by themselves.",
    leaves: "Your team now acts on its own. How do you keep it safe?" },
  { n: 11, label: "11", step: "safety", title: "Safe by default", file: "lesson11.html", ready: false,
    summary: "Approval before anything risky, API keys kept secret, and a limit on what it can spend.",
    leaves: "It's safe. Will it still be running next week?" },
  { n: 12, label: "12", step: "for real", title: "Run it every day", file: "lesson12.html", ready: false,
    summary: "Keeps running after a restart, with logs, backups and updates. Final project: the full Amal Designers team, or one for your own business.",
    leaves: null },
];

// ---------- The team: sticky notes with faces. <p class="bot-say" data-bot="marketing">Hi!</p> ----------
// The running story: you are the CEO of Amal Designers (handmade dresses for kids under 10).
// Each bot supports a real person: marketing (pink, a pencil) for the social media manager ·
// production (orange, a needle) for the designer, who makes the dresses and sets prices · operations (green, a parcel): packing and courier ·
// analyst (blue, a chart) for the CEO · you (yellow)
const BOT_LOOK = {
  marketing: { name: "Marketing", note: "var(--note-pink)", extra: '<path d="M54 46 L62 34" class="bot-tool"/><path d="M54 46 L53 49 L56 47" class="bot-tool"/>' },
  production: { name: "Production", note: "var(--note-orange)", extra: '<path d="M55 47 L63 33" class="bot-tool"/><ellipse cx="62" cy="35" rx="1.2" ry="2.2" class="bot-tool"/>' },
  operations: { name: "Operations", note: "var(--note-green)", extra: '<rect x="53" y="36" width="11" height="9" class="bot-tool"/><path d="M53 39 H64 M58.5 36 V39" class="bot-tool"/>' },
  analyst: { name: "Analyst", note: "var(--note-blue)", extra: '<path d="M54 46 V40 M58 46 V36 M62 46 V32" class="bot-tool"/>' },
  you: { name: "You", note: "var(--note-yellow)", extra: "" },
};
function botSvg(kind) {
  const b = BOT_LOOK[kind] || BOT_LOOK.you;
  return `<svg class="neo-face bot-face" viewBox="0 0 66 64" aria-hidden="true">
  <path d="M10 12 H48 L54 18 V56 H10 Z" style="fill:${b.note}" />
  <path d="M48 12 V18 H54" class="neo-fold" />
  <circle cx="23" cy="31" r="2.6" class="neo-eye" />
  <circle cx="39" cy="31" r="2.6" class="neo-eye" />
  <path d="M23 40 Q31 46 39 40" />${b.extra}
</svg>`;
}
// ---------- Now for your business: a note box at the end of each lesson, saved in this browser ----------
// <div class="mybiz" data-key="l1">The task, in one or two sentences.</div>
function setupMyBiz() {
  document.querySelectorAll("div.mybiz").forEach(box => {
    const key = `${window.COURSE.id}-mybiz-${box.dataset.key}`;
    const task = box.innerHTML;
    box.classList.add("activity");
    box.innerHTML = `<div class="do">✏️ Now for your business</div><p class="mybiz-task">${task}</p>
      <textarea rows="4" aria-label="Your notes"></textarea><p class="count mybiz-saved"></p>`;
    const ta = box.querySelector("textarea"), saved = box.querySelector(".mybiz-saved");
    try { ta.value = localStorage.getItem(key) || ""; } catch (e) {}
    saved.textContent = ta.value ? "Saved in this browser." : "Any business works: your own, a family shop, a college club.";
    ta.oninput = () => { try { localStorage.setItem(key, ta.value); saved.textContent = "Saved in this browser."; } catch (e) {} };
  });
}

function setupBots() {
  document.querySelectorAll("p.bot-say").forEach(p => {
    const kind = p.dataset.bot || "marketing";
    const box = document.createElement("div");
    box.className = "neo";
    box.innerHTML = botSvg(kind);
    const bubble = document.createElement("div");
    bubble.className = "neo-bubble";
    bubble.innerHTML = `<span class="neo-name">${p.dataset.name || (BOT_LOOK[kind] || {}).name || "Bot"}</span>${p.innerHTML}`;
    box.appendChild(bubble);
    if (p.id) box.id = p.id;
    p.replaceWith(box);
  });
}

// ---------- Shared helpers for activities . Everything lives under AG, so lesson scripts can't clash. ----------
window.AG = (function () {
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // Who wrote a line: the tag's colour class and its label
  const WHO = {
    you: ["you", "you"], llm: ["llm", "LLM"], prog: ["prog", "program"], human: ["you", "person"],
    ceo: ["you", "you (CEO)"], marketing: ["a-pink", "Marketing"], production: ["a-orange", "Production"], operations: ["a-green", "Operations"], analyst: ["a-blue", "Analyst"],
    instr: ["a-note", "instructions"],
    round: ["round", "round"],
  };
  // One transcript line. who: a key of WHO. opts: { isNew, cls, html (text is already HTML) }
  function line([who, text], opts = {}) {
    const [cls, label] = WHO[who] || ["llm", who];
    const body = opts.html ? text : esc(text);
    return `<div class="ln${opts.isNew ? " new" : ""}${opts.cls ? " " + opts.cls : ""}"><span class="who ${cls}">${label}</span><span class="txt">${body}</span></div>`;
  }
  // A step-through: each step adds lines and says one sentence. Buttons: next (required), back, again, play.
  function stepper({ tx, say, next, back, again, play, steps, onStep, html: asHtml }) {   // html: lines are already HTML
    let at = 0, timer = null, prev = 0;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function draw() {
      let html = "";
      steps.slice(0, at + 1).forEach((s, i) => (s.add || []).forEach(l => html += line(l, { isNew: i === at && at > 0, html: asHtml })));
      tx.innerHTML = html;
      if (say) say.textContent = steps[at].say || "";
      const end = at === steps.length - 1;
      next.hidden = end;
      if (back) back.hidden = at === 0 || end;
      if (again) again.hidden = !end;
      if (play) { play.hidden = end; play.textContent = timer ? "⏸ Pause" : "▶ Play"; }
      if (onStep) onStep(at, steps[at], prev);
      prev = at;
    }
    const stop = () => { clearInterval(timer); timer = null; };
    const step = () => { at = Math.min(steps.length - 1, at + 1); if (at === steps.length - 1) stop(); draw(); };
    next.onclick = () => { stop(); step(); };
    if (back) back.onclick = () => { stop(); at = Math.max(0, at - 1); draw(); };
    if (play) play.onclick = () => { if (timer) { stop(); draw(); return; } timer = setInterval(step, reduce ? 500 : 1400); step(); };
    const restart = () => { stop(); at = 0; draw(); };
    if (again) again.onclick = restart;
    addReset(next, restart);
    draw();
    return { restart, go: i => { stop(); at = i; draw(); } };
  }
  // A two- or three-way switch: buttons with class "mode" and data-<attr>
  function modes(box, attr, onChange) {
    const btns = box.querySelectorAll(`.mode[data-${attr}]`);
    const set = v => btns.forEach(x => { const on = x.dataset[attr] === v; x.classList.toggle("on", on); x.setAttribute("aria-selected", on); });
    btns.forEach(b => b.onclick = () => { set(b.dataset[attr]); onChange(b.dataset[attr]); });
    return set;
  }
  // Make a row of choice chips; onPick(index)
  function chips(box, labels, onPick) {
    box.innerHTML = labels.map((l, i) => `<button type="button" class="chip" data-i="${i}">${esc(l)}</button>`).join("");
    box.querySelectorAll(".chip").forEach(b => b.onclick = () => onPick(+b.dataset.i));
    return i => box.querySelectorAll(".chip").forEach((c, j) => c.classList.toggle("on", j === i));
  }
  // Move a dot along SVG paths, one leg after another. legs: [[pathEl, reverse?], …]. Reduced motion: jump to the end.
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function putDot(dot, path, t) { if (!dot || !path) return; const L = path.getTotalLength(), p = path.getPointAtLength(L * t); dot.setAttribute("cx", p.x); dot.setAttribute("cy", p.y); }
  function travel(dot, legs, per = 600) {
    if (!dot) return () => {};
    legs = legs.filter(([p]) => p);
    let raf = 0;
    if (!legs.length) return () => {};
    dot.removeAttribute("hidden");
    const end = () => { const [p, r] = legs[legs.length - 1]; putDot(dot, p, r ? 0 : 1); };
    if (reduceMotion) { end(); return () => {}; }
    const start = performance.now();
    const frame = now => {
      const k = Math.min(1, (now - start) / (per * legs.length));
      const i = Math.min(legs.length - 1, Math.floor(k * legs.length));
      let t = k * legs.length - i; t = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const [p, r] = legs[i]; putDot(dot, p, r ? 1 - t : t);
      if (k < 1) raf = requestAnimationFrame(frame); else end();
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }
  return { esc, line, stepper, modes, chips, WHO, travel, putDot, reduceMotion };
})();

window.COURSE = {
  id: "agent-team",                // prefix for everything saved in this browser (progress, notes). Never change it.
  pathLabel: "Building the team",
  lessons: COURSE_LESSONS,
  setup: [setupBots, setupMyBiz],
};
