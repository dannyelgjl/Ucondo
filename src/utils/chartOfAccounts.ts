export const SEG_MAX = 999;

export const toSegments = (code: string): number[] =>
  code
    .trim()
    .split('.')
    .map(s => {
      const n = Number(s);
      return Number.isFinite(n) ? n : Number.NaN;
    });

export const depthOf = (code: string) =>
  code.trim() ? code.trim().split('.').length : 0;

export const parentOf = (code: string): string => {
  const parts = code.trim().split('.');
  parts.pop();
  return parts.join('.');
};

export const isDirectChildOf = (child: string, parent: string) => {
  if (!parent) return depthOf(child) === 1;
  return (
    child.startsWith(parent + '.') && depthOf(child) === depthOf(parent) + 1
  );
};

export function suggestNextChildWithBubble(
  initialParent: string,
  allCodes: Set<string>,
): { parent: string; suggestion: string; bubbled: boolean } | null {
  let parent = initialParent.trim();
  let bubbled = false;

  while (true) {
    const children = Array.from(allCodes).filter(c =>
      isDirectChildOf(c, parent),
    );

    let maxLastSeg = 0;
    if (children.length > 0) {
      for (const c of children) {
        const segs = toSegments(c);
        const last = segs[segs.length - 1];
        if (!Number.isNaN(last)) {
          maxLastSeg = Math.max(maxLastSeg, last);
        }
      }
    }

    if (maxLastSeg < SEG_MAX) {
      const next = String(maxLastSeg + 1);
      const suggestion = parent ? `${parent}.${next}` : next;
      return { parent, suggestion, bubbled };
    }

    const up = parentOf(parent);
    if (up === parent) {
      return null;
    }
    parent = up;
    bubbled = true;
  }
}
