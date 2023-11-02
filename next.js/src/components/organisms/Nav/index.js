'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { Logo } from '@/components/atoms/Icons';

const links = [
  {
    name: 'СОТРУДНИЧЕСТВО',
    href: '/cooperation',
  },
  {
    name: 'О БРЕНДЕ',
    href: '/about-us',
  },
  {
    name: 'КОНТАКТ',
    href: '/contact',
  },
  {
    name: 'АКАДЕМИЯ',
    href: '/academy',
  },
  {
    name: 'БЛОГ',
    href: '/blog',
  },
]

const Nav = () => {
  const [ navOpened, setNavOpened ] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    }
  }, []);

  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      setNavOpened(false);
    }
  }
  
  return (
    <>
      <a href="#main" className={styles.skipToMainContent}>Перейти к основному содержанию</a>
      <header className={styles.wrapper} aria-expanded={navOpened}>
        <div className="max-width">
          <Link href='/' className={styles.logo}>
            <Logo />
          </Link>
          <nav>
            <ul>
              {links.map(({ name, href }, i) => (
                <li key={i}>
                  <Link href={href}>{name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.actions}>
            <Link href='/account' aria-label='Account'>
              <Icon.User />
            </Link>
            <Link href='/basket' aria-label='Basket'>
              <Icon.Basket />
            </Link>
          </div>
          <button
            className={styles.mobileNavToggle}
            onClick={() => setNavOpened(!navOpened)}
            aria-label={`${navOpened ? 'Hide' : 'Show'} navigation`}
          >
            <span></span>
            <span></span>
          </button>
        </div>
        <div
          className={styles.overlay}
          aria-hidden="true"
          onClick={() => setNavOpened(false)}
        />
      </header>
    </>
  );
};

export default Nav;

const Icon = {
  "User": () => (
    <svg xmlns='http://www.w3.org/2000/svg' width='34' height='34' viewBox='0 0 34 34' fill='none'>
      <path
        stroke='#53423C'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M7.025 29.375c0-5.695 4.617-10.313 10.313-10.313 5.695 0 10.312 4.618 10.312 10.313m-5.5-19.25a4.812 4.812 0 11-9.625 0 4.812 4.812 0 019.625 0z'
      ></path>
    </svg>
  ),
  "Basket": () => (
    <svg xmlns='http://www.w3.org/2000/svg' width='34' height='34' viewBox='0 0 34 34' fill='none'>
      <path
        stroke='#53423C'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M27.588 10.125h-22v14.823c0 1.566 0 2.349.31 2.945.26.502.67.912 1.172 1.172.596.31 1.38.31 2.945.31H23.16c1.567 0 2.35 0 2.946-.31a2.75 2.75 0 001.172-1.172c.31-.596.31-1.38.31-2.945V10.125zm-4.852-5.5H10.44c-.437 0-.656 0-.855.061a1.375 1.375 0 00-.461.247c-.161.132-.283.314-.526.678l-3.01 4.514h22l-3.009-4.514c-.242-.364-.364-.546-.525-.678a1.376 1.376 0 00-.462-.247c-.198-.061-.417-.061-.855-.061zM11.088 14.25c1.986 4.965 9.014 4.965 11 0'
      ></path>
    </svg>
  )
}