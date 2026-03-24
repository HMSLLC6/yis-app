import { useState, useCallback, useMemo } from 'react';
import { CONCEPTS, MODULES } from '../data/concepts';

const STORAGE_KEY = 'yis_progress';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.readConcepts)) {
        return parsed;
      }
    }
  } catch (e) {
    // corrupted data — reset
  }
  return { readConcepts: [], lastRead: null };
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // storage full or unavailable — silently fail
  }
}

export default function useProgress() {
  const [progress, setProgress] = useState(loadProgress);

  const readConcepts = progress.readConcepts;

  const markRead = useCallback((conceptId) => {
    setProgress((prev) => {
      if (prev.readConcepts.includes(conceptId)) return prev;
      const next = {
        readConcepts: [...prev.readConcepts, conceptId],
        lastRead: new Date().toISOString().slice(0, 10),
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const getModuleProgress = useCallback((moduleId) => {
    const moduleConcepts = CONCEPTS.filter(c => c.module === moduleId);
    const total = moduleConcepts.length;
    const read = moduleConcepts.filter(c => readConcepts.includes(c.id)).length;
    const percent = total > 0 ? Math.round((read / total) * 100) : 0;
    return { read, total, percent };
  }, [readConcepts]);

  const totalProgress = useMemo(() => {
    const total = CONCEPTS.length;
    const read = readConcepts.length;
    const percent = total > 0 ? Math.round((read / total) * 100) : 0;
    return { read, total, percent };
  }, [readConcepts]);

  return { readConcepts, markRead, getModuleProgress, totalProgress };
}
