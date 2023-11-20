import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import Faq from "@/components/sections/faq";
import Hero from "@/components/sections/contact-hero";
import Newsletter from "@/components/sections/newsletter";
import LatestBlogEntries from "@/components/sections/latest-blog-entries";
import Discover from "@/components/sections/cooperation-discover";
import Benefits from "@/components/sections/cooperation-benefits";
import Partners from "@/components/sections/cooperation-partners";
import Cooperation from "@/components/sections/cooperation";
import Breadcrumbs from "@/components/organisms/Breadcrumbs";

const pathname = '/cooperation';

const CooperationPage = async () => {
  const { page: {
    hero_Heading,
    hero_Paragraph,
    hero_People,
    ContactForm,
    discover_Heading,
    discover_Paragraph,
    discover_List,
    benefits_Heading,
    benefits_List,
    cooperation_Heading,
    cooperation_Cta,
    cooperation_Img,
    cooperation_List,
    partners_Heading,
    partners_Paragraph,
    partners_Cta,
    partners_List,
    faq,
  }} = await query();

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Homepage', path: '/' },
        { name: 'Cooperation', path: pathname },
      ]} />
      <Hero
        hero={{
          hero_Heading,
          hero_Paragraph,
          hero_People,
        }}
        form={ContactForm}
      />
      <Discover data={{
        discover_Heading,
        discover_Paragraph,
        discover_List,
      }} />
      <Benefits data={{
        benefits_Heading,
        benefits_List,
      }} />
      <Cooperation data={{
        cooperation_Heading,
        cooperation_Cta,
        cooperation_Img,
        cooperation_List,
      }} />
      <Partners data={{
        partners_Heading,
        partners_Paragraph,
        partners_Cta,
        partners_List,
      }} />
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
  const { body: { data } } = await fetchData(`
    query {
      page: CooperationPage(id: "cooperationPage") {
        # Hero
        hero_Heading
        hero_Paragraph
        hero_People {
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

        # Form
        ContactForm {
          heading
          subjects
          success_Heading
          success_Paragraph
          error_Heading
          error_Paragraph
          error_Cta
        }

        # Discover
        discover_Heading
        discover_Paragraph
        discover_List {
          title
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

        # Benefits
        benefits_Heading
        benefits_List

        # Cooperation
        cooperation_Heading
        cooperation_Cta {
          theme
          text
          href
        }
        cooperation_Img {
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
        cooperation_List {
          title
          description
        }

        # Partners
        partners_Heading
        partners_Paragraph
        partners_Cta {
          theme
          text
          href
        }
        partners_List {
          name
          href
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

export default CooperationPage;