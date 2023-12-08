import { AdvancemenetIndicator, Social } from '@/components/atoms/Icons';
import styles from './styles.module.scss';
import Img from '@/components/atoms/Img';
import Link from 'next/link';
import { useMemo } from 'react';

const Aside = ({
  author: {
    title: authorName,
    authorAcf: {
      profession: authorSpecialization,
      avatar: authorImg,
      socialMedia: {
        instagram,
        facebook,
        telegram
      }
    },
  },
  productCategories,
  productTags,
  courseLength,
}) => {
  const complicity = useMemo(() => productTags.nodes[0].slug, [productTags])
  const socials = [
    {
      name: 'Instagram',
      icon: <Social.Instagram />,
      url: instagram
    },
    {
      name: 'Facebook',
      icon: <Social.Facebook />,
      url: facebook
    },
    {
      name: 'Telegram',
      icon: <Social.Telegram />,
      url: telegram
    },
  ].filter(el => el.url)

  return (
    <aside className={styles.aside}>
      <div className={styles.author}>
        <Img
          src={authorImg.url}
          width="144"
          height="144"
          className={styles.img}
          sizes="102px"
        />
        <div>
          <p className={styles.title}>автор курса</p>
          <p className={styles.name}>{authorName}</p>
          <p className={styles.specialization}>{authorSpecialization}</p>
          {socials.length > 0 && (
            <ul className={styles.socials}>
              {socials.map(({ url, icon, name }, i) => (
                url && (
                  <li key={i}>
                    <a href={url} target="_blank" rel="noopener" aria-label={name}>
                      {icon}
                    </a>
                  </li>
                )
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.categories}>
          {productCategories?.nodes?.filter(el => el.children.nodes.length === 0)?.map(el => (
            <Link href={`/courses/category/${el.slug}`} className={styles.category} key={el.slug}>{el.name}</Link>
          ))}
        </div>
        <div className={styles.advancement}>
          <span>Уровень сложности:</span>
          <div>
            <AdvancemenetIndicator isFilled={complicity >= 1} />
            <AdvancemenetIndicator isFilled={complicity >= 2} />
            <AdvancemenetIndicator isFilled={complicity >= 3} />
          </div>
        </div>
        <p className={styles.duration}>
          <Duration />
          <span>{courseLength}</span>
        </p>
        <p className={styles.location}>
          <Location />
          <span>Онлайн-курс</span>
        </p>
        <p className={styles.certificate}>
          <Certificate />
          <span>Cертификат об окончании</span>
        </p>
      </div>

    </aside>
  );
};

export default Aside;

const Duration = () => (
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
      d='M12.063 6.284v5a1 1 0 001 1h5m-6 9.5a9.5 9.5 0 110-19 9.5 9.5 0 010 19z'
    ></path>
  </svg>
)

const Location = () => (
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
      d='M19.063 10.549c0 2.846-3.523 7.56-5.57 10.059a1.834 1.834 0 01-2.86 0c-2.048-2.5-5.57-7.213-5.57-10.06 0-4.012 3.134-7.264 7-7.264 3.865 0 7 3.252 7 7.265z'
    ></path>
    <path
      stroke='#2B483C'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M14.663 10.284a2.6 2.6 0 11-5.2 0 2.6 2.6 0 015.2 0z'
    ></path>
  </svg>
)

const Certificate = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='25'
    fill='none'
    viewBox='0 0 24 25'
  >
    <path
      stroke='#2B483C'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M18.32 10.155v6.307a1.88 1.88 0 01-.707 1.483c-3.297 2.578-7.804 2.578-11.1 0a1.881 1.881 0 01-.709-1.483v-5.887m7.965-2.702l6.022 1.942c.478.154.805.62.805 1.148v6.346m0 2.202v1.573m-7.975-8.824l7.182-2.653c1.016-.376 1.016-1.892 0-2.267l-7.182-2.654a3.244 3.244 0 00-2.255 0L3.184 7.34c-1.016.375-1.016 1.891 0 2.267l7.182 2.653c.73.27 1.525.27 2.255 0z'
    ></path>
  </svg>
)