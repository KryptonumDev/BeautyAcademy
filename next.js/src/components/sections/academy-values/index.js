import Markdown from '@/components/atoms/Markdown';
import styles from './styles.module.scss';
import Item from './Item';

const Values = ({
  data: {
    values_Heading,
    values_List,
  }
}) => {
  return (
    <section className={styles.wrapper}>
      <Heart />
      <Markdown.h2>{values_Heading}</Markdown.h2>
      <div className={styles.list}>
        {values_List.map((item, i) => (
          <Item className={styles.item} key={i}>
            <Markdown>{item}</Markdown>
          </Item>
        ))}
      </div>
    </section>
  );
};

export default Values;

const Heart = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='66'
    height='65'
    fill='none'
    viewBox='0 0 66 65'
  >
    <path
      fill='url(#a)'
      d='M44.279 10.833c-5.553 0-8.654 3.283-10.107 5.476-.423.64-1.66.64-2.083 0-1.452-2.193-4.553-5.476-10.106-5.476-8.336 0-13.358 7.947-13.358 14.497 0 9.132 16.963 22.247 22.663 26.396a3.107 3.107 0 003.686 0c5.7-4.148 22.662-17.26 22.662-26.394 0-6.552-5.018-14.499-13.357-14.499z'
    ></path>
    <defs>
      <linearGradient
        id='a'
        x1='8.625'
        x2='60.302'
        y1='49.534'
        y2='49.534'
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