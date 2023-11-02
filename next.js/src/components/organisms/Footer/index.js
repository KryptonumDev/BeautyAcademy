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
                      <a href={item.url} target="_blank" rel="noopener" aria-label={item.name}>
                        {item.icon}
                      </a>
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
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      fill='none'
      viewBox='0 0 32 32'
    >
      <path
        stroke='#C7DED4'
        d='M15.996 11.331A4.679 4.679 0 0011.328 16a4.679 4.679 0 004.668 4.669A4.679 4.679 0 0020.666 16a4.679 4.679 0 00-4.67-4.669zM30 16c0-1.933.018-3.85-.091-5.779-.109-2.241-.62-4.23-2.26-5.87-1.642-1.642-3.628-2.15-5.87-2.259-1.932-.108-3.848-.091-5.778-.091-1.933 0-3.85-.017-5.779.091-2.241.109-4.23.62-5.87 2.26-1.642 1.642-2.15 3.628-2.259 5.87-.108 1.932-.091 3.848-.091 5.778 0 1.93-.017 3.85.091 5.779.109 2.241.62 4.23 2.26 5.87 1.642 1.642 3.628 2.15 5.87 2.259 1.932.108 3.848.091 5.778.091 1.933 0 3.85.018 5.779-.091 2.241-.109 4.23-.62 5.87-2.26 1.642-1.642 2.15-3.628 2.259-5.87.112-1.929.091-3.845.091-5.778zm-14.002 7.183A7.173 7.173 0 018.813 16a7.173 7.173 0 017.183-7.183A7.173 7.173 0 0123.18 16a7.173 7.173 0 01-7.184 7.183zM23.474 10.2c-.928 0-1.678-.75-1.678-1.678 0-.928.75-1.677 1.678-1.677a1.676 1.676 0 011.55 2.32 1.674 1.674 0 01-1.55 1.035z'
      ></path>
    </svg>
  ),
  "Facebook": () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='34'
      height='32'
      fill='none'
      viewBox='0 0 34 32'
    >
      <path
        stroke='#C7DED4'
        d='M19.225 30V17.249h4.407l.654-4.993h-5.06v-3.18c0-1.44.41-2.427 2.528-2.427h2.684V2.198A36.45 36.45 0 0020.507 2c-3.895 0-6.569 2.322-6.569 6.583v3.664H9.561v4.992h4.387V30h5.277z'
      ></path>
    </svg>
  ),
}