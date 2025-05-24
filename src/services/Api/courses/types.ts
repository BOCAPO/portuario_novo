export interface ICourseData {
  title: string;
  type: string;
  author: string;
  description: string | React.ReactElement;
  image_dir: string;
  url: string;
  duration: string;
  available_until: string;
  available_from: string;
  old_price: string | null;
  price: string;
}

export interface IGetAllCourses {
  count: number;
  next: null | string;
  previous: null | string;
  results: ICourseData[];
}
