import { AdvancemenetIndicator, Social } from '@/components/atoms/Icons';
import styles from './styles.module.scss';
import Img from '@/components/atoms/Img';

const Aside = ({
  author: {
    name: authorName,
    specialization: authorSpecialization,
    img: authorImg,
    socials: {
      instagram,
      facebook,
      telegram
    }
  },
  category,
  advancement,
  duration,
  location,
  certificate,
}) => {
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
  ]

  return (
    <aside className={styles.aside}>
      <div className={styles.author}>
        <Img
          src={authorImg}
          width="144"
          height="144"
          className={styles.img}
          sizes="(max-width: 768px) 137px, 144px"
        />
        <div>
          <p className={styles.title}>автор статьи</p>
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
        <p className={styles.category}>{category}</p>
        <div className={styles.advancement}>
          <span>Уровень сложности:</span>
          <div>
            <AdvancemenetIndicator isFilled={advancement >= 1} />
            <AdvancemenetIndicator isFilled={advancement >= 2} />
            <AdvancemenetIndicator isFilled={advancement >= 3} />
          </div>
        </div>
        <p className={styles.duration}>
          <Duration />
          <span>{duration}</span>
        </p>
        <p className={styles.location}>
          <Location />
          <span>{location}</span>
        </p>
        <p className={styles.certificate}>
          <Certificate />
          <span>{certificate}</span>
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
    width='31'
    height='32'
    fill='none'
    viewBox='0 0 31 32'
  >
    <path
      stroke='#2B483C'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M22.56 13.346v6.93c0 .642-.288 1.247-.778 1.63-3.622 2.831-8.572 2.831-12.195 0a2.067 2.067 0 01-.777-1.63v-6.468m8.75-2.969l6.615 2.134c.526.17.885.682.885 1.262v6.971m0 2.42v1.727m-8.761-9.693l7.89-2.915c1.116-.413 1.116-2.079 0-2.491l-7.89-2.915a3.564 3.564 0 00-2.478 0l-7.89 2.915c-1.116.412-1.116 2.078 0 2.49l7.89 2.916a3.564 3.564 0 002.478 0z'
    ></path>
  </svg>
)