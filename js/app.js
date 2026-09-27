const {
  PERIODS,
  findPeriod,
  formatCountdown,
  nextPeriod,
  nowInTunis,
  secondsUntilEnd,
} = window.RevisionSchedule;
const PROMPTS = window.RevisionPrompts;

const els = {
  clock: document.querySelector("#clock"),
  date: document.querySelector("#date"),
  kicker: document.querySelector("#kicker"),
  title: document.querySelector("#title"),
  subtitle: document.querySelector("#subtitle"),
  remaining: document.querySelector("#remaining"),
  next: document.querySelector("#next"),
  timeline: document.querySelector("#timeline"),
  prompts: document.querySelector("#prompts"),
};

let overrideId = null;
let lastPromptPeriodId = null;

function kindLabel(kind) {
  if (kind === "work") return "Révision";
  if (kind === "prayer") return "Prière / pause";
  if (kind === "pause") return "Hors Cursor";
  return "Repos";
}

function currentPeriod(clock) {
  if (overrideId) {
    return PERIODS.find((p) => p.id === overrideId) ?? findPeriod(clock.minutes);
  }
  return findPeriod(clock.minutes);
}

function renderTimeline(activeId) {
  els.timeline.innerHTML = "";
  for (const period of PERIODS) {
    if (period.id === "repos") continue;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "slot" + (period.id === activeId ? " is-now" : "");
    btn.dataset.kind = period.kind;
    btn.innerHTML = `
      <time>${period.start}</time>
      <span class="name">${period.icon} ${period.title}</span>
      <span class="kind">${kindLabel(period.kind)}</span>
    `;
    btn.addEventListener("click", () => {
      overrideId = overrideId === period.id ? null : period.id;
      tick();
    });
    els.timeline.appendChild(btn);
  }
}

function renderPrompts(period) {
  const pack = period.bloc ? PROMPTS[`bloc${period.bloc}`] : null;
  if (!pack) {
    els.prompts.innerHTML = `<div class="idle">Pas de prompts Cursor maintenant — ${period.subtitle}. Reviens au prochain bloc de travail.</div>`;
    return;
  }

  const cards = pack
    .map(
      (item) => `
      <article class="card">
        <header>
          <h4>${item.title}</h4>
          <span class="hint">${item.hint}</span>
        </header>
        <pre>${escapeHtml(item.text)}</pre>
        <button class="copy" type="button" data-text="${encodeURIComponent(item.text)}">Copier le prompt</button>
      </article>
    `,
    )
    .join("");

  els.prompts.innerHTML = `<h3>Prompts pour ce bloc</h3><div class="grid">${cards}</div>`;
  els.prompts.querySelectorAll("button.copy").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = decodeURIComponent(btn.dataset.text);
      await navigator.clipboard.writeText(text);
      btn.textContent = "Copié";
      setTimeout(() => {
        btn.textContent = "Copier le prompt";
      }, 1200);
    });
  });
}

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function tick() {
  const clock = nowInTunis();
  const period = currentPeriod(clock);
  const next = nextPeriod(period);
  const live = findPeriod(clock.minutes);

  document.body.dataset.kind = period.kind;
  els.clock.textContent = clock.label;
  els.date.textContent = `${clock.dateLabel} · Sfax (Africa/Tunis)`;
  els.kicker.textContent = overrideId && overrideId !== live.id ? "Simulation" : "En cours";
  els.title.textContent = `${period.icon} ${period.title}`;
  els.subtitle.textContent = period.subtitle;

  if (overrideId && overrideId !== live.id) {
    els.remaining.textContent = "Aperçu manuel — reclique le créneau pour revenir à l’heure réelle";
    els.next.textContent = `Maintenant, en vrai : ${live.title}`;
  } else {
    els.remaining.textContent = formatCountdown(secondsUntilEnd(period, clock));
    els.next.textContent = `Ensuite : ${next.title} (${next.start})`;
  }

  if (lastPromptPeriodId !== period.id) {
    lastPromptPeriodId = period.id;
    renderTimeline(period.id);
    renderPrompts(period);
  }
}

tick();
setInterval(tick, 1000);
