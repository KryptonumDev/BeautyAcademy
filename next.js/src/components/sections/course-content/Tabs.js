'use client';
import { useState } from 'react';
import styles from './styles.module.scss';
import TextSection from './TextSection';
import ListSection from './ListSection';
import Link from 'next/link';

const tabs = [
  "О курсе", "Что вы узнаете", "Отзывы"
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
        <TextSection {...{
          heading: 'Сосредоточьтесь на развитии',
          paragraph: 'В эксклюзивной онлайн-академии красоты мы не просто даем знания и навыки — мы создаем экспертов. Здесь каждый момент — это инвестиция в будущее: уроки доступны круглосуточно, сертификаты на трех языках и современные методы обучения. С нами вы больше не мечтаете, вы воплощаете это в жизнь!',
          img: 'https://cdn.sanity.io/images/zm0qqcml/production/4cceb348ab4f3bb779951f3d5a10bf2106f9b8af-1813x798.webp?fit=max&w=1200&h=1200'
        }} />
        <TextSection {...{
          isColumn: true,
          heading: 'Чему вы научитесь на этом онлайн-курсе?',
          paragraph: 'Мы проводим теоретические занятия в прямом эфире, он-лайн, они также записываются Мы предлагаем самый лучший и удобный способ обучения косметолога.Разработано с учетом потребностей',
          img: 'https://cdn.sanity.io/images/zm0qqcml/production/4cceb348ab4f3bb779951f3d5a10bf2106f9b8af-1813x798.webp?fit=max&w=1200&h=1200',
          cta: {
            theme: 'primary',
            text: 'Больше о курсах',
            href: '/courses'
          }
        }} />
        <TextSection {...{
          isColumn: true,
          isReversed: true,
          heading: 'Для кого этот курс?',
          paragraph: `Онлайн-курс направлен на:\n\n- Начинающие косметологи\n- Начинающие косметологи\n- Начинающие косметологи`,
          img: 'https://cdn.sanity.io/images/zm0qqcml/production/4cceb348ab4f3bb779951f3d5a10bf2106f9b8af-1813x798.webp?fit=max&w=1200&h=1200',
          cta: {
            theme: 'primary',
            text: 'Больше о курсах',
            href: '/courses'
          }
        }} />
        <TextSection {...{
          isColumn: true,
          heading: 'Обучение из любого места в любое время',
          paragraph: `В отличие от традиционных школ, которые требуют постоянного посещения и соблюдения установленных часов, наша онлайн-школа гарантирует полную гибкость. Благодаря нам вам не придется подстраиваться под плотный график и беспокоиться о том, чтобы попасть на занятия. Вы учитесь в своем темпе, в соответствии с вашими предпочтениями, без географических ограничений. Платформа Beauty Academy дает вам доступ к высококачественному обучению, где бы вы ни находились.`,
          video: {
            asset: {
              url: 'https://cdn.sanity.io/files/zm0qqcml/production/30c1d346e1f406e3563202673643a3e27659e1bb.mp4',
              altText: 'Video AltText'
            }
          },
          cta: {
            theme: 'primary',
            text: 'Больше о курсах',
            href: '/courses'
          }
        }} />
        <ListSection {...{
          heading: 'Почему стоит учиться онлайн?',
          list: [
            "Вы можете учиться из любого места в любое время, вам нужен только доступ в Интернет.",
            "Ваши уроки постоянно обновляются, поэтому у вас всегда есть доступ к актуальным знаниям.",
            "Вы можете практиковаться и повторять собранный нами материал столько раз, сколько вам необходимо.",
            "Вам не придется беспокоиться о том, как добраться до места учебы, что даст вам больше времени для учебы или для себя.",
            "Вы можете свободно совмещать обучение с работой, семейными и другими обязанностями благодаря круглосуточному доступу к своему аккаунту.",
          ],
          paragraph: "Присоединяйтесь к списку наших студентов, купите онлайн-курс и наслаждайтесь возможностью развиваться уже сегодня.",
          cta: {
            theme: 'primary',
            text: 'Больше о курсах',
            href: '/courses'
          }
        }} />
        <TextSection {...{
          centered: true,
          heading: 'Получите сертификат и диплом!',
          paragraph: `После каждого урока вы можете проверить свои знания с помощью интерактивных викторин, пробного экзамена и завершить обучение выпускным экзаменом. После каждого урока вы также можете генерировать сертификаты на английском, русском и польском языках, которые всегда доступны в вашем аккаунте.`,
          img: 'https://cdn.sanity.io/images/zm0qqcml/production/4cceb348ab4f3bb779951f3d5a10bf2106f9b8af-1813x798.webp?fit=max&w=1200&h=1200',
        }} />
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
                      <Link href={href}>
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
      <div
        className={styles.reviews}
        style={{ display: tab !== 2 && 'none' }}
      >
        <p>Reviews</p>
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