import React, { useMemo } from "react"
import styles from './styles.module.scss'
import Link from "next/link"
import AddToCart from "@/components/atoms/add-to-cart"
import Img from "@/components/atoms/Img"
import { AdvancemenetIndicator } from "@/components/atoms/Icons"

export default function Card({ data }) {
  const complicity = useMemo(() => data.productTags.nodes[0].slug, [data])
  const types = useMemo(() => data.productCategories.nodes.filter(el => el.children.nodes.length > 0), [data])
  const isNew = useMemo(() => {
    const date = new Date(data.date);
    const now = new Date();
    return now - date < 1000 * 60 * 60 * 24 * 14;
  }, [data])
  const {
    name,
    slug,
    price,
    onSale,
    featuredImage,
    regularPrice,
  } = data;

  return (
    <div className={styles.item}>
      <Link
        href={`/courses/${slug}`}
        className={styles.link}
        aria-label={name}
      />
      {(isNew || onSale) && (
        <div className={styles.badges}>
          {isNew && (
            <p className={styles.new}>Новинка</p>
          )}
          {onSale && (
            <p className={styles.sale}>
              <Discount />
              <span>Акция</span>
            </p>
          )}
        </div>
      )}
      <Img
        src={featuredImage.asset.url}
        alt={featuredImage.asset.altText}
        height={featuredImage.asset.metadata.height}
        width={featuredImage.asset.metadata.width}
        className={styles.img}
      />
      <div className={styles.content}>
        <div className={styles.types}>
          {types.map(el => (
            <span key={el.name}>{el.name}</span>
          ))}
        </div>
        <h3>{name}</h3>
        <div className={styles.advancement}>
          <span>Уровень сложности:</span>
          <div>
            <AdvancemenetIndicator isFilled={complicity >= 1} />
            <AdvancemenetIndicator isFilled={complicity >=2} />
            <AdvancemenetIndicator isFilled={complicity >= 3} />
          </div>
        </div>
        <p className={styles.price} dangerouslySetInnerHTML={{ __html: price }} />
        {price !== regularPrice && <p className={styles.smallPrice} dangerouslySetInnerHTML={{ __html: regularPrice }} />}
      </div>
      <div className={styles.cart}>
        <AddToCart quantity='1' product={data}>В корзину</AddToCart>
      </div>
    </div>
  )
}

const Discount = () => (
  <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.8333 10.9441C10.8333 11.2433 10.5908 11.4858 10.2917 11.4858C9.99251 11.4858 9.75 11.2433 9.75 10.9441C9.75 10.645 9.99251 10.4025 10.2917 10.4025C10.5908 10.4025 10.8333 10.645 10.8333 10.9441Z" stroke="#2B483C" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.2503 16.3609C16.2503 16.66 16.0078 16.9025 15.7087 16.9025C15.4095 16.9025 15.167 16.66 15.167 16.3609C15.167 16.0617 15.4095 15.8192 15.7087 15.8192C16.0078 15.8192 16.2503 16.0617 16.2503 16.3609Z" stroke="#2B483C" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.1474 5.30491C14.3723 5.16016 14.4847 5.08778 14.5759 5.04063C15.7285 4.44469 17.143 4.98862 17.5993 6.20331C17.6354 6.29941 17.6704 6.42848 17.7403 6.68664C17.7726 6.80583 17.7888 6.86542 17.8068 6.92025C18.0254 7.58451 18.5512 8.10241 19.2187 8.31098C19.2738 8.3282 19.3336 8.34345 19.4533 8.37395L19.6157 8.41537C20.178 8.5587 20.4591 8.63036 20.6645 8.73218C21.5977 9.19499 22.0695 10.2564 21.7878 11.2593C21.7258 11.48 21.5906 11.7367 21.3203 12.2501L21.2422 12.3984C21.1846 12.5077 21.1559 12.5623 21.1317 12.6148C20.8393 13.25 20.8715 13.9873 21.2181 14.5947C21.2467 14.6448 21.2801 14.6967 21.347 14.8006C21.4917 15.0255 21.5641 15.1379 21.6113 15.2291C22.2072 16.3817 21.6633 17.7962 20.4486 18.2525C20.3525 18.2886 20.2234 18.3236 19.9652 18.3935C19.8461 18.4258 19.7865 18.442 19.7316 18.46C19.0674 18.6786 18.5495 19.2044 18.3409 19.8719C18.3237 19.927 18.3084 19.9868 18.2779 20.1065L18.2365 20.2689C18.0932 20.8312 18.0215 21.1123 17.9197 21.3177C17.4569 22.2509 16.3955 22.7227 15.3926 22.441C15.1719 22.379 14.9152 22.2438 14.4018 21.9735L14.2534 21.8954C14.1442 21.8378 14.0895 21.809 14.0371 21.7849C13.4019 21.4925 12.6646 21.5247 12.0572 21.8713C12.0071 21.8999 11.9552 21.9333 11.8513 22.0002C11.6264 22.1449 11.514 22.2173 11.4228 22.2644C10.2701 22.8604 8.85572 22.3165 8.3994 21.1018C8.3633 21.0057 8.32831 20.8766 8.25835 20.6184C8.22604 20.4993 8.20989 20.4397 8.19185 20.3848C7.97324 19.7206 7.44747 19.2027 6.78 18.9941C6.7249 18.9769 6.66507 18.9616 6.54541 18.9311L6.38295 18.8897C5.82068 18.7464 5.53954 18.6747 5.33422 18.5729C4.40097 18.1101 3.92916 17.0487 4.21092 16.0458C4.2729 15.8251 4.40808 15.5684 4.67842 15.055L4.75653 14.9066C4.81406 14.7974 4.84283 14.7427 4.86697 14.6903C5.15937 14.0551 5.1272 13.3178 4.78058 12.7104C4.75196 12.6603 4.71855 12.6084 4.65171 12.5045C4.50696 12.2796 4.43458 12.1672 4.38743 12.076C3.79149 10.9233 4.33542 9.50892 5.55011 9.0526C5.64621 9.01649 5.77529 8.98151 6.03344 8.91155C6.15263 8.87924 6.21222 8.86309 6.26705 8.84504C6.93131 8.62644 7.44921 8.10067 7.65778 7.4332C7.675 7.3781 7.69025 7.31827 7.72076 7.19861L7.76217 7.03615C7.9055 6.47388 7.97716 6.19274 8.07899 5.98742C8.54179 5.05416 9.60323 4.58236 10.6061 4.86411C10.8268 4.9261 11.0835 5.06127 11.5969 5.33162L11.7452 5.40973C11.8545 5.46726 11.9091 5.49603 11.9616 5.52017C12.5968 5.81257 13.3341 5.78039 13.9415 5.43377C13.9916 5.40516 14.0435 5.37175 14.1474 5.30491Z" stroke="#2B483C" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.292 16.3609L15.7087 10.9442" stroke="#2B483C" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)