import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";
import SchemaBreadcrumbs from "@/global/Schema/Breadcrumbs";

// export const runtime = 'edge'

const pathname = '';

const IndexPage = async () => {
  return (
    <>
      <h1>Homepage</h1>
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
        #Hero
      hero_Heading
    }
  `)
  return data;
}

export default IndexPage;