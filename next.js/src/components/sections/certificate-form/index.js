'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Img from '@/components/atoms/Img';
import styles from './styles.module.scss';
import Input from '@/components/moleculas/Input';
import Button from '@/components/atoms/Button';
import { FormError, FormSuccess } from '@/components/atoms/Icons';
import Loader from '@/components/atoms/Loader';
import Checkbox from '@/components/moleculas/Checkbox';
import Link from 'next/link';
import Error from '@/components/moleculas/Error';

const courseName = 'Ознакомительная косметология'
const url = `https://wp.beautyacademy.expert/wp-json/contact-form-7/v1/contact-forms/152/feedback`;

const Form = () => {
  const [status, setStatus] = useState({ sending: false });
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all' })

  const onSubmit = (data) => {
    setStatus({ sending: true });
    let body = new FormData();
    body.append('your-courseName', data.courseName)
    body.append('your-rating', data.rating)
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
          setRating(0);
        } else {
          setStatus(prevStatus => ({ ...prevStatus, success: false }));
        }
      })
      .catch(() => {
        setStatus(prevStatus => ({ ...prevStatus, success: false }));
      })
  }

  return (
    <section className={styles.wrapper}>
      <Img src="https://cdn.sanity.io/images/zm0qqcml/production/ed6ddc4d7bafb20b12a8a19f8efce3c6d3048cb3-422x538.jpg?w=2000&fit=max&auto=format&dpr=2" width={422} height={538} />
      <header>
        <h2>Оцените курс</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="hidden"
            name="courseName"
            value={courseName}
            {...register('courseName')}
          />
          <div className={styles.rating}>
            <p>Ваше мнение</p>
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={i + 1}
                    onClick={(e) => setRating(e.target.value)}
                    {...register('rating', {
                      required: { value: true, message: `Rating is required` }
                    })}
                  />
                  <Heart fill={rating > 0} />
                </label>
              ))}
              <p>
                <span>
                  <span style={{ transform: `translateY(${-rating}em)` }}> 
                    {Array.from({ length: 6 }).map((_, i) => (
                      <span key={i}>{i}</span>
                    ))}
                  </span>
                </span>
                /5
              </p>
            </div>
            <Error error={errors['rating']} />
          </div>
          <Input
            label="Напишите свое мнение <em>(максимум 150 символов)</em>"
            textarea={true}
            register={register('message', {
              required: { value: true, message: `Message is required` },
              maxLength: { value: 150, message: `Message can contain up to 150 characters` },
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
              {status.success ? <FormSuccess /> : <FormError />}
              <h3>{status.success ? "Ваше сообщение было отправлено успешно" : "Отправка сообщения не удалась"}</h3>
              <p className={styles.paragraph}>{status.success ? "Мы ответим на него как можно быстрее" : "Проверьте подключение к сети и введенные вами данные."}</p>
              {!status.success && (
                <Button
                  type="button"
                  onClick={() => setStatus({ sending: false, success: undefined })}
                >Попробуйте еще раз</Button>
              )}
            </div>
          )}
        </form>
      </header>
    </section>
  );
};

export default Form;

const Heart = ({ fill=false }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='38'
    height='38'
    viewBox='0 0 38 38'
    stroke='url(#a)'
    fill={fill ? 'url(#a)' : 'none'}
  >
    <path
      d='M25.594 6.333c-2.67 0-4.37 1.298-5.362 2.472-.495.586-1.816.586-2.311 0-.992-1.174-2.692-2.472-5.362-2.472-4.873 0-7.809 4.646-7.809 8.475 0 4.977 8.617 11.977 12.485 14.869 1.1.821 2.583.821 3.683 0 3.868-2.891 12.485-9.89 12.485-14.868 0-3.83-2.934-8.476-7.81-8.476z'
    ></path>
    <defs>
      <linearGradient
        id='a'
        x1='4.75'
        x2='34.961'
        y1='28.958'
        y2='28.958'
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
