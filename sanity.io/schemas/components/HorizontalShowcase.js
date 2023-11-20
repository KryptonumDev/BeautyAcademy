import { removeMarkdown } from "../../utils/functions"

export default {
  name: "HorizontalShowcase",
  title: "Horizontal Showcase",
  type: "object",
  fields: [
    {
      name: 'heading',
      type: 'markdown',
      title: 'Heading',
      validation: Rule => Rule.required(),
    },
    {
      name: 'cta',
      type: 'array',
      of: [
        {
          type: 'cta'
        }
      ],
      title: 'CTAs',
      validation: Rule => Rule.min(1).max(2).required(),
    },
    {
      name: 'list',
      type: 'array',
      of: [
        {
          type: 'image'
        }
      ],
      options: {
        layout: 'grid'
      },
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