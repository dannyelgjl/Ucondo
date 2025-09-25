import { ExpenseItem } from '../services/data';

export const normalizeCode = (code: string) => {
  return code.trim().replace(',', '.');
};

export const formatPtBrFortaleza = (iso: string) => {
  const date = new Date(iso);
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Fortaleza',
  }).format(date);
};

const toSegments = (code: string): number[] =>
  code
    .trim()
    .split('.')
    .map(s => {
      const n = Number(s);
      return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
    });

export const compareCode = (aCode: string, bCode: string): number => {
  const a = toSegments(aCode);
  const b = toSegments(bCode);
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const ai = a[i] ?? -1;
    const bi = b[i] ?? -1;
    if (ai !== bi) return ai - bi;
  }
  return 0;
};

export const compareExpenseByCodeThenDate = (
  x: ExpenseItem,
  y: ExpenseItem,
): number => {
  const byCode = compareCode(x.code, y.code);
  if (byCode !== 0) return byCode;
  return x.createdAt < y.createdAt ? 1 : x.createdAt > y.createdAt ? -1 : 0;
};

export const normalizeStr = (s: string) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();
