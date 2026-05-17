import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getYoutubeThumbnail(youtubeId: string, quality: 'hq' | 'maxres' = 'hq') {
  return `https://i.ytimg.com/vi/${youtubeId}/${quality === 'maxres' ? 'maxresdefault' : 'hqdefault'}.jpg`;
}

export function extractYoutubeId(urlOrId: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = urlOrId.match(pattern);
    if (match) return match[1];
  }
  return null;
}
