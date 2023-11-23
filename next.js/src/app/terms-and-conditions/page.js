import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import Newsletter from "@/components/sections/newsletter";
import TextSection from "@/components/sections/text-section";
import Hero from "@/components/sections/terms-and-conditions-hero";

const pathname = '/terms-and-conditions';

const TermsAndConditionsPage = async () => {
  const { page: {
    hero_Heading,
    hero_Paragraph,
    hero_Document,
    hero_Cta,
    textSection,
  } } = await query();

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Homepage', path: '/' },
        { name: 'Terms & Conditions', path: pathname },
      ]} />
      <Hero {...{
        hero_Heading,
        hero_Paragraph,
        hero_Document,
        hero_Cta,
      }}/>
      <TextSection data={textSection} />
      <Newsletter />
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
      page: TermsAndConditionsPage(id: "termsAndConditionsPage") {
        # Hero
        hero_Heading
        hero_Paragraph
        hero_Document {
          asset {
            size
            url
          }
        }
        hero_Cta {
          theme
          text
          href
        }

        # TextSection
        textSection {
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

export default TermsAndConditionsPage;