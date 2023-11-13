import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import SchemaBreadcrumbs from "@/global/Schema/Breadcrumbs";
import Faq from "@/components/sections/faq";

const pathname = '/contact';

const ContactPage = async () => {
  const { page: {
    faq,
  } } = await getData();

  return (
    <>
      <Faq data={faq} />
      <SchemaBreadcrumbs breadcrumbs={[
        { name: 'Homepage', path: pathname },
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
    query {
      page: ContactPage(id: "contactPage") {
        # Hero
        hero_Heading
        hero_Paragraph

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