import { getInitialDemoState } from './demoSystems';

const storagePrefix = 'bd_demo_sandbox_v1';
const sessionEndKey = `${storagePrefix}:endTime`;
const sessionDuration = 30 * 60 * 1000;

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function stateKey(systemId) {
  return `${storagePrefix}:state:${systemId}`;
}

function readJson(key, fallback) {
  if (!canUseStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
}

function mergeState(defaultState, storedState) {
  if (!storedState || storedState.systemId !== defaultState.systemId) return defaultState;
  return {
    ...defaultState,
    ...storedState,
    settings: {
      ...defaultState.settings,
      ...(storedState.settings || {}),
    },
    submissions: Array.isArray(storedState.submissions) ? storedState.submissions : [],
    activity: Array.isArray(storedState.activity) ? storedState.activity : [],
  };
}

export function loadDemoState(system, lang) {
  const defaults = getInitialDemoState(system, lang);
  return mergeState(defaults, readJson(stateKey(system.id), null));
}

export function saveDemoState(systemId, state) {
  writeJson(stateKey(systemId), {
    ...state,
    updatedAt: new Date().toISOString(),
  });
}

export function clearDemoState(systemId) {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(stateKey(systemId));
}

export function clearAllDemoData() {
  if (!canUseStorage()) return;
  Object.keys(window.localStorage)
    .filter(key => key.startsWith(storagePrefix))
    .forEach(key => window.localStorage.removeItem(key));
}

export function startDemoSession() {
  if (!canUseStorage()) return Date.now() + sessionDuration;
  const current = Number(window.localStorage.getItem(sessionEndKey));
  if (current) return current;
  const endTime = Date.now() + sessionDuration;
  window.localStorage.setItem(sessionEndKey, String(endTime));
  return endTime;
}

export function getDemoEndTime() {
  if (!canUseStorage()) return Date.now() + sessionDuration;
  return Number(window.localStorage.getItem(sessionEndKey)) || startDemoSession();
}

export function extendDemoSession(extraMs = 60 * 60 * 1000) {
  const base = Math.max(Date.now(), getDemoEndTime());
  const endTime = base + extraMs;
  if (canUseStorage()) window.localStorage.setItem(sessionEndKey, String(endTime));
  return endTime;
}

export function clearDemoSession() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(sessionEndKey);
}
