import Markdown from '@/components/atoms/Markdown';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';
import Img from '@/components/atoms/Img';
import PartnershipItem from './PartnershipItem';

const Team = ({
  team_Heading,
  team_List,
  team_Paragraph,
  team_Cta,
}) => {
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <Markdown.h2>{team_Heading}</Markdown.h2>
      </header>
      <div className={styles.list}>
        {team_List.map(({
          img,
          name,
          paragraph,
          partnership_Title,
          partnership_List
        }, i) => (
          <div className={styles.item} key={i}>
            <div className={styles.img}>
              <Img data={img} />
            </div>
            <div>
              <h3>{name}</h3>
              <div className={styles.paragraph}>
                <Markdown>{paragraph}</Markdown>
                {partnership_List.length > 0 && (
                  <div className={styles.partnership}>
                    <p>
                      <Preview />
                      <span>{partnership_Title}</span>
                    </p>
                      <div className={styles.wrapper}>
                        {partnership_List.map(({ title, img }, i) => (
                          <PartnershipItem {...{ title, img }} key={i} className={styles.item} />
                        ))}
                      </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.header}>
        <Markdown.h3>{team_Paragraph}</Markdown.h3>
        <Button data={team_Cta} className={styles.cta} />
      </div>
    </section>
  );
};

export default Team;

export const Preview = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='14'
    height='14'
    fill='none'
    viewBox='0 0 14 14'
    stroke='url(#preview)'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='0.7'
      d='M11.953 6.5a.902.902 0 010 1c-.635.967-2.286 3-4.953 3-2.668 0-4.319-2.033-4.953-3a.902.902 0 010-1c.634-.967 2.285-3 4.953-3 2.667 0 4.318 2.033 4.953 3z'
    ></path>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='0.7'
      d='M8.75 7a1.75 1.75 0 11-3.5 0 1.75 1.75 0 013.5 0z'
    ></path>
    <defs>
      <linearGradient
        id='preview'
        x1='1.896'
        x2='12.659'
        y1='9.919'
        y2='9.919'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F7C479'></stop>
        <stop offset='0.253' stopColor='#DCA855'></stop>
        <stop offset='0.582' stopColor='#C79442'></stop>
        <stop offset='0.764' stopColor='#BC7F1D'></stop>
        <stop offset='1' stopColor='#BA7403'></stop>
      </linearGradient>
    </defs>
  </svg>
)