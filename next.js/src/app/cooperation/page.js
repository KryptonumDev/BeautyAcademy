import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import SchemaBreadcrumbs from "@/global/Schema/Breadcrumbs";
import Faq from "@/components/sections/faq";
import Hero from "@/components/sections/contact-hero";
import Newsletter from "@/components/sections/newsletter";
import LatestBlogEntries from "@/components/sections/latest-blog-entries";

const pathname = '/cooperation';

const ContactPage = async () => {
  const { page: {
    hero_Heading,
    hero_Paragraph,
    hero_People,
    form_Heading,
    form_Subjects,
    formSuccess_Heading,
    formSuccess_Paragraph,
    formError_Heading,
    formError_Paragraph,
    formError_Cta,
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
        form={{
          form_Heading,
          form_Subjects,
          states: {
            formSuccess_Heading,
            formSuccess_Paragraph,
            formError_Heading,
            formError_Paragraph,
            formError_Cta,
          }
        }}
      />
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
        form_Subjects

        # Form State's
        formSuccess_Heading
        formSuccess_Paragraph
        formError_Heading
        formError_Paragraph
        formError_Cta

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