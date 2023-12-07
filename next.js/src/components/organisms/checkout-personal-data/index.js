'use client'
import React from "react"
import styles from './styles.module.scss'
import { useForm } from "react-hook-form"
import Radio from "@/components/moleculas/radio"
import Input from "@/components/moleculas/Input"
import { regex } from "@/global/constants"
import Button from "@/components/atoms/Button"
import CountrySelect from "@/components/moleculas/country-select"

export default function PersonalData({ input, nextStep, setInput }) {
  const { control, register, watch, handleSubmit, formState: { errors } } = useForm({
    mode: "all",
    defaultValues: generateDefaults(input)
  })

  const onSubmit = (data) => {
    const newInput = generateNewInput(data, input)
    setInput(newInput)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <div className={styles.chose}>
        <h2>Покупаю как</h2>
        <div className={styles.buttons}>
          <Radio
            value='person'
            label="Физическое лицо"
            register={register('type')}
            errors={errors} />
          <Radio
            value='firm'
            label="Юридическое лицо"
            register={register('type')}
            errors={errors} />
        </div>
      </div>
      <div className={styles.form}>
        {watch('type') === 'firm' ? (
          <>
            <Input
              label="Идентификатор налогоплатильщика (если есть)"
              type="text"
              register={register('nip')}
              errors={errors}
            />
            <Input
              label="Название фирмы"
              type="text"
              register={register('firm', {
                required: { value: true, message: `Введите название компании` },
                minLength: { value: 2, message: `Название компании должно состоять минимум из 2-х символов` }
              })}
              errors={errors}
            />
          </>
        ) : (
          <Input
            label="Имя и фамилия"
            type="text"
            register={register('name', {
              required: { value: true, message: `Введите имя` },
              minLength: { value: 2, message: `Имя должно состоять минимум из 2-х символов` }
            })}
            errors={errors}
          />
        )}
        <Input
          label="Электронная почта"
          type="text"
          register={register('email', {
            required: { value: true, message: `Введите E-mail` },
            pattern: { value: regex.email, message: `Введите правильный E-mail` }
          })}
          errors={errors}
        />
        <CountrySelect
          label="Страна"
          name={'country'}
          rules={{ required: { value: true, message: 'Выберите страну' } }}
          errors={errors}
          control={control}
        />
        <Input
          label="Адрес"
          type="text"
          register={register('address', {
            required: { value: true, message: `Введите адрес` },
          })}
          errors={errors}
        />
        <div className={styles.flex}>
          <Input
            label="Почтовый индекс"
            type="text"
            register={register('postcode', {
              required: { value: true, message: `Введите почтовый индекс` },
            })}
            errors={errors}
          />
          <Input
            label="Город"
            type="text"
            register={register('city', {
              required: { value: true, message: `Введите город` },
            })}
            errors={errors}
          />
        </div>
        <div className={styles.semi}>
          <Input
            label="Номер телефона"
            type="text"
            register={register('phone', {
              required: { value: true, message: `Введите телефон` },
              pattern: { value: regex.phone, message: `Введите телефон в формате +1234567890` }
            })}
            errors={errors}
          />
        </div>
        {/* <Checkbox
          label="Адрес доставки совпадает с адресом плательщика"
          register={register('sameAsBilling')}
          errors={errors}
        /> */}
        <Button>Следующий шаг</Button>
      </div>
    </form>
  )
}

const generateDefaults = (input) => {
  return {
    type: input?.firmOrder ? 'firm' : 'person',
    name: input?.billing?.firstName || '',
    firm: input?.billing?.firm || '',
    email: input?.billing?.email || '',
    address: input?.billing?.address1 || '',
    postcode: input?.billing?.postcode || '',
    city: input?.billing?.city || '',
    phone: input?.billing?.phone || '',
    country: input?.billing?.country || '',
  }
}

const generateNewInput = (data, input) => {
  return {
    ...input,
    firmOrder: data.type === 'firm',
    billingDifferentThanShipping: !data.shipping_same_as_billing,
    shipping: {
      firstName: data.name,
      address1: data.address,
      city: data.city,
      country: data.country,
      postcode: data.postcode,
      email: data.email,
      phone: data.phone,
      company: data.firm,
    },
    billing: {
      firstName: data.name,
      address1: data.address,
      city: data.city,
      country: data.country,
      postcode: data.postcode,
      email: data.email,
      phone: data.phone,
      company: data.firm,
    },
    metaData: [
      {
        key: '_billing_nip',
        value: data.nip || '',
      }
    ]
  }
}