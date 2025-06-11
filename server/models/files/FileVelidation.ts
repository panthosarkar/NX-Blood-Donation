export interface FileData {
  websiteId: number;
  delay?: number;
  mediaType?: string;
  primaryImage?: string;
  recommendedSize?: string;
  targetUrl?: string;
  status: "image" | "text" | "youtube" | "mixed";
}
