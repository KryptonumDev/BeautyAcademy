"use client";
import Button from "@/components/atoms/Button";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useMemo } from "react";

// from 0 to 1
// const progress = .75;

const Hero = ({ id, courseSlug, lessonSlug, chapterLessons, video, name }) => {
  const currentChapter = useMemo(() => {
    let currChapter = false;

    chapterLessons.every((chapter) => {
      chapter.chapterContent.forEach(({ lesson }) => {
        if (lesson.id === id) currChapter = chapter;
      });
      return !currChapter;
    });

    return currChapter;
  }, [chapterLessons, id]);

  const currChapterIndex = useMemo(() => {
    let currIndex = false;

    chapterLessons.every((chapter, i) => {
      if (chapter.chapterName === currentChapter.chapterName) currIndex = i;
      return !currIndex;
    });

    return currIndex;
  }, [chapterLessons, currentChapter]);

  const currentLessonIndex = useMemo(() => {
    let currIndex = false;

    currentChapter.chapterContent.every(({ lesson }, i) => {
      if (lesson.id === id) currIndex = i;
      return !currIndex;
    });

    return currIndex;
  }, [currentChapter, id]);

  return (
    <section className={styles.wrapper}>
      <div>
        <div className={styles.video}>
          <iframe
            style={{ width: "100%", height: "100%" }}
            src={video}
            title={name}
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
          />
        </div>
        <nav className={styles.nav}>
          {currentLessonIndex === 0 ? (
            <>
              {currChapterIndex === 0 ? (
                <div />
              ) : (
                <Button
                  href={`/courses/${courseSlug}/${
                    chapterLessons[currChapterIndex - 1].chapterContent[
                      chapterLessons[currChapterIndex - 1].chapterContent
                        .length - 1
                    ].lesson.slug
                  }`}
                  variant="secondary"
                  prev
                >
                  предыдущий раздел
                </Button>
              )}
            </>
          ) : (
            <Button
              href={`/courses/${courseSlug}/${
                currentChapter.chapterContent[currentLessonIndex - 1].lesson
                  .slug
              }`}
              variant="secondary"
              prev
            >
              предыдущий урок
            </Button>
          )}
          {/* <Button>Отметить как завершенное</Button> */}
          <div />
          {currentChapter.chapterContent.length > currentLessonIndex + 1 ? (
            <Button
              href={`/courses/${courseSlug}/${
                currentChapter.chapterContent[currentLessonIndex + 1].lesson
                  .slug
              }`}
              variant="secondary"
              next
            >
              следующий урок
            </Button>
          ) : (
            <>
              {currChapterIndex === chapterLessons.length - 1 ? (
                <div />
              ) : (
                <Button
                  href={`/courses/${courseSlug}/${
                    chapterLessons[currChapterIndex + 1].chapterContent[0]
                      .lesson.slug
                  }`}
                  variant="secondary"
                  next
                >
                  следующий раздел
                </Button>
              )}
            </>
          )}
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
              {currChapterIndex+1}.{i + 1} {el.lesson.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
