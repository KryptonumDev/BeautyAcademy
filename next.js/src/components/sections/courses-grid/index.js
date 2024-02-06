"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Card from "@/components/moleculas/product-card";
import Select, { components } from "react-select";
import Button from "@/components/atoms/Button";
import { useMutation } from "src/hooks/use-mutation";
import Loader from "@/components/moleculas/request-loader";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="25"
        height="14"
        viewBox="0 0 25 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.583 1.1109L12.4997 12.1942L1.41643 1.1109"
          stroke="#2B483C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

export default function Grid({ slug, products, productCategories, customer }) {
  const [newProducts, setNewProducts] = useState(products);
  const [complexity, setComplexity] = useState(null);
  const [total, setTotal] = useState(products.length);
  const loading = false;

  // TODO: add loadMore
  // const { request, loading } = useMutation(`
  //   query newProducts($endCursor: String, $complexity: [String]) {
  //     products(where: {tagIn: $complexity, categoryIn: "онлайн-курс"}, first: 6, after: $endCursor) {
  //       nodes {
  //         ... on SimpleProduct {
  //           productId: databaseId
  //           id
  //           slug
  //           name
  //           date
  //           onSale
  //           price(format: FORMATTED)
  //           regularPrice(format: FORMATTED)
  //           salePrice(format: FORMATTED)
  //           productTags {
  //             nodes {
  //               name
  //               id
  //               slug
  //             }
  //           }
  //           productCategories {
  //             nodes {
  //               name
  //               children {
  //                 nodes {
  //                   name
  //                 }
  //               }
  //             }
  //           }
  //           featuredImage {
  //             asset : node {
  //               altText
  //               url : mediaItemUrl
  //               metadata : mediaDetails {
  //                 width
  //                 height
  //               }
  //             }
  //           }
  //         }
  //       }
  //       pageInfo {
  //         total
  //         endCursor
  //         hasNextPage
  //         hasPreviousPage
  //         startCursor
  //       }
  //     }
  //   }
  // `, {
  //   onCompleted: ({ body }) => {
  //     let newArr = { nodes: [...body.data.products.nodes], pageInfo: body.data.products.pageInfo }
  //     if (body.data.products.pageInfo.hasPreviousPage)
  //       newArr.nodes = [...newProducts.nodes, ...body.data.products.nodes]
  //     else
  //       setTotal(body.data.products.pageInfo.total)

  //     setNewProducts(newArr)
  //   },
  //   onError: (error) => {
  //     console.log(error.message)
  //   }
  // })

  const loadMore = () => {
    // request({ variables: { endCursor: products.pageInfo.endCursor } })
  };

  useEffect(() => {
    // if (complexity) request({ variables: { complexity: complexity === '0' ? null : [complexity] } })
  }, [complexity]);

  return (
    <section className={styles.wrapper}>
      <Loader show={loading} />
      <div className={styles.control}>
        {productCategories?.length > 0 && (
          <div className={styles.categories}>
            {productCategories?.map((category, index) => (
              <Link
                key={index}
                className={`${styles.button} ${
                  slug === category.slug?.current ? styles.active : ""
                }`}
                href={
                  slug === category.slug
                    ? "/courses"
                    : `/courses/category/${category.slug?.current}`
                }
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
        <div className={styles.complexity}>
          <span>Уровень сложности</span>
          <Select
            options={[
              { value: "0", label: "Все уровни" },
              { value: "1", label: "Начальный" },
              { value: "2", label: "Средний" },
              { value: "3", label: "Продвинутый" },
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
        {newProducts?.map((product, index) => (
          <Card
            data={product}
            key={index}
            alreadyBought={
              !!customer?.courses?.nodes?.find(
                (e) => e.id === product.productAcf.course.id
              )
            }
          />
        ))}
      </div>
      <div className={styles.pagination}>
        <p>
          {newProducts?.length} из {total} курсов
        </p>
        <span
          style={{
            "--percent": `${(100 / total) * newProducts?.length || 100}%`,
          }}
          className={`${styles.line}`}
        />
        {newProducts?.length !== total && (
          <Button onClick={loadMore}>Cледующие курсы</Button>
        )}
      </div>
    </section>
  );
}
