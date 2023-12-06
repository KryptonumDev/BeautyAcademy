import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import wpFetchData from "@/utils/wpFetchData";
import UpsellCarousel from "@/components/sections/upsell-carousel";
import Hero from "@/components/sections/certificate-hero";
import Form from "@/components/sections/certificate-form";

const CertificatePage = async ({ params: { courseSlug } }) => {
  const {
    slug,
    name,
  } = await getProducts(courseSlug);

  return (
    <>
      <main>
        <Breadcrumbs data={[
          { name: 'Homepage', path: '/' },
          { name: 'Courses', path: '/courses' },
          { name: name, path: `/courses/${slug}` },
          { name: 'Certificate', path: `/courses/${slug}/certificate` },
        ]} />
        <Hero />
        <Form />
        <UpsellCarousel />
      </main>
    </>
  )
}

// export async function generateMetadata({ params: { courseSlug } }) {
//   const { page: [{
//     seo,
//     slug: { current: slug }
//   }] } = await query(courseSlug);
//   return Seo({
//     title: seo?.title,
//     description: seo?.description,
//     path: `/courses/${slug}`,
//   })
// }

const getProducts = async (slug) => {
  const { body: { data } } = await wpFetchData(/* GraphQL */`
    query ($slug: [String]!) {
      product: products(where: {slugIn: $slug}){
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
            img: featuredImage {
              asset: node {
                altText
                url: mediaItemUrl
                metadata: mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `, {
    slug
  });
  !data.product.nodes[0]?.slug && notFound();
  return data.product.nodes[0];
}

// export async function generateStaticParams() {
//   const { body: { data: { entries } } } = await fetchData(`
//     query {
//       entries: allBlogEntry {
//         slug {
//           current
//         }
//       }
//     }
//   `);

//   return entries.map(({ slug: { current: slug } }) => ({
//     slug
//   }))
// }

export default CertificatePage;