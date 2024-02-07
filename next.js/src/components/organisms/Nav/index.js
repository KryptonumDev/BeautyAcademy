'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { Logo } from '@/components/atoms/Icons';
import { usePathname } from 'next/navigation';
import { links } from 'src/app/layout';
import Cart from '../cart';
import { useCart } from "react-use-cart";

const Nav = () => {
  const pathname = usePathname();
  const [navOpened, setNavOpened] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);
  const { totalItems: rawTotalItems } = useCart();
  const [totalItems, setTotalItems] = useState(null);

  useEffect(() => {
    setTotalItems(rawTotalItems);
  }, [rawTotalItems]);


  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    }
  }, []);

  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      setNavOpened(false);
      setCartOpened(false);
    }
  }

  return (
    <>
      <a href="#main" className={styles.skipToMainContent}>Перейти к основному содержанию</a>
      <div className={styles.placeholder}/>
      <header className={styles.wrapper} aria-expanded={navOpened} aria-controls={cartOpened}>
        <div className="max-width">
          <Link href='/' className={styles.logo} aria-label="Homepage">
            <Logo />
          </Link>
          <nav>
            <ul>
              {links.map(({ name, href }, i) => (
                <li key={i}>
                  <Link
                    href={href}
                    aria-current={pathname.includes(href) ? 'page' : false}
                    onClick={() => setNavOpened(false)}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.actions}>
            <Link href='/dashboard' aria-label='Account'>
              <Icon.User />
            </Link>
            <button onClick={() => { setCartOpened(!cartOpened) }} aria-label='Basket'>
              <Icon.Basket />
              {totalItems > 0 && (
                <div className={styles.hearth}>
                  <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.7975 6.08301C19.5501 6.08301 18.138 7.20153 17.331 8.18439C16.9509 8.64733 15.9248 8.64725 15.5448 8.18428C14.7379 7.20145 13.3259 6.08301 11.0781 6.08301C7.07052 6.08301 4.65625 9.90376 4.65625 13.0525C4.65625 17.1764 11.8516 22.9899 14.996 25.3336C15.8556 25.9743 17.02 25.9744 17.8797 25.3338C21.0243 22.9906 28.2193 17.1785 28.2193 13.0534C28.2193 9.90376 25.8069 6.08301 21.7975 6.08301Z" fill="#2B483C" />
                  </svg>
                  <span>{Number(totalItems)}</span>
                </div>
              )}
            </button>
          </div>
          <button
            className={styles.mobileNavToggle}
            onClick={() => setNavOpened(!navOpened)}
            aria-label={`${navOpened ? 'Hide' : 'Show'} navigation`}
          >
            <span></span>
            <span></span>
          </button>
          <Cart className={styles.cart} setCartOpened={setCartOpened} />
        </div>
        <div
          className={styles.overlay}
          aria-hidden="true"
          onClick={() => { setNavOpened(false); setCartOpened(false) }}
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