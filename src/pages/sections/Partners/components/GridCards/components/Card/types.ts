export interface ICardProps {
  name: string;
  location: string;
  onClick: () => void;
  image?: string | null;
  logo?: string | null;
}