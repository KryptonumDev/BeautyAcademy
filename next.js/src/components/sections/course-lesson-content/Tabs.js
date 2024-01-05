'use client';
import { useState } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

const tabs = [
  "О уроке", "Программа курса"
]

const Tabs = ({ chapters, courseSlug, content }) => {
  const [tab, setTab] = useState(0);
  return (
    <>
      <div className={styles.tabs}>
        {tabs.map((tabName, i) => (
          <button
            aria-current={i === tab}
            onClick={() => setTab(i)}
            key={i}
          >{tabName}</button>
        ))}
      </div>
      <div
        className={styles.about}
        style={{ display: tab !== 0 && 'none' }}
        dangerouslySetInnerHTML={{ __html: content ? content : 'К сожалению тут пока ничего нет' }}
      />
      <div
        className={styles.tableOfContent}
        style={{ display: tab !== 1 && 'none' }}
      >
        <ol>
          {chapters?.map(({ chapterName, chapterContent }, i) => (
            <li key={i}>
              <span className={styles.title}>
                {chapters.length > 1 && <span>Глава {i + 1} </span>}
                {chapterName}
              </span>
              <span className={styles.flexIcon}>
                <Clock />
                {(() => {
                  let minutes = 0;
                  chapterContent.forEach(el => {
                    minutes += el.lesson.lessonAcf.lengthInMinutes;
                  });
                  return `${minutes} минут`
                })()}
              </span>
              {chapterContent && (
                <ol>
                  {chapterContent.map(({ lesson }, i) => (
                    <li className={styles.item} key={i}>
                      <Link href={`/courses/${courseSlug}/${lesson.slug}`}>
                        <span className={styles.name}>{lesson.title}</span>
                        <span className={styles.flexIcon}>
                          <Play />
                          {lesson.lessonAcf.lengthInMinutes} минут
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default Tabs;

const Play = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='25'
    height='25'
    fill='none'
    viewBox='0 0 25 25'
  >
    <path
      stroke='#C9BBB7'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M21.563 12.293a9.5 9.5 0 11-19 0 9.5 9.5 0 0119 0z'
    ></path>
    <path
      stroke='#C9BBB7'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M16.831 11.464a1 1 0 010 1.659l-6.21 4.183a1 1 0 01-1.559-.83V8.111a1 1 0 011.56-.83l6.21 4.183z'
    ></path>
  </svg>
)

const Clock = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='25'
    height='25'
    fill='none'
    viewBox='0 0 25 25'
  >
    <path
      stroke='#2B483C'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12.063 6.293v5a1 1 0 001 1h5m-6 9.5a9.5 9.5 0 110-19 9.5 9.5 0 010 19z'
    ></path>
  </svg>
)