export const ADD_TO_CART = `
  mutation ADD_TO_CART($input: AddToCartInput!) {
    addToCart(input: $input) {
      cartItem {
        total
      }
      cart {
        contents {
          itemCount
          productCount
          nodes {
            key
            extraData {
              value
              key
            }
            product {
              node {
                id
                productId: databaseId
                name
                description
                type
                onSale
                slug
                averageRating
                reviewCount
                image {
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
                galleryImages {
                  nodes {
                    id
                    altText
                    mediaItemUrl
                    mediaDetails {
                      height
                      width
                    }
                    srcSet
                    title
                  }
                }
                ... on SimpleProduct {
                  price
                  regularPrice
                  salePrice
                }
              }
            }
            variation {
              node {
                id
                variationId: databaseId
                name
                description
                type
                onSale
                price
                regularPrice
                salePrice
                image {
                  id
                  altText
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                  title
                }
              }
            }
            quantity
            total
            subtotal
            subtotalTax
          }
        }
        appliedCoupons {
          code
          discountAmount
          discountTax
        }
        subtotal
        subtotalTax
        shippingTax
        shippingTotal
        total(format: RAW)
        totalTax
        feeTax
        feeTotal
        discountTax
        discountTotal
        # new
        availableShippingMethods {
          supportsShippingCalculator
          packageDetails
          rates {
            cost
            methodId
            label
            instanceId
          }
        }
        chosenShippingMethods
        needsShippingAddress
      }
    }
  }
`