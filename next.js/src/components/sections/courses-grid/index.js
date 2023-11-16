import React from "react"
import styles from './styles.module.scss'
import Link from "next/link"

export default async function Grid({ products, productCategories }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.control}>
        <div className={styles.categories}>
          {productCategories?.nodes?.map((category, index) => (
            <Link key={index} className={styles.button} href='#'>
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}