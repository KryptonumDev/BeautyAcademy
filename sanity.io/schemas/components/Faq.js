import { removeMarkdown } from "../../utils/functions"

export default {
  name: "Faq",
  title: "FAQ",
  type: "object",
  fields: [
    {
      name: 'heading',
      type: 'markdown',
      title: 'Heading',
      validation: Rule => Rule.required()
    },
    {
      name: 'list',
      type: 'array',
      of: [
        {
          type: 'list_titleAndDescription'
        }
      ],
      title: 'List',
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      list: 'list',
    },
    prepare({ heading, list }) {
      return {
        title: removeMarkdown(heading),
        subtitle: `${list.length} items`,
      }
    }
  }
}