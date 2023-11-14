'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Markdown from '@/utils/Markdown';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';
import Checkbox from '@/components/moleculas/Checkbox';
import Input from '@/components/moleculas/Input';
import { regex } from '@/global/constants';
import Chip from '@/components/moleculas/Chip';
import Loader from '@/components/atoms/Loader';
import Error from '@/components/moleculas/Error';

const url = `https://wp.beautyacademy.expert/wp-json/contact-form-7/v1/contact-forms/14/feedback`;

const Form = ({
  data: {
    form_Heading,
    form_Subjects,
    states: {
      formSuccess_Heading,
      formSuccess_Paragraph,
      formError_Heading,
      formError_Paragraph,
      formError_Cta,
    }
  }
}) => {
  const [status, setStatus] = useState({ sending: false });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all' })

  const onSubmit = (data) => {
    setStatus({ sending: true });
    let body = new FormData();
    body.append('your-name', data.name)
    body.append('your-email', data.email)
    body.append('your-subject', data.subject)
    body.append('your-message', data.message)

    fetch(url, {
      method: 'POST',
      body
    })
      .then(response => response.json())
      .then(response => {
        if (response.status === 'mail_sent') {
          setStatus(prevStatus => ({ ...prevStatus, success: true }));
          reset();
        } else {
          setStatus(prevStatus => ({ ...prevStatus, success: false }));
        }
      })
      .catch(() => {
        setStatus(prevStatus => ({ ...prevStatus, success: false }));
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      {form_Heading && (
        <Markdown.h2 className="h3">{form_Heading}</Markdown.h2>
      )}
      <div className={styles.chips}>
        {form_Subjects.map((item, i) => (
          <Chip
            register={register('subject', {
              required: { value: true, message: `Subject is required` },
            })}
            name="subject"
            value={item}
            errors={errors}
            key={i}
          >{item}</Chip>
        ))}
        <Error error={errors['subject']} />
      </div>
      <Input
        label="Имя"
        type="text"
        register={register('name', {
          required: { value: true, message: `Name is required` },
          minLength: { value: 2, message: `Name should have at least 2 characters` }
        })}
        errors={errors}
      />
      <Input
        label="Электронный адрес"
        type="text"
        register={register('email', {
          required: { value: true, message: `Email is required` },
          pattern: { value: regex.email, message: `Incorrect e-mail address` }
        })}
        errors={errors}
      />
      <Input
        label="Ваше сообщение"
        textarea={true}
        register={register('message', {
          required: { value: true, message: `Message is required` },
        })}
        errors={errors}
      />
      <Checkbox
        label={<>
          Я принимаю{' '}
          <Link
            className='link'
            href="/privacy-policy"
            target="_blank"
            rel="noreferrer"
          >политику конфиденциальности</Link>
        </>}
        register={register('legal', {
          required: { value: true, message: `Agreement is required` }
        })}
        errors={errors}
      />
      <Button
        type="submit"
        disabled={status.sending}
      >
        {status.sending && (
          <Loader />
        )}
        <span></span>
        Отправить сообщение
      </Button>
      {status.success !== undefined && (
        <div className={styles.state} aria-invalid={!status.success}>
          {status.success ? <Icon.Success /> : <Icon.Error />}
          <Markdown.h3>{status.success ? formSuccess_Heading : formError_Heading}</Markdown.h3>
          <Markdown className={styles.paragraph}>{status.success ? formSuccess_Paragraph : formError_Paragraph}</Markdown>
          {!status.success && (
            <Button
            type="button"
            onClick={() => setStatus({ sending: false, success: undefined })}
            >{formError_Cta}</Button>
          )}
        </div>
      )}
    </form>
  );
};

export default Form;

const Icon = {
  "Success": () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='80'
      height='81'
      fill='none'
      viewBox='0 0 80 81'
    >
      <rect
        width='79'
        height='79'
        x='0.5'
        y='1'
        stroke='url(#a)'
        rx='39.5'
      ></rect>
      <g filter='url(#b)'>
        <rect
          width='64'
          height='64'
          x='8'
          y='8.5'
          fill='#fff'
          fillOpacity='0.2'
          rx='32'
        ></rect>
        <rect
          width='63'
          height='63'
          x='8.5'
          y='9'
          stroke='#fff'
          rx='31.5'
        ></rect>
        <path
          stroke='#01492B'
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M41.66 51.309c-.976.976-4.537-1.002-7.954-4.42-3.417-3.417-5.396-6.978-4.42-7.955.522-.52 1.78-.2 3.36.733m9.015 11.642c.515-.516.207-1.753-.703-3.309m.703 3.309c-.725.725-10.28 3.459-15.154 4.82-1.245.347-2.382-.8-2.036-2.045l.348-1.255m11.38.26c-1.472-.295-2.862-1.095-5.303-3.536-2.44-2.44-3.535-4.124-3.535-5.303m4.282 10.005c-.884-.294-1.776-.598-3.24-2.062-1.465-1.465-1.768-2.357-2.063-3.241m9.91-5.535c3.334-5 11.25-7.084 14.584-7.084M35.417 38c2.5-3.75.834-7.917-.416-9.583m5.416 16.25c4.167-1.667 7.917 0 10 2.916m.417-22.083v.833m0 3.334v.833m2.5-2.5h-.833m-3.333 0h-.834m5 20.833v.834m0 3.333v.833m2.5-2.5h-.833m-3.333 0h-.834m-6.667-20a1.667 1.667 0 11-3.333 0 1.667 1.667 0 013.333 0zm10.834 10.834a1.667 1.667 0 11-3.334 0 1.667 1.667 0 013.334 0zm-21.667-17.5a.833.833 0 11-1.666 0 .833.833 0 011.666 0zm23.334 11.666a.833.833 0 11-1.667 0 .833.833 0 011.667 0z'
        ></path>
      </g>
      <defs>
        <linearGradient
          id='a'
          x1='0'
          x2='84.351'
          y1='73.86'
          y2='73.86'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#F7C479'></stop>
          <stop offset='0.253' stopColor='#DCA855'></stop>
          <stop offset='0.582' stopColor='#C79442'></stop>
          <stop offset='0.764' stopColor='#BC7F1D'></stop>
          <stop offset='1' stopColor='#BA7403'></stop>
        </linearGradient>
        <filter
          id='b'
          width='160'
          height='160'
          x='-40'
          y='-39.5'
          colorInterpolationFilters='sRGB'
          filterUnits='userSpaceOnUse'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
          <feGaussianBlur
            in='BackgroundImageFix'
            stdDeviation='24'
          ></feGaussianBlur>
          <feComposite
            in2='SourceAlpha'
            operator='in'
            result='effect1_backgroundBlur_1553_14323'
          ></feComposite>
          <feBlend
            in='SourceGraphic'
            in2='effect1_backgroundBlur_1553_14323'
            result='shape'
          ></feBlend>
        </filter>
      </defs>
    </svg>
  ),
  "Error": () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='80'
      height='80'
      fill='none'
      viewBox='0 0 80 80'
    >
      <rect
        width='79'
        height='79'
        x='0.5'
        y='0.5'
        stroke='#891616'
        rx='39.5'
      ></rect>
      <g filter='url(#a)'>
        <rect
          width='64'
          height='64'
          x='8'
          y='8'
          fill='#fff'
          fillOpacity='0.2'
          rx='32'
        ></rect>
        <rect
          width='63'
          height='63'
          x='8.5'
          y='8.5'
          stroke='#fff'
          rx='31.5'
        ></rect>
        <path
          stroke='#891616'
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M37.034 27.45c1.24-2.416 4.693-2.416 5.932 0l11.211 21.862c1.138 2.218-.473 4.855-2.966 4.855H28.79c-2.493 0-4.104-2.637-2.966-4.855l11.211-21.861z'
        ></path>
        <path
          stroke='#891616'
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M39.199 42.196l-1.616-5.658a2.514 2.514 0 114.835 0L40.8 42.196c-.23.805-1.372.805-1.602 0zm2.468 6.137a1.667 1.667 0 11-3.334 0 1.667 1.667 0 013.334 0z'
        ></path>
      </g>
      <defs>
        <filter
          id='a'
          width='160'
          height='160'
          x='-40'
          y='-40'
          colorInterpolationFilters='sRGB'
          filterUnits='userSpaceOnUse'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
          <feGaussianBlur
            in='BackgroundImageFix'
            stdDeviation='24'
          ></feGaussianBlur>
          <feComposite
            in2='SourceAlpha'
            operator='in'
            result='effect1_backgroundBlur_1553_14343'
          ></feComposite>
          <feBlend
            in='SourceGraphic'
            in2='effect1_backgroundBlur_1553_14343'
            result='shape'
          ></feBlend>
        </filter>
      </defs>
    </svg>
  )
}