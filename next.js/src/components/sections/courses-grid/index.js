'use client'
import React, { useState } from "react"
import styles from './styles.module.scss'
import Link from "next/link"
import Card from "@/components/moleculas/product-card"
import Select from "@manifoldco/react-select-zero"
import '@manifoldco/react-select-zero/assets/react-select-zero.css';

export default function Grid({ products, productCategories }) {

  const [selection, setSelection] = useState(['Bulbasaur']);

  return (
    <section className={styles.wrapper}>
      <div className={styles.control}>
        <div className={styles.categories}>
          {productCategories?.nodes?.map((category, index) => (
            <Link key={index} className={styles.button} href={`/blog/category/${category.slug}`}>
              {category.name}
            </Link>
          ))}
        </div>
        <Select
          noSearch
          name="pokemon"
          options={['Bulbasaur', 'Charmander', 'Squirtle']}
          onChange={setSelection} // ['Bulbasaur']
          value={selection}
          label="Уровень продвижения"
        >
          Уровень продвижения
        </Select>
      </div>
      <div className={styles.grid}>
        {products?.nodes?.map((product, index) => (
          <Card data={product} key={index} />
        ))}
      </div>
    </section>
  )
}