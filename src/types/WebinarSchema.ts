export interface EventType {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface APIResponse {
  data?: EventType[];
  error?: string;
}
