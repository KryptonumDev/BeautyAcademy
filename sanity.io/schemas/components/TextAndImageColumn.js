export default {
  name: "TextAndImageColumn",
  title: "Text&Image Column",
  type: "object",
  fields: [
    {
      name: 'img',
      type: 'image',
      title: 'Image',
      validation: Rule => Rule.required(),
    },
    {
      name: 'text',
      type: 'markdown',
      title: 'Text',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      img: 'img',
      text: 'text',
    },
    prepare({ img, text }) {
      return {
        title: `[Text&Image Column]`,
        subtitle: text,
        media: img
      }
    }
  }
}