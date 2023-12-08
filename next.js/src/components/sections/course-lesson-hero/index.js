'use client'
import Button from '@/components/atoms/Button';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useMemo } from 'react';

// from 0 to 1
// const progress = .75;

const Hero = ({
  id,
  courseSlug,
  lessonSlug,
  chapterLessons,
  video,
  name
}) => {

  const currentChapter = useMemo(() => {
    let currChapter = false

    chapterLessons.every((chapter) => {
      chapter.chapterContent.forEach(({ lesson }) => {
        if (lesson.id === id) currChapter = chapter
      })
      return !currChapter;
    });

    return currChapter
  }, [chapterLessons, id])

  return (
    <section className={styles.wrapper}>
      <div>
        <div className={styles.video}>
          <iframe style={{ width: '100%', height: '100%' }} src={video} title={name} frameborder="0" allow="autoplay; fullscreen; picture-in-picture" />
        </div>
        <nav className={styles.nav}>
          <Button variant='secondary' prev>предыдущий урок</Button>
          <Button>Отметить как завершенное</Button>
          <Button variant='secondary' next>следующий урок</Button>
        </nav>
      </div>
      <div>
        {/* <div className={styles.progress}>
          <p>Завершенный {progress * 100}%</p>
          <div className={styles.bar}><div style={{ transform: `scaleX(${progress})` }}></div></div>
        </div> */}
        <h1 className="h3">{currentChapter.chapterName}</h1>
        <div className={styles.lessons}>
          {currentChapter.chapterContent.map((el, i) => (
            <Link
              href={`/courses/${courseSlug}/${el.lesson.slug}`}
              key={i}
              aria-current={el.lesson.slug === lessonSlug}
            >
              {1}.{i + 1} {el.lesson.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;