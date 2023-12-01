'use client'
import React, { useEffect, useState } from "react"
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

export default function Grid({ slug, products, productCategories }) {

  const [newProducts, setNewProducts] = useState(products)
  const [needConcat, setNeedConcat] = useState(false)
  const [complexity, setComplexity] = useState('0')

  const { request } = useMutation(`
    query newProducts($endCursor: String, $complexity: [String]) {
      products(where: {tagIn: $complexity, categoryIn: "онлайн-курс"}, first: 6, after: $endCursor) {
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
      let newArr = { nodes: [...body.data.products.nodes], pageInfo: body.data.products.pageInfo }
      if (needConcat) newArr.nodes = [...newProducts.nodes, ...body.data.products.nodes]
      setNewProducts(newArr)
      setNeedConcat(false)
    },
    onError: (error) => {
      console.log(error.message)
      setNeedConcat(false)
    }
  })

  const loadMore = () => {
    setNeedConcat(true)
    request({ variables: { endCursor: products.pageInfo.endCursor } })
  }

  useEffect(() => {
    request({ variables: { complexity: complexity === '0' ? null : [complexity] } })
  }, [complexity])

  debugger
  return (
    <section className={styles.wrapper}>
      <div className={styles.control}>
        <div className={styles.categories}>
          {productCategories?.nodes?.map((category, index) => (
            <Link key={index} className={`${styles.button} ${slug === category.slug ? styles.active : ''}`} href={`/courses/category/${category.slug}`}>
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
            className="select"
            classNamePrefix="select"
            placeholder=""
            components={{ DropdownIndicator }}
            isSearchable={false}
            onChange={({ value }) => setComplexity(value)}
          />
        </div>
      </div>
      <div className={styles.grid}>
        {newProducts?.nodes?.map((product, index) => (
          <Card data={product} key={index} />
        ))}
      </div>
      <div className={styles.pagination}>
        <p>{newProducts?.nodes?.length} из {newProducts.pageInfo.total} курсов</p>
        <span style={{ '--percent': `${100 / newProducts.pageInfo.total * newProducts?.nodes?.length}%` }} className={`${styles.line}`} />
        {newProducts?.nodes?.length !== newProducts.pageInfo.total && (
          <Button onClick={loadMore}>Cледующие курсы</Button>
        )}
      </div>
    </section>
  )
}