import Button from '@/components/atoms/Button';
import styles from './styles.module.scss';
import Link from 'next/link';

// from 0 to 1
const progress = .75;

const Hero = ({
  name,
  chapterLessons,
  chapterNumber,
}) => {
  return (
    <section className={styles.wrapper}>
      <div>
        <div className={styles.video}>
          
        </div>
        <nav className={styles.nav}>
          <Button variant='secondary' prev>предыдущий урок</Button>
          <Button>Отметить как завершенное</Button>
          <Button variant='secondary' next>следующий урок</Button>
        </nav>
      </div>
      <div>
        <div className={styles.progress}>
          <p>Завершенный {progress * 100}%</p>
          <div className={styles.bar}><div style={{ transform: `scaleX(${progress})` }}></div></div>
        </div>
        <h1 className="h3">{name}</h1>
        <div className={styles.lessons}>
          {chapterLessons.map(({ name, href}, i) => (
            <Link
              href={href}
              key={i}
              aria-current={i === 0}
            >
              {chapterNumber}.{i+1} {name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;