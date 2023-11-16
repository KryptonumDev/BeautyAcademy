import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import SchemaBreadcrumbs from "@/global/Schema/Breadcrumbs";
import Faq from "@/components/sections/faq";
import Hero from "@/components/sections/contact-hero";

const pathname = '/contact';

const ContactPage = async () => {
  const { page: {
    hero_Heading,
    hero_Paragraph,
    hero_People,
    ContactForm,
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
      <Faq data={faq} />
      <SchemaBreadcrumbs breadcrumbs={[
        { name: 'Homepage', path: pathname },
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
      page: ContactPage(id: "contactPage") {
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