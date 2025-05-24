/* eslint-disable camelcase */
import Head from 'next/head';

import { useEffect, useState } from 'react';

import Header from '~components/Layout/Header/Header';
import { instance } from '~services/Api/http';
import { priceFormatter } from '~utils/priceFormatter';

import { useAllCourses } from '~hooks/query/useCourses';

import CourseCard from './components/CourseCard';
import { ICourseCardData } from './types';

import styles from './Cursos.module.scss';

export default function Eventos() {
  const listOfAllCourses = useAllCourses();
  const [courses, setCourses] = useState<any[]>();

  const classroomCourses = courses?.filter((course) => {
    return course.type === 'Presencial';
  });

  const freeCourses = courses?.filter((course) => {
    return course.price === 0;
  });

  const liveCourses = courses?.filter((course) => {
    return course.type === 'Ao Vivo';
  });

  const onlineCourses = courses?.filter((course) => {
    return course.type === 'Online';
  });

  // Setting course state
  useEffect(() => {
    const getCourses = async () => {
      const response = await instance.get('/courses/meta/');

      // eslint-disable-next-line array-callback-return, consistent-return
      const courses = response.data.results.filter(
        ({ available_from, available_until, title }: any) => {
          const availableFrom = available_from ? new Date(available_from) : new Date(Date.now());
          const availableFromDate = availableFrom.getUTCDate();
          const availableFromMonth = availableFrom.getUTCMonth();
          const availableFromYear = availableFrom.getUTCFullYear();

          const availableUntil = available_until ? new Date(available_until) : new Date(Date.now());
          const availableUntilDate = availableUntil.getUTCDate();
          const availableUntilMonth = availableUntil.getUTCMonth();
          const availableUntilYear = availableUntil.getUTCFullYear();

          const today = new Date();
          const actualDate = today.getUTCDate();
          const actualMonth = today.getUTCMonth();
          const actualYear = today.getUTCFullYear();

          const dayVerify =
            actualMonth < availableUntilMonth ||
            (actualDate >= availableFromDate && actualDate <= availableUntilDate);

          const monthVerify =
            (actualMonth >= availableFromMonth || actualYear > availableFromYear) &&
            actualMonth <= availableUntilMonth;

          const yearVerify = actualYear >= availableFromYear && actualYear <= availableUntilYear;

          return dayVerify && monthVerify && yearVerify;
        }
      );

      setCourses(courses);
    };
    getCourses();
  }, []);

  const renderCoursesList = (coursesList: any) => {
    return coursesList.map(({ id, title, image_dir, old_price, price, url }: ICourseCardData) => {
      let courseDate = '';
      let courseAvailabilityDate = '';

      // Getting dates
      // eslint-disable-next-line array-callback-return
      coursesList.map((course: any) => {
        if (course.id === id) {
          if (course.date) {
            courseDate = course.date;

            // Formatting date
            const dateSplittedToFormat = courseDate.split('-');
            courseDate = `${dateSplittedToFormat[2]}/${dateSplittedToFormat[1]}/${dateSplittedToFormat[0]}`;
          }

          if (course.buyBefore) {
            courseAvailabilityDate = course.buyBefore;

            // Formatting date
            const dateSplittedToFormat = courseAvailabilityDate.split('-');
            courseAvailabilityDate = `${dateSplittedToFormat[2]}/${dateSplittedToFormat[1]}`;
          }
        }
      });

      return (
        <CourseCard
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
    <>
      <Head>
        <title>Cursos Econext</title>
      </Head>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <h3 className={styles.coursesApresentationTitle}>
            Bem-vindo à plataforma de cursos do Econext!
          </h3>
          <p className={styles.coursesApresentationText}>
            Aprendizado de qualquer lugar e a qualquer hora. Cursos online com certificação, que
            ampliam seu conhecimento e agregam no seu desenvolvimento profissional. Desenvolva suas
            habilidades na área Ambiental com quem entende do assunto. Afinal, sempre há algo novo
            para aprender. :)
          </p>
          {courses &&
            classroomCourses &&
            liveCourses &&
            freeCourses &&
            onlineCourses &&
            listOfAllCourses !== 'loading' && (
              <div className={styles.cards}>
                {classroomCourses.length > 0 && (
                  <>
                    <h3>Cursos Presenciais</h3>
                    <div>{renderCoursesList(classroomCourses)}</div>
                  </>
                )}

                {onlineCourses.length > 0 && (
                  <>
                    <h3>Cursos Online</h3>
                    <div>{renderCoursesList(onlineCourses)}</div>
                  </>
                )}

                {liveCourses.length > 0 && (
                  <>
                    <h3>Cursos Ao Vivo</h3>
                    <div>{renderCoursesList(liveCourses)}</div>
                  </>
                )}

                {freeCourses.length > 0 && (
                  <>
                    <h3>Cursos Gratuitos</h3>
                    <div>{renderCoursesList(freeCourses)}</div>
                  </>
                )}
              </div>
            )}
        </main>
      </div>
    </>
  );
}
