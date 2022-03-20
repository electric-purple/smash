interface RagDoll {
  date: string;
  time: string | "BYE";
  court?: "EAST" | "WEST" | "" | string;
  home?: string;
  away?: string;
  homeScore?: string;
  awayScore?: string;
  status?: "SCHEDULED" | "ACTIVE" | "CANCELLED" | "POSTPONED" | "FINAL" | "FINAL/OT" | "FINAL/SO" | string;
  title?: string;
  description?: string;
}
