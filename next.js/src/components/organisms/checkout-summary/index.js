import React from "react"
import styles from "./styles.module.scss"
import Button from "@/components/atoms/Button";
import { useForm } from "react-hook-form";
import Checkbox from "@/components/moleculas/Checkbox";
import Radio from "@/components/moleculas/radio";
import Input from "@/components/moleculas/Input";
import Cart from "../checkout-cart";

export default function Summary({ input, setInput, setStep, nextStep }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'all',
    defaultValues: generateDefaults(input)
  })

  const onSubmit = (data) => {
    setInput({ ...input, comment: data.comment })
    nextStep()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} >
        <Cart />
        <div className={styles.summary}>
          <div className={styles.part}>
            <h2 className={styles.title}>Вы покупаете как</h2>
            <Radio
              value='default'
              label={input.firmOrder ? "Физическое лицо" : 'Юридическое лицо'}
              register={register('type')}
              errors={errors} />
            <div className={styles.partData}>
              <Button variant="secondary" type='button' onClick={() => { setStep(1) }}>Изменить</Button>
              {input.firmOrder ? (
                <Input
                  label="Название фирмы"
                  type="text"
                  readOnly={true}
                  register={register('firm')}
                  errors={errors}
                />
              ) : (
                <Input
                  label="Имя и фамилия"
                  type="text"
                  readOnly={true}
                  register={register('name')}
                  errors={errors}
                />
              )}
              <Input
                label="Электронная почта"
                type="text"
                readOnly={true}
                register={register('email')}
                errors={errors}
              />
              <Input
                label="Код страны"
                type="text"
                readOnly={true}
                register={register('country')}
                errors={errors}
              />
              <Input
                label="Адрес"
                type="text"
                readOnly={true}
                register={register('address')}
                errors={errors}
              />
              <div className={styles.flex}>
                <Input
                  label="Почтовый индекс"
                  type="text"
                  readOnly={true}
                  register={register('postcode')}
                  errors={errors}
                />
                <Input
                  label="Город"
                  type="text"
                  readOnly={true}
                  register={register('city')}
                  errors={errors}
                />
              </div>
              <div className={styles.semi}>
                <Input
                  label="Номер телефона"
                  type="text"
                  readOnly={true}
                  register={register('phone')}
                  errors={errors}
                />
              </div>
            </div>
          </div>
          {/* TODO: Delivery */}
          {/* <div className={styles.part}>
            <div className={`${styles.flex} ${styles.title}`}>
              <h2>Авторизация</h2>
              <Button variant="secondary" type='button' onClick={() => { setStep(2) }}>Изменить</Button>
            </div>
            <div className={styles.partData}>

            </div>
          </div> */}
          {/* <div className={styles.part}>
            <div className={`${styles.flex} ${styles.title}`}>
              <h2>Оплата</h2>
              <Button variant="secondary" type='button' onClick={() => { setStep(2) }}>Изменить</Button>
            </div>
            <Radio
              value='default'
              label={input.paymentMethod.title}
              register={register('paymentMethod')}
              errors={errors} />
          </div> */}
        </div>
        <div className={styles.ending}>
          <Input
            label="Комментарий к заказу"
            textarea={true}
            register={register('comment')}
            errors={errors}
          />
          <div className={styles.flex}>
            <Checkbox
              label="Я принимаю правила пользования магазина"
              register={register('consent', { required: { value: true, message: 'Согласие с правилами магазина обязательно' } })}
              errors={errors}
            />
            <Button>Оплачиваю</Button>
          </div>
        </div>
      </form>
    </>
  )
}

const generateDefaults = (input) => {
  return {
    type: 'default',
    name: input?.billing?.firstName || '',
    firm: input?.billing?.firm || '',
    email: input?.billing?.email || '',
    address: input?.billing?.address1 || '',
    postcode: input?.billing?.postcode || '',
    city: input?.billing?.city || '',
    phone: input?.billing?.phone || '',
    paymentMethod: 'default',
    comment: input?.comment || '',
    country: input?.billing?.country || '',
  }
}
