// ─── Shared data types (replaces Prisma-generated types) ───────────────────

export interface YoutubeVideo {
  id: string;
  title: string;
  description?: string | null;
  youtubeId: string;
  order: number;
}

export interface MotionDesign {
  id: string;
  title: string;
  description?: string | null;
  filename: string;       // file must live in /public/uploads/
  thumbnail?: string | null; // optional still image, also in /public/uploads/
  order: number;
}
