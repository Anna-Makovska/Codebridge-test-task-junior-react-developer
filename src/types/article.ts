export interface Article {
  id: number;
  title: string;
  image_url: string;
  published_at: string;
  summary: string;
  url: string;
  news_site: string;
  updated_at?: string;
  featured?: boolean;
  authors?: string[];
  launches?: Array<{
    id: string;
    provider: string;
  }>;
  events?: Array<{
    id: number;
    provider: string;
  }>;
}
