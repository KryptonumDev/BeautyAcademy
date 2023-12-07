'use client';
import { useState } from 'react';
import styles from './styles.module.scss';
import TextSection from './TextSection';
import ListSection from './ListSection';
import Link from 'next/link';

const tabs = [
  "О курсе",
  "Что вы узнаете",
  // "Отзывы"
]

const Tabs = ({ courseSlug, sections, chapters }) => {
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
      >
        {sections?.map((el, i) => {
          switch (el.fieldGroupName) {
            case "Course_Courseacf_About_TextSection":
              return <TextSection
                key={i}
                isColumn={el.isColumn}
                isReversed={el.isReversed}
                centered={el.isCentered}
                video={el.video}
                image={el.image}
                content={el.content}
                cta={el.cta}
              />
            case "Course_Courseacf_About_ListSection":
              return <ListSection
                key={i}
                title={el.title}
                list={el.list}
                textUnderList={el.textUnderList}
                linkUnderSection={el.linkUnderSection}
              />
            default:
              return null
          }
        })}
      </div>
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
                      <Link href={`/course/${courseSlug}/${lesson.slug}`}>
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
      {/* <div
        className={styles.reviews}
        style={{ display: tab !== 2 && 'none' }}
      >
        {reviews.map(({ img, name, content, rating }, i) => (
          <div className={styles.item} key={i}>
            <Img
              src={img}
              width={80}
              height={80}
              className={styles.img}
            />
            <p className={styles.name}>{name}</p>
            <Markdown className={styles.content}>{content}</Markdown>
            {rating && (
              <div className={styles.rating}>
                <Heart />
                <span><strong>{rating}</strong>/5</span>
              </div>
            )}
          </div>
        ))}
      </div> */}
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

const Heart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox='0 0 39 39' fill="none">
    <path
      fill="url(#heart)"
      d="M26.094 6.419c-2.67 0-4.37 1.298-5.362 2.472-.495.585-1.816.585-2.311 0-.992-1.174-2.692-2.472-5.362-2.472-4.873 0-7.809 4.646-7.809 8.475 0 4.976 8.617 11.977 12.485 14.868 1.1.822 2.583.822 3.683 0 3.868-2.89 12.485-9.889 12.485-14.867 0-3.83-2.934-8.476-7.81-8.476z"
    ></path>
    <defs>
      <linearGradient
        id="heart"
        x1="5.25"
        x2="35.461"
        y1="29.044"
        y2="29.044"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F7C479"></stop>
        <stop offset="0.253" stopColor="#DCA855"></stop>
        <stop offset="0.582" stopColor="#C79442"></stop>
        <stop offset="0.764" stopColor="#BC7F1D"></stop>
        <stop offset="1" stopColor="#BA7403"></stop>
      </linearGradient>
    </defs>
  </svg>
)