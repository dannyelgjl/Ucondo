import {
  normalizeCode,
  formatPtBrFortaleza,
  compareCode,
  compareExpenseByCodeThenDate,
  getTitleColor,
  normalizeStr,
} from '../../../src/utils/format';
import { theme } from '../../../src/styles/theme/theme';

describe('utils/format', () => {
  it('normalizeCode replaces comma with dot and trims', () => {
    expect(normalizeCode(' 2,1 ')).toBe('2.1');
    expect(normalizeCode('3.0')).toBe('3.0');
  });

  it('formatPtBrFortaleza formats ISO date to pt-BR in America/Fortaleza', () => {
    const iso = '2024-01-02T03:04:05.000Z';
    const out = formatPtBrFortaleza(iso);
    expect(out).toContain('02/01/2024');
    expect(out).toContain('00:04');
  });

  it('compareCode compares hierarchical codes correctly', () => {
    expect(compareCode('2', '2')).toBe(0);
    expect(compareCode('2', '3')).toBeLessThan(0);
    expect(compareCode('3', '2')).toBeGreaterThan(0);

    expect(compareCode('2', '2.1')).toBeLessThan(0);

    expect(compareCode('2.10', '2.2')).toBeGreaterThan(0);
    expect(compareCode('2.2', '2.10')).toBeLessThan(0);

    expect(compareCode('2.1', '2.1.1')).toBeLessThan(0);
  });

  it('compareExpenseByCodeThenDate sorts by code then date desc within same code', () => {
    const a = { code: '2.1', createdAt: '2024-01-01T00:00:00.000Z' } as any;
    const b = { code: '2.1', createdAt: '2024-01-02T00:00:00.000Z' } as any;
    const c = { code: '2.2', createdAt: '2020-01-01T00:00:00.000Z' } as any;

    expect(compareExpenseByCodeThenDate(a, c)).toBeLessThan(0);

    expect(compareExpenseByCodeThenDate(a, b)).toBeGreaterThan(0);
    expect(compareExpenseByCodeThenDate(b, a)).toBeLessThan(0);
  });

  it('getTitleColor returns theme-based or computed HSL based on first segment', () => {
    expect(getTitleColor('1.2', theme)).toBe(theme.colors.feedbackSuccessDark);
    expect(getTitleColor('2.5', theme)).toBe(theme.colors.brandPrimaryMedium);

    expect(getTitleColor('3.0', theme)).toBe('hsl(0, 80%, 62%)');
    expect(getTitleColor('5', theme)).toBe('hsl(0, 80%, 46%)');
  });

  it('normalizeStr lowercases, strips diacritics, trims', () => {
    expect(normalizeStr('  João Árvore  ')).toBe('joao arvore');
    expect(normalizeStr('CAFÉ')).toBe('cafe');
  });
});
