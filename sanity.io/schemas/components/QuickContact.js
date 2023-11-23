import { removeMarkdown } from "../../utils/functions"

export default {
  name: "QuickContact",
  title: "Quick Contact",
  type: "object",
  fields: [
    {
      name: 'heading',
      type: 'markdown',
      title: 'Heading',
      initialValue: 'Хотите поговорить на тему?',
      validation: Rule => Rule.required(),
    },
    {
      name: 'paragraph',
      type: 'markdown',
      title: 'Paragraph (optional)',
      initialValue: 'Записаться на консультацию',
    },
    {
      name: 'img',
      type: 'image',
      title: 'Image',
      initialValue: {
        asset: {
          _ref: 'image-3fbc26407f0473d6e429d0e975d5d50356665a45-622x789-webp',
        }
      },
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      paragraph: 'paragraph',
      img: 'img',
    },
    prepare({ heading, paragraph, img }) {
      return {
        title: `[Quick Contact] - ${removeMarkdown(heading)}`,
        subtitle: removeMarkdown(paragraph) || '',
        media: img
      }
    }
  }
}