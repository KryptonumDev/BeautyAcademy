import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import SchemaBreadcrumbs from "@/global/Schema/Breadcrumbs";
import Faq from "@/components/sections/faq";
import Hero from "@/components/sections/contact-hero";
import Newsletter from "@/components/sections/newsletter";
import LatestBlogEntries from "@/components/sections/latest-blog-entries";
import Discover from "@/components/sections/cooperation-discover";

const pathname = '/cooperation';

const ContactPage = async () => {
  const { page: {
    hero_Heading,
    hero_Paragraph,
    hero_People,
    ContactForm,
    discover_Heading,
    discover_Paragraph,
    discover_List,
    faq,
  }} = await query();

  return (
    <>
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
      <Faq data={faq} />
      <Newsletter />
      <LatestBlogEntries />
      <SchemaBreadcrumbs breadcrumbs={[
        { name: 'Homepage', path: '/' },
        { name: 'Cooperation', path: pathname },
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

        # Faq
        faq {
          heading
          list {
            question: title
            answer: description
          }
        }
      }
    }
  `)
  return data;
}

export default ContactPage;