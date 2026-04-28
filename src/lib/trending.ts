export interface Clip {
  rating?: number;
  moments?: Array<{ time: string; note: string }>;
  thumbnail?: string;
  duration?: string;
  clipType?: string;
  tags: string[];
  collection?: string;
  stage?: string;
  date: string;
}

export function trendingScore(clip: Clip): number {
  let s = 0;

  // Manual rating (0–25 pts)
  s += (clip.rating || 0) * 5;

  // Key moments = actively curated content (+5 each, max 15)
  s += Math.min((clip.moments?.length || 0) * 5, 15);

  // Has thumbnail = visual/YouTube content (+8)
  if (clip.thumbnail) s += 8;

  // Duration → short clips trend more on social
  if (clip.duration) {
    const parts = clip.duration.split(':').map(Number);
    const secs = parts.length === 3
      ? parts[0] * 3600 + parts[1] * 60 + parts[2]
      : (parts[0] || 0) * 60 + (parts[1] || 0);
    if (secs > 0 && secs < 180)  s += 20; // < 3 min  — highly shareable
    else if (secs < 600)          s += 12; // < 10 min — digestible
    else if (secs < 1800)         s += 6;  // < 30 min — moderate
  }

  // Clip type boosts
  const typeBoost: Record<string, number> = {
    news: 15, inspiration: 12, entertainment: 10,
    tutorial: 6, research: 4,
  };
  s += typeBoost[clip.clipType || ''] || 0;

  // Tags = discoverability (+2 each, max 10)
  s += Math.min(clip.tags.length * 2, 10);

  // Organized into collection = curated quality (+5)
  if (clip.collection) s += 5;

  // Currently watching = hot content (+5)
  if (clip.stage === 'watching') s += 5;

  // Recency bonus
  const daysOld = (Date.now() - new Date(clip.date).getTime()) / 86_400_000;
  if (daysOld < 7)  s += 10;
  else if (daysOld < 30) s += 5;

  return Math.min(Math.round(s), 99);
}

export function trendingMeta(score: number): {
  emoji: string; label: string; color: string; bg: string;
} {
  if (score >= 70) return { emoji: '🔥', label: 'Trending',  color: '#059669', bg: '#ECFDF5' };
  if (score >= 40) return { emoji: '📈', label: 'Rising',    color: '#D97706', bg: '#FFFBEB' };
  return             { emoji: '◦',  label: 'Low',       color: '#9CA3AF', bg: '#F9FAFB' };
}
