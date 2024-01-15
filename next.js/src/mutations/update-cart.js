export const UPDATE_CART = `
mutation UPDATE_CART($input: UpdateItemQuantitiesInput!) {
  updateItemQuantities(input: $input) {
    removed {
      key
    }
    updated {
      key
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
              productCategories {
                nodes {
                  slug
                }
              }
              id
              productId: databaseId
              name
              description
              type
              onSale
              slug
              averageRating
              reviewCount
              asset :  image {
                id
                altText
                url : mediaItemUrl
                metadata : mediaDetails {
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
              asset :  image {
                id
                altText
                url : mediaItemUrl
                metadata : mediaDetails {
                  height
                  width
                }
              }
            }
          }
          quantity
          total
          amount: total(format: RAW)
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
      total
      amount: total(format: RAW)
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
`;
