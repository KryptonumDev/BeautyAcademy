import fetchData from "@/utils/fetchData";
import wpFetchData from "@/utils/fetchData";

export default async function Courses() {
  const data = await getData();

  return (
    <>
    </>
  )
}

const getData = async () => {
  const { body: { data } } = await fetchData(`
    query {
      page: CoursesPage(id: "coursesPage"){
        # Hero
        hero_Paragraph
        hero_Heading
        
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