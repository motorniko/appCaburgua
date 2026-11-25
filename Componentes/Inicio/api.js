export const API_BASE = "https://api-caburgua.albertolagos59.workers.dev";

// fetch con timeout (evita que la app quede colgada con mala señal)
export async function fetchJson(path, { timeoutMs = 10000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_BASE}${path}`, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}