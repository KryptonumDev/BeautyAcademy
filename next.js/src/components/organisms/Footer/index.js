import Link from 'next/link';
import styles from './styles.module.scss';
import { Logo, Social } from '@/components/atoms/Icons';
import fetchData from '@/utils/fetchData';
import Markdown from '@/components/atoms/Markdown';
import { links } from 'src/app/layout';

const Footer = async () => {
  const { global: {
    footer_Slogan,
    instagram,
    facebook,
    footer_Company,
  }} = await query();

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
            </div>
          </div>
          <nav className={styles.nav}>
            {links.map(({ name, href }, i) => (
                <Link
                  key={i}
                  href={href}
                >
                  {name}
                </Link>
            ))}
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
            <Link href='/terms-and-conditions' className='link'>Печенье</Link>
          </div>
          <p>Ⓒ Дизайн и реализация: <a href="https://kryptonum.eu/pl" className='link' aria-label="Kryptonum"><Kryptonum /></a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const query = async () => {
  const { body: { data } } = await fetchData(`
    query {
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
    }
  `)
  return data;
}

const Kryptonum = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='82'
    height='16'
    fill='none'
    viewBox='0 0 82 16'
  >
    <path
      fill='#FBF7F6'
      d='M6.845 11.496L2.253 6.408v5.088H.797V.344h1.456v5.168L6.86.344H8.7L3.645 5.928l5.104 5.568H6.845zm4.346-7.344a2.81 2.81 0 011.088-1.168c.48-.278 1.061-.416 1.744-.416v1.504h-.384c-1.632 0-2.448.885-2.448 2.656v4.768H9.735V2.728h1.456v1.424zm11.905-1.424l-5.28 12.896h-1.504L18.04 11.4l-3.536-8.672h1.616l2.752 7.104 2.72-7.104h1.504zm2.279 1.616c.288-.502.715-.918 1.28-1.248.576-.342 1.243-.512 2-.512.779 0 1.483.186 2.112.56.64.373 1.142.901 1.504 1.584.363.672.544 1.456.544 2.352 0 .885-.181 1.674-.544 2.368a4.003 4.003 0 01-1.504 1.616 3.975 3.975 0 01-2.112.576c-.746 0-1.408-.166-1.984-.496-.565-.342-.997-.763-1.296-1.264v5.776H23.92V2.728h1.456v1.616zm5.952 2.736c0-.662-.133-1.238-.4-1.728a2.754 2.754 0 00-1.088-1.12 2.946 2.946 0 00-1.488-.384 2.91 2.91 0 00-1.488.4c-.448.256-.81.634-1.088 1.136-.266.49-.4 1.061-.4 1.712 0 .661.134 1.242.4 1.744.278.49.64.87 1.088 1.136.459.256.955.384 1.488.384.544 0 1.04-.128 1.488-.384a2.864 2.864 0 001.088-1.136c.267-.502.4-1.088.4-1.76zm4.381-3.152v5.168c0 .426.09.73.272.912.181.17.496.256.944.256h1.072v1.232h-1.312c-.81 0-1.419-.187-1.824-.56-.405-.374-.608-.987-.608-1.84V3.928h-1.136v-1.2h1.136V.52h1.456v2.208h2.288v1.2h-2.288zm7.236 7.712a4.534 4.534 0 01-2.24-.56 4.071 4.071 0 01-1.568-1.584c-.373-.694-.56-1.494-.56-2.4 0-.896.192-1.686.576-2.368a4.009 4.009 0 011.6-1.584c.672-.374 1.424-.56 2.256-.56.832 0 1.584.186 2.256.56.672.362 1.2.885 1.584 1.568.395.682.592 1.477.592 2.384 0 .906-.203 1.706-.608 2.4a4.12 4.12 0 01-1.616 1.584c-.683.373-1.44.56-2.272.56zm0-1.28c.523 0 1.013-.123 1.472-.368a2.748 2.748 0 001.104-1.104c.288-.49.432-1.088.432-1.792s-.139-1.302-.416-1.792c-.277-.49-.64-.854-1.088-1.088a2.983 2.983 0 00-1.456-.368c-.533 0-1.024.122-1.472.368-.437.234-.79.597-1.056 1.088-.267.49-.4 1.088-.4 1.792 0 .714.128 1.317.384 1.808.267.49.619.858 1.056 1.104.437.234.917.352 1.44.352zm10.042-7.792c1.067 0 1.931.325 2.592.976.662.64.992 1.568.992 2.784v5.168h-1.44v-4.96c0-.875-.218-1.542-.656-2-.437-.47-1.034-.704-1.792-.704-.768 0-1.381.24-1.84.72-.448.48-.672 1.178-.672 2.096v4.848h-1.456V2.728h1.456v1.248a2.903 2.903 0 011.168-1.04 3.698 3.698 0 011.648-.368zm13.099.16v8.768h-1.456V10.2c-.278.448-.667.8-1.168 1.056a3.598 3.598 0 01-1.632.368c-.683 0-1.296-.139-1.84-.416a3.184 3.184 0 01-1.296-1.28c-.31-.566-.464-1.254-.464-2.064V2.728h1.44v4.944c0 .864.218 1.53.656 2 .437.458 1.034.688 1.792.688.778 0 1.392-.24 1.84-.72.448-.48.672-1.179.672-2.096V2.728h1.456zm12.362-.16c.683 0 1.29.144 1.824.432.534.277.955.698 1.264 1.264.31.565.464 1.253.464 2.064v5.168h-1.44v-4.96c0-.875-.218-1.542-.656-2-.427-.47-1.008-.704-1.744-.704-.757 0-1.36.245-1.808.736-.448.48-.672 1.178-.672 2.096v4.832h-1.44v-4.96c0-.875-.219-1.542-.656-2-.427-.47-1.008-.704-1.744-.704-.757 0-1.36.245-1.808.736-.448.48-.672 1.178-.672 2.096v4.832h-1.456V2.728h1.456v1.264a2.89 2.89 0 011.152-1.056 3.563 3.563 0 011.616-.368c.736 0 1.387.165 1.952.496.566.33.987.816 1.264 1.456a2.876 2.876 0 011.216-1.44 3.582 3.582 0 011.888-.512z'
    ></path>
  </svg>
)