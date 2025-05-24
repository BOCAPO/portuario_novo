/* eslint-disable camelcase */
import { Button } from '@mui/material';
import Container from '~components/Layout/Container/Container';
import { priceFormatter } from '~utils/priceFormatter';

import { useEffect, useState } from 'react';
import { useAllCourses } from '~hooks/query/useCourses';

import SectionCourseCard from './components/SectionCourseCard';
import { ICourseData } from './types';
import { instance } from '~services/Api/http';

import scss from './Cursos.module.scss';

const Cursos = () => {
  const allCourses = useAllCourses();
  const [courses, setCourses] = useState<any>();

  //Setting course state
  useEffect(() => {
    const getCourses = async () => {
      const response = await instance.get("/courses/meta/")
      setCourses(response.data.results);
    };
    getCourses();
  }, []);

  const showCardList = () => {
    const coursesToView = (allCourses as ICourseData[]).slice(0, 3);
    
    return coursesToView?.map(({ id, url, title, image_dir, old_price, price }: ICourseData) => {
      let courseDate = "";
      let courseAvailabilityDate = "";

      //Getting dates
      courses?.map((course: any) => {
        if(course.id == id) {

          if(course.date) {
            courseDate = course.date;

            // Formatting date
            let dateSplittedToFormat = courseDate.split("-");
            courseDate = `${dateSplittedToFormat[2]}/${dateSplittedToFormat[1]}/${dateSplittedToFormat[0]}`  
          };

          if(course.buyBefore) {
            courseAvailabilityDate = course.buyBefore;

            // Formatting date
            let dateSplittedToFormat = courseAvailabilityDate.split("-");
            courseAvailabilityDate = `${dateSplittedToFormat[2]}/${dateSplittedToFormat[1]}`  
          };

        }
      });
      
      return (
        <SectionCourseCard
          key={title}
          title={title}
          image={image_dir}
          oldPrice={old_price ? priceFormatter(+old_price) : old_price}
          price={+price !== 0 ? priceFormatter(+price) : price}
          link={url}
          width={320}
          date={courseDate}
          courseAvailabilityDate={courseAvailabilityDate}
        />
      );
    });
  };

  return (
    <Container id="cursos" backgroundColor="backgroundIce" className={scss.container}>
      <h2 className={scss.title}>Cursos</h2>
      <div className={scss.cards}>
        {allCourses !== 'loading' ? showCardList() : <p>Carregando cursos...</p>}
      </div>
      <Button href="/cursos" variant="outlined" className={scss.buttonSeeMore}>
        Ver mais cursos
      </Button>
    </Container>
  );
};
export default Cursos;
