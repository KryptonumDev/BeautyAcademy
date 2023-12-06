'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Markdown from '@/components/atoms/Markdown';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';
import Checkbox from '@/components/moleculas/Checkbox';
import Input from '@/components/moleculas/Input';
import { regex } from '@/global/constants';
import Loader from '@/components/atoms/Loader';
import { FormError, FormSuccess } from '@/components/atoms/Icons';

const url = `https://wp.beautyacademy.expert/wp-json/contact-form-7/v1/contact-forms/137/feedback`;

const Form = () => {
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
      <Input
        label="Имя"
        type="text"
        register={register('name', {
          required: { value: true, message: `Введите имя` },
          minLength: { value: 2, message: `Имя должно состоять минимум из 2-х символов` }
        })}
        errors={errors}
      />
      <Input
        label="Электронный адрес"
        type="text"
        register={register('email', {
          required: { value: true, message: `Введите E-mail` },
          pattern: { value: regex.email, message: `Введите правильный E-mail` }
        })}
        errors={errors}
      />
      <Input
        label="Ваше сообщение"
        textarea={true}
        register={register('message', {
          required: { value: true, message: `Введите сообщение` },
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
          required: { value: true, message: `Необходимо согласие` }
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
          <Markdown.h3>{status.success ? "Ваше сообщение было отправлено успешно" : "Отправка сообщения не удалась"}</Markdown.h3>
          <Markdown className={styles.paragraph}>{status.success ? "Мы ответим на него как можно быстрее" : "Проверьте подключение к сети и введенные вами данные."}</Markdown>
          {!status.success && (
            <Button
              type="button"
              onClick={() => setStatus({ sending: false, success: undefined })}
            >Попробуйте еще раз</Button>
          )}
        </div>
      )}
    </form>
  );
};

export default Form;