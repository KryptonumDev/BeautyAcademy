'use client';
import { useState } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

const tabs = [
  "О курсе", "Что вы узнаете"
]

const Tabs = ({ chapters }) => {
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
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni repellendus nisi veniam dolore, libero soluta animi inventore at tenetur tempora distinctio eveniet laboriosam quaerat doloremque nobis voluptatibus facere aliquid suscipit tempore officiis! Id nostrum necessitatibus, nihil rem, a excepturi laborum inventore officia praesentium dolor numquam cumque architecto tempora aut cum suscipit ipsam. Odio deserunt doloremque dolor corrupti autem. Nostrum iusto delectus aperiam, deleniti, libero nemo quos praesentium sequi unde deserunt debitis qui laudantium quibusdam esse ut laborum doloribus voluptatem modi minus. Nostrum sed maiores iste blanditiis repellat, perferendis omnis doloribus quo. Voluptate sed cumque vel incidunt iusto id tempore optio?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni repellendus nisi veniam dolore, libero soluta animi inventore at tenetur tempora distinctio eveniet laboriosam quaerat doloremque nobis voluptatibus facere aliquid suscipit tempore officiis! Id nostrum necessitatibus, nihil rem, a excepturi laborum inventore officia praesentium dolor numquam cumque architecto tempora aut cum suscipit ipsam. Odio deserunt doloremque dolor corrupti autem. Nostrum iusto delectus aperiam, deleniti, libero nemo quos praesentium sequi unde deserunt debitis qui laudantium quibusdam esse ut laborum doloribus voluptatem modi minus. Nostrum sed maiores iste blanditiis repellat, perferendis omnis doloribus quo. Voluptate sed cumque vel incidunt iusto id tempore optio?</p>
      </div>
      <div
        className={styles.tableOfContent}
        style={{ display: tab !== 1 && 'none' }}
      >
        <ol>
          {chapters.map(({ name, duration, lessons }, i) => (
            <li key={i}>
              <span className={styles.title}>
                <span>Глава {i+1} </span>
                {name}
              </span>
              <span className={styles.flexIcon}>
                <Clock />
                {duration}
              </span>
              {lessons && (
                <ol>
                  {lessons.map(({ name, duration, href }, i) => (
                    <li className={styles.item} key={i}>
                      <Link href={`${href}`}>
                        <span className={styles.name}>{name}</span>
                        <span className={styles.flexIcon}>
                          <Play />
                          {duration}
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