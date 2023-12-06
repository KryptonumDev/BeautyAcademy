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
import Chip from '@/components/moleculas/Chip';
import Loader from '@/components/atoms/Loader';
import Error from '@/components/moleculas/Error';
import { FormSuccess, FormError } from '@/components/atoms/Icons';

const url = `https://wp.beautyacademy.expert/wp-json/contact-form-7/v1/contact-forms/14/feedback`;

const Form = ({
  data: {
    subjects,
    heading,
    success_Heading,
    success_Paragraph,
    error_Heading,
    error_Paragraph,
    error_Cta,
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
      {heading && (
        <Markdown.h2 className="h3">{heading}</Markdown.h2>
      )}
      <div className={styles.chips}>
        {subjects.map((item, i) => (
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
        <Error error={errors['subject']} className={styles.error} />
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
          {status.success ? <FormSuccess /> : <FormError />}
          <Markdown.h3>{status.success ? success_Heading : error_Heading}</Markdown.h3>
          <Markdown className={styles.paragraph}>{status.success ? success_Paragraph : error_Paragraph}</Markdown>
          {!status.success && (
            <Button
            type="button"
            onClick={() => setStatus({ sending: false, success: undefined })}
            >{error_Cta}</Button>
          )}
        </div>
      )}
    </form>
  );
};

export default Form;