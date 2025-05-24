export interface ICardProps {
  name: string;
  location: string;
  onClick: () => void;
  image?: string;
  logo?: string | null;
}
