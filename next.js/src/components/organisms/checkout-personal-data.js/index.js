'use client'
import React from "react"
import styles from './styles.module.scss'
import { useForm } from "react-hook-form"
import Radio from "@/components/moleculas/radio"
import Input from "@/components/moleculas/Input"
import { regex } from "@/global/constants"
import Button from "@/components/atoms/Button"

export default function PersonalData({ input, nextStep, setInput }) {
  const { register, watch, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
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
          <Input
            label="Название фирмы"
            type="text"
            register={register('firm', {
              required: { value: true, message: `Name is required` },
              minLength: { value: 2, message: `Name should have at least 2 characters` }
            })}
            errors={errors}
          />
        ) : (
          <Input
            label="Имя и фамилия"
            type="text"
            register={register('name', {
              required: { value: true, message: `Name is required` },
              minLength: { value: 2, message: `Name should have at least 2 characters` }
            })}
            errors={errors}
          />
        )}
        <Input
          label="Электронная почта"
          type="text"
          register={register('email', {
            required: { value: true, message: `Email is required` },
            pattern: { value: regex.email, message: `regex` }
          })}
          errors={errors}
        />
        <Input
          label="Адрес"
          type="text"
          register={register('address', {
            required: { value: true, message: `Adres is required` },
          })}
          errors={errors}
        />
        <div className={styles.flex}>
          <Input
            label="Почтовый индекс"
            type="text"
            register={register('postcode', {
              required: { value: true, message: `Postcode is required` },
            })}
            errors={errors}
          />
          <Input
            label="Город"
            type="text"
            register={register('city', {
              required: { value: true, message: `City is required` },
            })}
            errors={errors}
          />
        </div>
        <div className={styles.semi}>
          <Input
            label="Номер телефона"
            type="text"
            register={register('phone', {
              required: { value: true, message: `City is required` },
              pattern: { value: regex.phone, message: `regex` }
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
    name: input?.name || '',
    firm: input?.firm || '',
    email: input?.email || '',
    address: input?.address || '',
    postcode: input?.postcode || '',
    city: input?.city || '',
    phone: input?.phone || '',
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
      country: 'PL', //TODO: rework and add switch for country
      postcode: data.postcode,
      email: data.email,
      phone: data.phone,
      company: data.firm,
    },
    billing: {
      firstName: data.name,
      address1: data.address,
      city: data.city,
      country: 'PL', //TODO: rework and add switch for country
      postcode: data.postcode,
      email: data.email,
      phone: data.phone,
      company: data.firm,
    },
    // metaData: [ TODO: add NIP..?
    //   {
    //     key: '_billing_nip',
    //     value: data.billing_nip || '',
    //   }
    // ]
  }
}