import React from "react"
import styles from "./styles.module.scss"
import Radio from "@/components/moleculas/radio"
import { useForm } from "react-hook-form"
import Button from "@/components/atoms/Button"

const methods = [
  { name: 'card', title: 'Кредитная карта' },
  { name: 'blik', title: 'BLIK' },
  { name: 'p24', title: 'Przelewy 24' },
  { name: 'paypal', title: 'PayPal' },
  { name: 'DIRECT', title: 'Перевод на карту' },
]

export default function Payment({ nextStep, setInput, input }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "all",
    defaultValues: {
      type: methods[0].name
    }
  })

  const onSubmit = (data) => {
    // const newInput = generateNewInput(data, input)
    setInput({...input, paymentMethod: data.type})
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <h2>Выберите способ оплаты</h2>
      <div className={styles.flex}>
        <div className={styles.grid}>
          {methods.map(el => (
            <Radio
              key={el.name}
              value={el.name}
              label={el.title}
              register={register('type')}
              errors={errors} />
          ))}
        </div>
        <Button>Итог</Button>
      </div>
    </form>
  )
}