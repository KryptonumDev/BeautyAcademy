'use client'
import React, { useState } from "react"
import styles from './styles.module.scss'
import Link from "next/link"
import Card from "@/components/moleculas/product-card"
import Select, { components } from 'react-select';
import Button from "@/components/atoms/Button"
import { useMutation } from "src/hooks/use-mutation"

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <svg width="25" height="14" viewBox="0 0 25 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.583 1.1109L12.4997 12.1942L1.41643 1.1109" stroke="#2B483C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </components.DropdownIndicator>
  )
}

export default function Grid({ products, productCategories }) {

  const [newProducts, setNewProducts] = useState(products)

  const { request } = useMutation(`
    query newProducts($endCursor: String) {
      products(where: {categoryIn: "онлайн-курс"}, first: 1, after: $endCursor) {
        nodes {
          ... on SimpleProduct {
            productId: databaseId
            id
            slug
            name
            date
            onSale
            price(format: FORMATTED)
            regularPrice(format: FORMATTED)
            salePrice(format: FORMATTED)
            productTags {
              nodes {
                name
                id
                slug
              }
            }
            productCategories {
              nodes {
                name
                children {
                  nodes {
                    name
                  }
                }
              }
            }
            featuredImage {
              asset : node {
                altText
                url : mediaItemUrl
                metadata : mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
        pageInfo {
          total
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  `, {
    onCompleted: ({ body }) => {
      setNewProducts({ nodes: [...newProducts.nodes, ...body.data.products.nodes], pageInfo: body.data.products.pageInfo })
    },
    onError: (error) => {
      console.log(error.message)
    },
    needAuth: false
  })

  const loadMore = () => {
    request({ variables: { endCursor: products.pageInfo.endCursor } })
  }

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
        <div className={styles.complexity}>
          <span>Уровень сложности</span>
          <Select options={[
            { value: '0', label: 'Все уровни' },
            { value: '1', label: 'Начальный' },
            { value: '2', label: 'Средний' },
            { value: '3', label: 'Продвинутый' }
          ]}
            placeholder="Выберите уровень сложности"
            classNamePrefix="react-select"
            className="filter input"
            components={{ DropdownIndicator }}
            isSearchable={false}
          />
        </div>
      </div>
      <div className={styles.grid}>
        {newProducts?.nodes?.map((product, index) => (
          <Card data={product} key={index} />
        ))}
      </div>
      <div className={styles.pagination}>
        <p>{newProducts?.nodes?.length} из {products.pageInfo.total} курсов</p>
        <span style={{ '--percent': `${100 / products.pageInfo.total * newProducts?.nodes?.length}%` }} className={`${styles.line}`} />
        {newProducts?.nodes?.length !== products.pageInfo.total && (
          <Button onClick={loadMore}>Cледующие курсы</Button>
        )}
      </div>
    </section>
  )
}