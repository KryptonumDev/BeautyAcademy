'use client'
import Input from "@/components/moleculas/Input"
import { useForm } from "react-hook-form"
import { regex } from "@/global/constants"
import Button from "@/components/atoms/Button"
import CountrySelect from "@/components/moleculas/country-select"
import { Trash } from "@/components/atoms/Icons"
import Radio from "@/components/moleculas/radio"
import styles from "./styles.module.scss"

export default function Contentfull({ customer }) {
  const { control, register, watch, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      // type: customer?.type,
      name: customer.billing.firstName,
      email: customer.billing.email,
      country: customer.billing.country,
      address: customer.billing.address1,
      postcode: customer.billing.postcode,
      city: customer.billing.city,
      phone: customer.billing.phone,
      firm: customer.billing.company,
    }
  })

  const changeData = (data) => {
    console.log(data)
  }

  const changeBilling = () => {
    console.log('changeBilling')
  }

  return (
    <>
      <form onSubmit={handleSubmit(changeData)}>
        <Input
          label="Электронная почта"
          type="text"
          register={register('email', {
            required: { value: true, message: `Введите E-mail` },
            pattern: { value: regex.email, message: `Введите правильный E-mail` }
          })}
          errors={errors}
        />
        <Input
          label="Пароль"
          type="password"
          register={register('password', {
            required: { value: true, message: `Введите пароль` },
            minLength: { value: 8, message: `Пароль должен содердать минимум 8 символов` },
            pattern: { value: regex.password, message: `Пароль должен состоять из латинских символов, содержать минимум одну букву верхнего и нижнего регистра, цифру и специальный символ` },
          })}
          errors={errors}
        />
        <Button>Сохранить</Button>
      </form>
      <form onSubmit={handleSubmit(changeBilling)} className={styles.form}>
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
        <Input
          label="Имя и фамилия"
          type="text"
          register={register('name', {
            required: { value: true, message: `Введите имя` },
            minLength: { value: 2, message: `Имя должно состоять минимум из 2-х символов` }
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
        <Button>Сохранить</Button>
      </form>
      {/* <div className={styles.button}> TODO: add remove account functionality
        <Trash />
        <button className={`link ${styles.remove}`}>
          Удалить аккаунт
        </button>
      </div> */}
    </>
  )
}