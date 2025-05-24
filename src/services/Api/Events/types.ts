export interface IEventFormDataRequest {
  category: number;
  description: string;
  end_date: string;
  start_date: string;
  local: string;
  title: string;

  webpage_url?: string;
  image_dir?: File | null;
}
