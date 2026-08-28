const STORAGE_KEY = "incidents";

export function loadIncidents() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addIncident(incident: any) {
  const list = loadIncidents();
  list.unshift({
    type: "incident",
    timestamp: Date.now(),
    ...incident,
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function addSessionEvent(event: any) {
  const list = loadIncidents();
  list.unshift({
    type: "session-event",
    timestamp: Date.now(),
    ...event,
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}