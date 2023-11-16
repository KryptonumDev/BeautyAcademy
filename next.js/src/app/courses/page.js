import Grid from "@/components/sections/courses-grid";
import Hero from "@/components/sections/courses-hero";
import LatestBlogEntries from "@/components/sections/latest-blog-entries";
import fetchData from "@/utils/fetchData";
import wpFetchData from "@/utils/wpFetchData";

export default async function Courses() {
  const { page } = await getData();
  const { products, productCategories } = await getProducts();

  return (
    <>
      <Hero data={page} />
      <Grid products={products} productCategories={productCategories} />
      <LatestBlogEntries />
    </>
  )
}

const getData = async () => {
  const { body: { data } } = await fetchData(`
    query {
      page: CoursesPage(id: "coursesPage"){
        # Hero
        hero_Paragraph
        hero_Heading
        
        # SEO
        seo {
          title
          description
        }
      }
    }
  `)
  return data;
}

const getProducts = async () => {
  const { body: { data } } = await wpFetchData(`
  query {
    products(where: {categoryIn: "онлайн-курс"}, first: 6) {
      nodes {
        ... on SimpleProduct {
          id
          name
          price(format: FORMATTED)
          terms {
            nodes {
              name
              slug
              taxonomyName
              ... on ProductCategory {
                id
                name
              }
            }
          }
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
    productCategories(where: {childless: true}) {
      nodes {
        name
        id
        slug
      }
    }
  }
`)
  return data;
}