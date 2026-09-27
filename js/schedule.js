/**
 * Planning fixe du workflow Sfax.
 * Les horaires de prière réels bougent légèrement dans l'année :
 * ici on suit volontairement tes créneaux, pour que l'outil reste simple.
 */
window.RevisionSchedule = (() => {
const TZ = "Africa/Tunis";

const PERIODS = [
  {
    id: "fajr",
    kind: "prayer",
    title: "Fajr",
    subtitle: "Prière & méditation",
    start: "05:00",
    end: "05:30",
    icon: "🌅",
  },
  {
    id: "bloc1",
    kind: "work",
    bloc: 1,
    title: "BLOC 1 — Deep Work",
    subtitle: "Assimiler les concepts durs",
    start: "05:30",
    end: "07:00",
    icon: "🧠",
  },
  {
    id: "cours",
    kind: "pause",
    title: "Cours / Université",
    subtitle: "Présence, repos, déplacements",
    start: "07:00",
    end: "12:30",
    icon: "🏫",
  },
  {
    id: "dhuhr",
    kind: "prayer",
    title: "Dhuhr",
    subtitle: "Prière & pause déjeuner",
    start: "12:30",
    end: "13:30",
    icon: "☀️",
  },
  {
    id: "bloc2",
    kind: "work",
    bloc: 2,
    title: "BLOC 2 — Pratique",
    subtitle: "Exercices & TP guidés",
    start: "13:30",
    end: "15:30",
    icon: "⌨️",
  },
  {
    id: "asr",
    kind: "prayer",
    title: "Asr",
    subtitle: "Prière & pause café / thé",
    start: "15:30",
    end: "16:15",
    icon: "🍵",
  },
  {
    id: "bloc3",
    kind: "work",
    bloc: 3,
    title: "BLOC 3 — Débogage",
    subtitle: "Bugs, refactoring, qualité",
    start: "16:15",
    end: "18:00",
    icon: "🔧",
  },
  {
    id: "maghrib",
    kind: "prayer",
    title: "Maghrib",
    subtitle: "Prière & pause dîner",
    start: "18:00",
    end: "19:00",
    icon: "🌆",
  },
  {
    id: "bloc4",
    kind: "work",
    bloc: 4,
    title: "BLOC 4 — Quiz",
    subtitle: "Fiches & QCM rapides",
    start: "19:00",
    end: "20:00",
    icon: "🌙",
  },
  {
    id: "isha",
    kind: "prayer",
    title: "Isha",
    subtitle: "Prière & fin de révision",
    start: "20:00",
    end: "21:00",
    icon: "✨",
  },
  {
    id: "repos",
    kind: "rest",
    title: "Récupération",
    subtitle: "Sommeil — pas de Cursor",
    start: "21:00",
    end: "05:00",
    icon: "😴",
    wrapsMidnight: true,
  },
];

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function formatCountdown(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) {
    return `${h}h ${String(m).padStart(2, "0")}m ${String(sec).padStart(2, "0")}s`;
  }
  return `${m}m ${String(sec).padStart(2, "0")}s`;
}

function nowInTunis(date = new Date()) {
  const parts = new Intl.DateTimeFormat("fr-TN", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    weekday: "long",
    day: "2-digit",
    month: "short",
  }).formatToParts(date);

  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));
  const second = Number(get("second"));
  return {
    hour,
    minute,
    second,
    minutes: hour * 60 + minute,
    secondsOfDay: hour * 3600 + minute * 60 + second,
    label: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`,
    dateLabel: `${get("weekday")} ${get("day")} ${get("month")}`,
  };
}

function findPeriod(minutes) {
  for (const period of PERIODS) {
    const start = toMinutes(period.start);
    const end = toMinutes(period.end);
    if (period.wrapsMidnight) {
      if (minutes >= start || minutes < end) return period;
    } else if (minutes >= start && minutes < end) {
      return period;
    }
  }
  return PERIODS[PERIODS.length - 1];
}

function secondsUntilEnd(period, clock) {
  const end = toMinutes(period.end);
  let endSec = end * 60;
  const nowSec = clock.secondsOfDay;
  if (period.wrapsMidnight) {
    if (clock.minutes >= toMinutes(period.start)) {
      endSec += 24 * 3600;
    }
  }
  return endSec - nowSec;
}

function nextPeriod(period) {
  const i = PERIODS.findIndex((p) => p.id === period.id);
  return PERIODS[(i + 1) % PERIODS.length];
}

return {
  TZ,
  PERIODS,
  toMinutes,
  formatCountdown,
  nowInTunis,
  findPeriod,
  secondsUntilEnd,
  nextPeriod,
};
})();
