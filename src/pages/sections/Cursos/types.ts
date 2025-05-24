export interface ICourseData {
  id: number;
  title: string;
  image_dir: string;
  url: string;
  old_price: string | null;
  price: string;
}

export interface ICoursesProps {
  data: ICourseData[];
}
