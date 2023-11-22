import React, { useMemo } from "react"
import styles from './styles.module.scss'
import { Discount, EmptyFire, Fire } from "@/components/atoms/Icons"
import Link from "next/link"
import AddToCart from "@/components/atoms/add-to-cart"
import Img from "@/components/atoms/Img"

export default function Card({ data }) {

  const complicity = useMemo(() => data.productTags.nodes[0].slug, [data])
  const categories = useMemo(() => data.productCategories.nodes.filter(el => el.children.nodes.length === 0), [data])
  const types = useMemo(() => data.productCategories.nodes.filter(el => el.children.nodes.length > 0), [data])
  const isNew = useMemo(() => {
    const date = new Date(data.date)
    const now = new Date()
    return now - date < 1000 * 60 * 60 * 24 * 14
  })

  return (
    <div className={styles.item}>
      <Link href={`/courses/${data.slug}`} className={styles.overlay} />
      {(isNew || data.onSale) && (
        <div className={`${styles.plate} ${isNew && styles.new} ${data.onSale && styles.sale}`}>
          {data.onSale && <Discount />}
          {isNew && <span>Новинка</span>}
        </div>
      )}
      <Img data={data.featuredImage} className={styles.img} />
      <div className={styles.content}>
        <div className={styles.types}>
          {types.map(el => (
            <span key={el.name}>{el.name}</span>
          ))}
        </div>
        <h3 >{data.name}</h3>
        <div className={styles.complicity}>
          Уровень сложности: <span className={styles.fires}>
            <Fire />
            {complicity >= 2 ? <Fire /> : <EmptyFire />}
            {complicity >= 3 ? <Fire /> : <EmptyFire />}
          </span>
        </div>
        <p className={styles.price} dangerouslySetInnerHTML={{ __html: data.price }} />
        {data.price !== data.regularPrice && <p className={styles.smallPrice} dangerouslySetInnerHTML={{ __html: data.regularPrice }} />}
      </div>
      <div className={styles.cart}>
        <AddToCart quantity='1' product={data}>В корзину</AddToCart>
      </div>
    </div>
  )
}