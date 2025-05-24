export interface INewsGetStaticProps {
  title: string;
  slug: string;
  date: string;
  image_dir: string;
  text: string;
  content_type: string;
  categories: ICategoryNews[];
}

export interface ICategoryNews {
  id: number;
  title: string;
}
