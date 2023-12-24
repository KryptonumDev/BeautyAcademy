'use client'
import { useState } from 'react';
import Link from "next/link";
import styles from './styles.module.scss';
import Img from "@/components/atoms/Img";
import { Social } from '@/components/atoms/Icons';
import { motion } from 'framer-motion';

const TableOfContent = ({
  data,
  author: {
    name,
    specialization,
    img,
    instagram,
    facebook,
    telegram,
  }
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

  const [ open, setOpen ] = useState(false);

  return (
    <>
      <button
        className={styles.toggleNav}
        data-open
        onClick={() => setOpen(true)}
        aria-label="Open Navigation"
      >
        <Menu.Open />
      </button>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{
          delay: open ? .3 : 0,
          duration: open ? .5 : .3,
          ease: [0.65, 0, 0.35, 1]
        }}
        data-opened={open}
        onClick={() => setOpen(false)}
      ></motion.div>
      <motion.button
        className={styles.toggleNav}
        data-close
        onClick={() => setOpen(false)}
        initial={{ scale: 0 }}
        animate={{ scale: open ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{
          delay: open ? .3 : 0,
          duration: open ? .5 : .3,
          ease: [0.65, 0, 0.35, 1]
        }}
        aria-label="Close Navigation"
      >
        <Menu.Close />
      </motion.button>
      <motion.nav
        initial={{ height: 0 }}
        animate={{ height: open ? 'auto' : 0 }}
        exit={{ height: 0 }}
        transition={{
          delay: open ? 0 : .3,
          duration: 0.5,
          ease: [0.65, 0, 0.35, 1]
        }}
        aria-expanded={open}
      >
        <div className={styles.author}>
          <Img
            data={img}
            className={styles.img}
            sizes="(max-width: 768px) 137px, 144px"
          />
          <div>
            <p className={styles.title}>автор статьи</p>
            <p className={styles.name}>{name}</p>
            <p className={styles.specialization}>{specialization}</p>
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
        <ul data-lenis-prevent>
          {data.map(({ text, slug, subheadings }, index) => (
            <li key={index}>
              <Link href={`#${slug}`} onClick={() => setOpen(false)}>
                <span>{text}</span>
                <Indicator />
              </Link>
              {subheadings.length > 0 && (
                <ul>
                  {subheadings.map(({ text, slug }, subIndex) => (
                    <li key={subIndex}>
                      <Link href={`#${slug}`} onClick={() => setOpen(false)}>
                        <span>{text}</span>
                        <Indicator />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
};

export default TableOfContent;

const Indicator = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='40'
    height='40'
    fill='none'
    stroke='url(#a)'
    viewBox='0 0 41 40'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M13.684 27.071L27.826 12.93m0 0H15.088m12.738 0v12.32'
    ></path>
    <defs>
      <linearGradient
        id='a'
        x1='8.489'
        x2='21.7'
        y1='19.528'
        y2='32.739'
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

const Menu = {
  "Open": () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='61'
      height='62'
      fill='none'
      viewBox='0 0 61 62'
    >
      <path
        stroke='#53423C'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M48.292 18.042H25.417M48.292 30.75H25.417m22.875 12.708H25.417m-7.625-25.416a2.542 2.542 0 11-5.083 0 2.542 2.542 0 015.083 0zm0 12.708a2.542 2.542 0 11-5.083 0 2.542 2.542 0 015.083 0zm0 12.708a2.542 2.542 0 11-5.083 0 2.542 2.542 0 015.083 0z'
      ></path>
    </svg>
  ),
  "Close": () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='38'
      height='39'
      fill='none'
      viewBox='0 0 38 39'
    >
      <path
        stroke='#53423C'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M13.458 24.792L19 19.25m0 0l5.541-5.542M19 19.25l5.541 5.542M19 19.25l-5.542-5.542'
      ></path>
    </svg>
  )
}