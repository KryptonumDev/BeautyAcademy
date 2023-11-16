import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import SchemaBreadcrumbs from "@/global/Schema/Breadcrumbs";
import Hero from "@/components/sections/academy-hero";
import Faq from "@/components/sections/faq";
import Newsletter from "@/components/sections/newsletter";
import LatestBlogEntries from "@/components/sections/latest-blog-entries";
import Values from "@/components/sections/academy-values";
import Procedures from "@/components/sections/academy-procedures";

const pathname = '/academy';

const AcademyPage = async () => {
  const { page: {
    hero_Heading,
    hero_Paragraph,
    hero_Cta,
    hero_Img,
    hero_Stats,
    values_Heading,
    values_List,
    procedures_Heading,
    procedures_List,
    faq,
  } } = await query();

  return (
    <>
      <Hero data={{
        hero_Heading,
        hero_Paragraph,
        hero_Cta,
        hero_Img,
        hero_Stats,
      }} />
      <Values data={{
        values_Heading,
        values_List,
      }} />
      <Procedures data={{
        procedures_Heading,
        procedures_List,
      }} />
      <Faq data={faq} />
      <Newsletter />
      <LatestBlogEntries />
      <SchemaBreadcrumbs breadcrumbs={[
        { name: 'Homepage', path: '/' },
        { name: 'Academy', path: pathname },
      ]} />
    </>
  )
}

export async function generateMetadata() {
  const { page: { seo } } = await query();
  return Seo({
    title: seo?.title,
    description: seo?.description,
    path: pathname,
  })
}

const query = async () => {
  const { body: { data } } = await fetchData(`
    query {
      page: AcademyPage(id: "academyPage") {
        # Hero
        hero_Heading
        hero_Paragraph
        hero_Cta {
          theme
          text
          href
        }
        hero_Img {
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
        hero_Stats {
          number
          description
        }

        # Our Values
        values_Heading
        values_List

        # Procedures
        procedures_Heading
        procedures_List {
          title
          description
          img {
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

        # Faq
        faq {
          heading
          list {
            question: title
            answer: description
          }
        }

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

export default AcademyPage;