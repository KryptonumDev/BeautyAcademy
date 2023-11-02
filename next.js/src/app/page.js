import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import SchemaBreadcrumbs from "@/global/Schema/Breadcrumbs";
import Hero from "@/components/sections/homepage-hero";
import Benefits from "@/components/sections/homepage-benefits";

// export const runtime = 'edge'

const pathname = '';

const IndexPage = async () => {
  const { page: {
    hero_Heading,
    hero_Paragraph,
    hero_Cta,
    hero_Images,
    hero_Videos,
    benefits_Heading,
    benefits_Paragraph,
    benefits_List,
    benefits_Paragraph2,
    benefits_Cta,
    benefits_Img,
  }} = await getData();

  return (
    <>
      <Hero data={{
        hero_Heading,
        hero_Paragraph,
        hero_Cta,
        hero_Images,
        hero_Videos,
      }} />
      <Benefits data={{
        benefits_Heading,
        benefits_Paragraph,
        benefits_List,
        benefits_Paragraph2,
        benefits_Cta,
        benefits_Img,
      }} />
      <SchemaBreadcrumbs breadcrumbs={[
        { name: 'Main page', path: pathname },
      ]} />
    </>
  )
}

export async function generateMetadata() {
  const { page: { seo } } = await getData();
  return Seo({
    title: seo?.title,
    description: seo?.description,
    path: pathname,
  })
}

const getData = async () => {
  const { body: { data } } = await fetchData(`
    page: IndexPage(id: "indexPage") {
        # Hero
      hero_Heading
      hero_Paragraph
      hero_Cta {
        theme
        text
        href
      }
      hero_Images {
        asset {
          altText
          url
          metadata {
            lqip
            dimensions {
              width
              height
            }
          }
        }
      }
      hero_Videos {
        asset {
          url
          altText
        }
      }
        # Benefits
      benefits_Heading
      benefits_Paragraph
      benefits_List
      benefits_Paragraph2
      benefits_Cta {
        theme
        text
        href
      }
      benefits_Img {
        asset {
          altText
          url
          metadata {
            lqip
            dimensions {
              width
              height
            }
          }
        }
      }
    }
  `)
  return data;
}

export default IndexPage;