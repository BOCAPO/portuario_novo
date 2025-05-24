/* eslint-disable camelcase */
export interface IEventsProps {
  title: string;
  start_date: string;
  end_date: string;
  local: string;
  image_dir: string | null;
  webpage_url: string | null;
  description: string;
  category?: number | null;
  category_title?: string | null;
}
