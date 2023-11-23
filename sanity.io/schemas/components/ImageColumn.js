export default {
  name: "ImageColumn",
  title: "Image Column",
  type: "object",
  fields: [
    {
      name: 'list',
      type: 'array',
      options: {
        layout: 'grid'
      },
      of: [
        {
          type: 'image'
        }
      ],
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      list: 'list',
    },
    prepare({ list }) {
      return {
        title: `[ImageColumn] - ${list.length} images`,
        media: list[0]
      }
    }
  }
}