export interface IRegisterEventDrawerProps {
  open: boolean;
  onClose: () => void;

  className?: string;
}

export interface IEventCategory {
  id: number;
  title: string;
}

export type TError = {
  type: 'required' | 'validate';
};

export interface IToastState {
  open: boolean;
  severity: 'success' | 'error' | 'info' | 'warning';
  messages: string[];
}

export interface IEventFormData {
  category: number;
  description: string;
  end_date: Date;
  start_date: Date;
  local: string;
  title: string;

  webpage_url?: string;
  image_dir?: File | null;
}
