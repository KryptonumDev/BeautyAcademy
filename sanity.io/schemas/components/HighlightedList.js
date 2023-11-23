export default {
  name: "HighlightedList",
  title: "Highlighted List",
  type: "object",
  fields: [
    {
      name: 'list',
      type: 'array',
      of: [
        {
          type: 'markdown'
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
        title: `[Highlighted List] - ${list.length} items`,
      }
    }
  }
}