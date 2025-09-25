import {
  SEG_MAX,
  toSegments,
  depthOf,
  parentOf,
  isDirectChildOf,
  suggestNextChildWithBubble,
} from '../../../src/utils/chartOfAccounts';

describe('utils/chartOfAccounts', () => {
  it('toSegments parses dotted numeric codes and returns NaN for invalid segments', () => {
    expect(toSegments('2.1.3')).toEqual([2, 1, 3]);
    const segs = toSegments('2.x');
    expect(segs[0]).toBe(2);
    expect(Number.isNaN(segs[1])).toBe(true);
  });

  it('depthOf returns number of segments, or 0 for empty', () => {
    expect(depthOf('')).toBe(0);
    expect(depthOf('2')).toBe(1);
    expect(depthOf('2.1.3')).toBe(3);
  });

  it('parentOf returns code without last segment, or empty when top-level', () => {
    expect(parentOf('2.1.3')).toBe('2.1');
    expect(parentOf('2')).toBe('');
    expect(parentOf(' 3.4 ')).toBe('3');
  });

  it('isDirectChildOf checks one-level children, supports root parent as empty', () => {
    expect(isDirectChildOf('2.1', '2')).toBe(true);
    expect(isDirectChildOf('2.1.1', '2')).toBe(false);
    expect(isDirectChildOf('3', '')).toBe(true);
    expect(isDirectChildOf('3.1', '')).toBe(false);
  });

  it('suggestNextChildWithBubble suggests next child when there is room', () => {
    const all = new Set<string>(['1', '2', '3', '2.1', '2.2']);
    const res = suggestNextChildWithBubble('2', all);
    expect(res).not.toBeNull();
    expect(res!.parent).toBe('2');
    expect(res!.suggestion).toBe('2.3');
    expect(res!.bubbled).toBe(false);
  });

  it('suggestNextChildWithBubble bubbles up when last segment reaches SEG_MAX', () => {
    const all = new Set<string>(['1', '2', '3']);
    for (let i = 1; i <= SEG_MAX; i++) {
      all.add(`2.${i}`);
    }
    const res = suggestNextChildWithBubble('2', all);
    expect(res).not.toBeNull();
    expect(res!.bubbled).toBe(true);
    expect(res!.parent).toBe('');
    // At root, next after existing [1,2,3] is 4
    expect(res!.suggestion).toBe('4');
  });

  it('suggestNextChildWithBubble returns null when root is fully saturated (1..SEG_MAX)', () => {
    const all = new Set<string>();
    for (let i = 1; i <= SEG_MAX; i++) {
      all.add(String(i));
    }
    // Also saturate a sub-branch to force a bubble attempt that ends at root
    for (let i = 1; i <= SEG_MAX; i++) {
      all.add(`2.${i}`);
    }
    const res = suggestNextChildWithBubble('2', all);
    expect(res).toBeNull();
  });
});
