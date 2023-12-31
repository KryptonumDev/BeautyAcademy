import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import Hero from "@/components/sections/academy-hero";
import Faq from "@/components/sections/faq";
import Newsletter from "@/components/sections/newsletter";
import LatestBlogEntries from "@/components/sections/latest-blog-entries";
import Values from "@/components/sections/academy-values";
import Procedures from "@/components/sections/academy-procedures";
import HorizontalShowcaseComponent from "@/components/sections/horizontal-showcase";
import TextSection from "@/components/sections/text-section";
import Breadcrumbs from "@/components/organisms/Breadcrumbs";

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
    about,
    HorizontalShowcase,
    faq,
  } } = await query();

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Главная', path: '/' },
        { name: 'Академия', path: pathname },
      ]} />
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
      <TextSection data={about} />
      <HorizontalShowcaseComponent data={HorizontalShowcase} />
      <Faq data={faq} />
      <Newsletter />
      <LatestBlogEntries />
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
  const { body: { data } } = await fetchData(/* GraphQL */`
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

        # About
        about {
          isReversed
          heading
          paragraph
          standout
          cta {
            theme
            text
            href
          }
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
          video {
            asset {
              url
              altText
            }
          }
        }

        # HorizontalShowcase
        HorizontalShowcase {
          heading
          cta {
            theme
            text
            href
          }
          list {
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