import React from "react"
import styles from "./styles.module.scss"

const providersContent = {
  'GOOGLE': {
    text: 'Войти с помощью Google',
    icon: `
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.2383 13.9582H19.22H19.8183L19.7121 14.547C19.4351 16.0816 18.5789 17.4493 17.3213 18.366V18.3726L17.1022 18.5214C15.9325 19.3156 14.4439 19.7512 12.7427 19.7512C9.50752 19.7512 6.76199 17.6536 5.65445 14.7995H5.64178L5.52704 14.4593C4.98952 12.8656 4.98942 11.1398 5.52673 9.54603C6.53725 6.51553 9.37401 4.25058 12.7344 4.24884C14.411 4.22383 16.0369 4.79687 17.3213 5.86108L20.0407 3.14166C18.016 1.41189 15.423 0.468248 12.7442 0.49995L12.7383 0.50002V0.499985C8.39007 0.499985 4.41388 2.95083 2.46165 6.83832L13.2383 13.9582ZM13.2383 13.9582V10.3372H23.6302C23.721 10.9769 23.7643 11.6269 23.7643 12.2756C23.7643 15.8041 22.5056 18.7499 20.3516 20.7334L20.1692 20.9014C18.2983 22.5411 15.7614 23.5 12.7383 23.5C8.38997 23.5 4.41368 21.0491 2.4615 17.1658C0.830506 13.9163 0.830543 10.0879 2.46161 6.8384L13.2383 13.9582Z" stroke="#C9BBB7"/>
    </svg>
    `
  },
  'FACEBOOK': {
    text: 'Войти с помощью Facebook',
    icon: `
      <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.4205 12.4365H13.9205V12.9365V22H10.9621V12.9295V12.4295H10.4621H7.67188V9.68507H10.455H10.955V9.18507V6.43714C10.955 4.94649 11.4199 3.85265 12.1697 3.13026C12.9227 2.40485 14.0191 2.0002 15.3814 2.0002L15.3833 2.00019C16.2001 1.99709 17.0165 2.03127 17.8299 2.1026V4.48675H16.3172C15.4592 4.48675 14.8078 4.68547 14.3944 5.16539C13.9949 5.62925 13.9205 6.24344 13.9205 6.80703V9.19207V9.69207H14.4205H17.6465L17.2864 12.4365H14.4205Z" stroke="#C9BBB7"/>
      </svg>
    `
  },
  'INSTAGRAM': {
    text: 'Войти с помощью Instagram',
    icon: `
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.3638 5.39184C18.3638 4.4196 17.5778 3.63361 16.6055 3.63361C15.6333 3.63361 14.8473 4.4196 14.8473 5.39184C14.8473 6.364 15.6332 7.14994 16.6053 7.15006C16.8362 7.1503 17.0649 7.105 17.2783 7.01677C17.4919 6.92848 17.6859 6.79893 17.8493 6.63555C18.0126 6.47217 18.1422 6.27816 18.2305 6.06463C18.3187 5.8513 18.364 5.62268 18.3638 5.39184ZM18.3638 5.39184H17.8638L18.3638 5.39121C18.3638 5.39142 18.3638 5.39163 18.3638 5.39184ZM20.9315 6.69001L20.9315 6.69001L20.9317 6.69391C21.0023 7.94922 21.001 9.1965 20.9996 10.4684C20.9994 10.6451 20.9992 10.8223 20.9992 11C20.9992 11.1992 20.9995 11.3977 20.9998 11.5956C21.0016 12.8459 21.0034 14.0715 20.9317 15.3052L20.9315 15.31C20.8531 16.9285 20.4917 18.2745 19.3831 19.3831C18.277 20.4892 16.9283 20.8531 15.31 20.9315L15.31 20.9315L15.3061 20.9317C14.0507 21.0023 12.8034 21.001 11.5315 20.9996C11.3549 20.9994 11.1777 20.9992 11 20.9992C10.8226 20.9992 10.6458 20.9994 10.4694 20.9996C9.19924 21.001 7.95157 21.0023 6.69386 20.9317L6.69001 20.9315C5.07151 20.8531 3.7255 20.4917 2.6169 19.3831C1.51082 18.277 1.14688 16.9283 1.06849 15.31L1.06851 15.31L1.06829 15.3061C0.997658 14.0507 0.999016 12.8013 1.0004 11.5307C1.00059 11.3542 1.00078 11.1773 1.00078 11C1.00078 10.8226 1.00059 10.6458 1.0004 10.4694C0.999016 9.19922 0.997659 7.95156 1.06829 6.69386L1.06831 6.69386L1.06849 6.69001C1.14689 5.07151 1.5083 3.7255 2.6169 2.6169C3.72298 1.51082 5.07173 1.14688 6.69001 1.06849L6.69001 1.06851L6.69391 1.06829C7.94924 0.997661 9.19654 0.999016 10.4684 1.0004C10.6451 1.00059 10.8223 1.00078 11 1.00078C11.1774 1.00078 11.3542 1.00059 11.5306 1.0004C12.8008 0.999016 14.0484 0.997659 15.3061 1.06829L15.3061 1.06831L15.31 1.06849C16.9285 1.14689 18.2745 1.5083 19.3831 2.6169C20.4892 3.72298 20.8531 5.07173 20.9315 6.69001ZM7.99588 11C7.99588 9.34809 9.34546 7.99851 10.9974 7.99851C12.6493 7.99851 13.9989 9.34809 13.9989 11C13.9989 12.6519 12.6493 14.0015 10.9974 14.0015C9.34546 14.0015 7.99588 12.6519 7.99588 11ZM19.7367 19.7367C20.9686 18.5047 21.3495 17.0153 21.4309 15.3342L0.569077 6.66582C0.497584 7.93886 0.498984 9.20178 0.50039 10.4706C0.500586 10.6469 0.500781 10.8234 0.500781 11C0.500781 11.1766 0.500586 11.3531 0.50039 11.5295C0.498984 12.7987 0.497583 14.0634 0.569077 15.3342C0.650507 17.0153 1.03402 18.5073 2.26335 19.7367C3.4953 20.9686 4.98469 21.3495 6.66582 21.4309C7.93888 21.5024 9.20181 21.501 10.4706 21.4996C10.6469 21.4994 10.8234 21.4992 11 21.4992C11.177 21.4992 11.3537 21.4994 11.5303 21.4996C12.8009 21.501 14.0635 21.5024 15.3342 21.4309C17.0153 21.3495 18.5073 20.966 19.7367 19.7367ZM5.10986 11C5.10986 14.2575 7.73984 16.8875 10.9974 16.8875C14.2549 16.8875 16.8849 14.2575 16.8849 11C16.8849 7.74247 14.2549 5.11248 10.9974 5.11248C7.73984 5.11248 5.10986 7.74247 5.10986 11Z" stroke="#C9BBB7"/>
    </svg>
    `
  },
}


export default function OAuthMethods({ providers }) {

  return (
    <aside className={styles.wrapper}>
      {providers.filter(el => el.authorizationUrl).map((method, index) => (
        <a href={method.authorizationUrl} key={index}>
          <span dangerouslySetInnerHTML={{ __html: providersContent[method.provider].icon }} />
          {providersContent[method.provider].text}
        </a>
      ))}
    </aside>
  )
}