import Link from 'next/link';
import styles from './styles.module.scss';
import { Logo } from '@/components/atoms/Icons';
import fetchData from '@/utils/fetchData';
import Markdown from '@/utils/Markdown';

const Footer = async () => {
  const { global: {
    footer_Slogan,
    instagram,
    facebook,
    footer_Company,
  }} = await getData();

  const socials = [
    {
      name: 'Instagram',
      icon: <Icon.Instagram />,
      url: instagram
    },
    {
      name: 'Facebook',
      icon: <Icon.Facebook />,
      url: facebook
    },
  ]
  
  return (
    <footer className={styles.wrapper}>
      <div className="max-width">
        <div className={styles.column}>
          <div className={styles.about}>
            <Link href='/' aria-label="Homepage" className={styles.logo}>
              <Logo />
            </Link>
            <div>
              <Markdown className={styles.slogan}>{footer_Slogan}</Markdown>
              <ul className={styles.socials}>
                {socials.map((item, i) => (
                  item.url && (
                    <li key={i}>
                      <Link href={item.url} aria-label={item.name}>
                        {item.icon}
                      </Link>
                    </li>
                  )
                ))}
              </ul>
            </div>
          </div>
          <nav className={styles.nav}>
            <Link href="/cooperation">СОТРУДНИЧЕСТВО</Link>
            <Link href="/about-us">О БРЕНДЕ</Link>
            <Link href="/contact">КОНТАКТ</Link>
            <Link href="/academy">АКАДЕМИЯ</Link>
            <Link href="/blog">БЛОГ</Link>
          </nav>
          <div className={styles.company}>
            {footer_Company.map(({ name, address, phone }, i) => (
              <div key={i}>
                <p className={styles.name}>{name}</p>
                <p>{address}</p>
                <p><a href={`tel:${phone}`} className='link'>{phone}</a></p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.legal}>
          <div>
            <Link href='/privacy-policy' className='link'>политика конфиденциальности</Link>
            <Link href='/terms-of-use' className='link'>Печенье</Link>
          </div>
          <p>Ⓒ Дизайн и реализация: <a href="https://kryptonum.eu/pl" className='link'>Kryptonum</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const getData = async () => {
  const { body: { data } } = await fetchData(`
    global: Global(id: "global") {
      footer_Slogan
      instagram
      facebook
      footer_Company {
        name
        address
        phone
      }
    }
  `)
  return data;
}

const Icon = {
  "Instagram": () => (
    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'>
      <path
        stroke='#C7DED4'
        d='M29.409 10.245v.004c.094 1.68.092 3.347.09 5.043a556.15 556.15 0 000 1.501c.003 1.667.006 3.307-.09 4.957v.005c-.106 2.179-.594 4.021-2.114 5.54-1.516 1.516-3.362 2.008-5.54 2.113h-.004c-1.68.095-3.347.093-5.043.091a556.15 556.15 0 00-1.415 0c-1.693.002-3.362.004-5.044-.09h-.004c-2.179-.106-4.021-.594-5.54-2.114-1.516-1.516-2.008-3.362-2.113-5.54v-.004c-.095-1.68-.093-3.35-.091-5.044v-1.414c-.002-1.693-.004-3.362.09-5.044v-.004c.106-2.179.594-4.021 2.114-5.54 1.516-1.516 3.362-2.008 5.54-2.113h.004c1.68-.095 3.347-.093 5.043-.091h1.415c1.693-.002 3.362-.004 5.044.09h.004c2.179.106 4.021.594 5.54 2.114 1.516 1.516 2.008 3.362 2.113 5.54zM11.828 16a4.179 4.179 0 014.168-4.169A4.179 4.179 0 0120.166 16a4.179 4.179 0 01-4.17 4.169A4.179 4.179 0 0111.828 16zm15.82 11.649c1.643-1.643 2.151-3.629 2.26-5.87L2.092 10.22c-.095 1.697-.093 3.381-.091 5.073a638.117 638.117 0 010 1.412c-.002 1.692-.004 3.379.091 5.073.109 2.241.62 4.23 2.26 5.87 1.642 1.642 3.628 2.15 5.87 2.259 1.697.095 3.38.093 5.072.091a553.139 553.139 0 011.413 0c1.694.002 3.378.004 5.072-.091 2.241-.109 4.23-.62 5.87-2.26zM8.314 16a7.673 7.673 0 007.683 7.683A7.673 7.673 0 0023.68 16a7.673 7.673 0 00-7.684-7.683A7.673 7.673 0 008.313 16zm12.983-7.478c0 1.205.973 2.178 2.177 2.178l.001-.5a1.674 1.674 0 001.678-1.678h.5a2.176 2.176 0 00-2.178-2.177 2.176 2.176 0 00-2.178 2.177z'
      ></path>
    </svg>
  ),
  "Facebook": () => (
    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 34 32' fill='none'>
      <path
        stroke='#C7DED4'
        d='M19.225 16.749h-.5V29.5h-4.277V16.74H10.06v-3.993h4.378V8.583c0-2.023.632-3.529 1.67-4.53 1.044-1.003 2.551-1.553 4.4-1.553h.002c1.145-.004 2.29.046 3.429.151V6.15h-2.184c-1.123 0-1.932.26-2.437.847-.492.57-.592 1.336-.592 2.08v3.68h4.992l-.524 3.993h-3.968z'
      ></path>
    </svg>
  ),
}