import React from "react"
import styles from "./styles.module.scss"
import Link from "next/link"

export default function DashboardControl({ chosenSubPage, setSubPage }) {

  return (
    <aside className={styles.wrapper}>
      <button className={`${styles.button} ${chosenSubPage === 'courses' && styles.active}`} onClick={() => { setSubPage('courses') }}>
        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.2526 18.0833H13.9193M9.2526 20.4167H17.4193M8.08594 24.5H20.3359C21.3024 24.5 22.0859 23.7165 22.0859 22.75V5.24998C22.0859 4.28349 21.3024 3.49998 20.3359 3.49998H8.08594C7.11944 3.49998 6.33594 4.28349 6.33594 5.24998V22.75C6.33594 23.7165 7.11944 24.5 8.08594 24.5ZM9.2526 3.49998H14.5026V11.375C14.5026 11.6553 14.1458 11.7742 13.9776 11.55L13.2776 10.6167C12.5776 9.68332 11.1776 9.68332 10.4776 10.6167L9.7776 11.55C9.60943 11.7742 9.2526 11.6553 9.2526 11.375V3.49998Z" stroke="url(#paint0_linear_917_11558)" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="paint0_linear_917_11558" x1="6.33594" y1="22.757" x2="22.9426" y2="22.757" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F7C479" />
              <stop offset="0.253472" stopColor="#DCA855" />
              <stop offset="0.581597" stopColor="#C79442" />
              <stop offset="0.763889" stopColor="#BC7F1D" />
              <stop offset="1" stopColor="#BA7403" />
            </linearGradient>
          </defs>
        </svg>
        Мои курсы
      </button>
      <button className={`${styles.button} ${chosenSubPage === 'downloads' && styles.active}`} onClick={() => { setSubPage('downloads') }}>
        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 5.83333L6.18346 6.56115C6.99482 6.83161 7.59321 7.52428 7.7429 8.36634L9.02446 15.5751C9.22244 16.6887 10.1907 17.5 11.3218 17.5H20.212C21.2512 17.5 22.1652 16.8127 22.4537 15.8143L24.28 9.49242M15.6666 3.5L15.6668 12.8333M15.6668 12.8333L12.1667 9.49242M15.6668 12.8333L19.1667 9.49251M12.1667 21.5833C12.1667 22.5498 11.3832 23.3333 10.4167 23.3333C9.45017 23.3333 8.66667 22.5498 8.66667 21.5833C8.66667 20.6168 9.45017 19.8333 10.4167 19.8333C11.3832 19.8333 12.1667 20.6168 12.1667 21.5833ZM21.5 21.5833C21.5 22.5498 20.7165 23.3333 19.75 23.3333C18.7835 23.3333 18 22.5498 18 21.5833C18 20.6168 18.7835 19.8333 19.75 19.8333C20.7165 19.8333 21.5 20.6168 21.5 21.5833Z" stroke="url(#paint0_linear_917_11556)" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="paint0_linear_917_11556" x1="4" y1="21.6872" x2="25.3831" y2="21.6872" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F7C479" />
              <stop offset="0.253472" stopColor="#DCA855" />
              <stop offset="0.581597" stopColor="#C79442" />
              <stop offset="0.763889" stopColor="#BC7F1D" />
              <stop offset="1" stopColor="#BA7403" />
            </linearGradient>
          </defs>
        </svg>
        История покупки
      </button>
      <button className={`${styles.button} ${chosenSubPage === 'history' && styles.active}`} onClick={() => { setSubPage('history') }}>
        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.3359 10.5C21.6246 10.5 22.6693 11.5447 22.6693 12.8333V22.1667C22.6693 23.4553 21.6246 24.5 20.3359 24.5H8.66927C7.38061 24.5 6.33594 23.4553 6.33594 22.1667V12.8333C6.33594 11.5447 7.38061 10.5 8.66927 10.5M14.5026 3.50002L14.5027 17.5M14.5027 17.5L11.0026 14.1591M14.5027 17.5L18.0026 14.1592" stroke="url(#paint0_linear_920_17037)" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="paint0_linear_920_17037" x1="6.33594" y1="22.757" x2="23.5577" y2="22.757" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F7C479" />
              <stop offset="0.253472" stopColor="#DCA855" />
              <stop offset="0.581597" stopColor="#C79442" />
              <stop offset="0.763889" stopColor="#BC7F1D" />
              <stop offset="1" stopColor="#BA7403" />
            </linearGradient>
          </defs>
        </svg>
        Файлы для скачивания
      </button>
      <button className={`${styles.button} ${chosenSubPage === 'data' && styles.active}`} onClick={() => { setSubPage('data') }}>
        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 21V9.33336C25 8.0447 23.9553 7.00003 22.6667 7.00003H6.33333C5.04467 7.00003 4 8.0447 4 9.33336V21C4 22.2887 5.04467 23.3334 6.33333 23.3334H22.6667C23.9553 23.3334 25 22.2887 25 21Z" stroke="url(#paint0_linear_917_11554)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.5 15.75C12.7334 15.75 11.1962 16.7316 10.4038 18.1791C9.78498 19.3095 10.878 20.4167 12.1667 20.4167H16.8333C18.122 20.4167 19.215 19.3095 18.5962 18.1791C17.8038 16.7316 16.2666 15.75 14.5 15.75Z" stroke="url(#paint1_linear_917_11554)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.25 12.25C16.25 13.2165 15.4665 14 14.5 14C13.5335 14 12.75 13.2165 12.75 12.25C12.75 11.2835 13.5335 10.5 14.5 10.5C15.4665 10.5 16.25 11.2835 16.25 12.25Z" stroke="url(#paint2_linear_917_11554)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.6667 7.00003V4.6667C15.6667 4.02237 15.1443 3.50003 14.5 3.50003C13.8557 3.50003 13.3333 4.02236 13.3333 4.6667V7.00003H15.6667Z" stroke="url(#paint3_linear_917_11554)" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="paint0_linear_917_11554" x1="4" y1="21.6872" x2="26.1423" y2="21.6872" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F7C479" />
              <stop offset="0.253472" stopColor="#DCA855" />
              <stop offset="0.581597" stopColor="#C79442" />
              <stop offset="0.763889" stopColor="#BC7F1D" />
              <stop offset="1" stopColor="#BA7403" />
            </linearGradient>
            <linearGradient id="paint1_linear_917_11554" x1="4" y1="21.6872" x2="26.1423" y2="21.6872" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F7C479" />
              <stop offset="0.253472" stopColor="#DCA855" />
              <stop offset="0.581597" stopColor="#C79442" />
              <stop offset="0.763889" stopColor="#BC7F1D" />
              <stop offset="1" stopColor="#BA7403" />
            </linearGradient>
            <linearGradient id="paint2_linear_917_11554" x1="4" y1="21.6872" x2="26.1423" y2="21.6872" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F7C479" />
              <stop offset="0.253472" stopColor="#DCA855" />
              <stop offset="0.581597" stopColor="#C79442" />
              <stop offset="0.763889" stopColor="#BC7F1D" />
              <stop offset="1" stopColor="#BA7403" />
            </linearGradient>
            <linearGradient id="paint3_linear_917_11554" x1="4" y1="21.6872" x2="26.1423" y2="21.6872" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F7C479" />
              <stop offset="0.253472" stopColor="#DCA855" />
              <stop offset="0.581597" stopColor="#C79442" />
              <stop offset="0.763889" stopColor="#BC7F1D" />
              <stop offset="1" stopColor="#BA7403" />
            </linearGradient>
          </defs>
        </svg>
        Мои данные
      </button>

      <Link className={`${styles.logout} link`} href="/logout">
        выйти
      </Link>
    </aside>
  )
}