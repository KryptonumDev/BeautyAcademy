'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/moleculas/Input';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';
import { regex } from '@/global/constants';
import Checkbox from '@/components/moleculas/Checkbox';
import Link from 'next/link';

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
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
      <Button type="submit">Подписываюсь</Button>
      <Checkbox
        label={<>
          I agree to the{' '}
          <Link
            className='link'
            href="/privacy-policy"
            target="_blank"
            rel="noreferrer"
          >privacy policy</Link>
        </>}
        register={register('legal', {
          required: { value: true, message: `Agreement is required` }
        })}
        errors={errors}
      />
      {status.success !== undefined && (
        <div className={styles.state}>
          
        </div>
      )}
    </form>
  );
};

export default Form;