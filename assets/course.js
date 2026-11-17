// course.js — everything that belongs to this course only.
// The shared look and features come from study-notebook-design (loaded after this file),
// which reads the settings below.

const COURSE_LESSONS = [
  // n: lesson number used for saved progress (never change it) · label: the number students see
  // Lessons 1–5: how a team works, built from scratch. Lessons 6–12: a real team on your own laptop (Hermes Agent).
  { n: 1, label: "1", step: "roles", title: "Why a team?", file: "lesson1.html", ready: true, test: 7,
    summary: "You're the CEO. Your AI employees each have one role and talk in one group chat.",
    leaves: "You've watched a team chat. Can you build two bots that talk, yourself?" },
  { n: 2, label: "2", step: "build it", title: "Two bots talk", file: "lesson2.html", ready: false,
    summary: "Write two agents in plain Python that pass messages back and forth.",
    leaves: "Two bots take turns easily. With five, who speaks next?" },
  { n: 3, label: "3", step: "who speaks", title: "Who speaks next", file: "lesson3.html", ready: false,
    summary: "@mentions, routing each message to the right bot, and a limit so the chat never goes round forever.",
    leaves: "The chat grows long. How does the team keep track of the work?" },
  { n: 4, label: "4", step: "handoffs", title: "Shared notes and handoffs", file: "lesson4.html", ready: false,
    summary: "A shared board of tasks, and clean handoffs from one bot to the next.",
    leaves: "Your bots only use tools you wrote. How do they plug into everything else?" },
  { n: 5, label: "5", step: "standards", title: "MCP and A2A", file: "lesson5.html", ready: false,
    summary: "The open standards: MCP plugs a bot into tools, A2A lets agents talk to each other.",
    leaves: "You know how it works inside. Time to set up a real one on your laptop." },
  { n: 6, label: "6", step: "install", title: "Hermes on your laptop", file: "lesson6.html", ready: false,
    summary: "Install Hermes Agent and pick a model: free on your own laptop, or a cheap one online.",
    leaves: "One agent runs. How do you make it a team?" },
  { n: 7, label: "7", step: "your team", title: "Your team of bots", file: "lesson7.html", ready: false,
    summary: "Hire Amal Designers' team in Bot Mode: named bots, each with its own role, model, memory and skills.",
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

// ---------- The team: sticky notes with faces. <p class="bot-say" data-bot="marketer">Hi!</p> ----------
// The running story: you are the CEO of Amal Designers (handmade dresses for kids under 10).
// researcher (orange, a magnifying glass) · marketer (pink, a pencil) · support (green, a chat bubble) · you (yellow)
const BOT_LOOK = {
  researcher: { name: "Researcher", note: "var(--note-orange)", extra: '<circle cx="56" cy="38" r="4.5" class="bot-tool"/><path d="M59.5 41.5 L63 45" class="bot-tool"/>' },
  marketer: { name: "Marketer", note: "var(--note-pink)", extra: '<path d="M54 46 L62 34" class="bot-tool"/><path d="M54 46 L53 49 L56 47" class="bot-tool"/>' },
  support: { name: "Support", note: "var(--note-green)", extra: '<path d="M53 33 H64 V41 H58 L55 44 V41 H53 Z" class="bot-tool"/>' },
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
function setupBots() {
  document.querySelectorAll("p.bot-say").forEach(p => {
    const kind = p.dataset.bot || "researcher";
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
    ceo: ["you", "you (CEO)"], researcher: ["a-orange", "Researcher"], marketer: ["a-pink", "Marketer"], support: ["a-green", "Support"],
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
  setup: [setupBots],
};
