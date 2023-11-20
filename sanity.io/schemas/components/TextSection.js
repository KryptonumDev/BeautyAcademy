export default {
  name: "TextSection",
  title: "Text Section",
  type: "object",
  fields: [
    {
      name: 'isReversed',
      type: 'boolean',
      title: 'Is Reversed?',
      initialValue: false,
      validation: Rule => Rule.required(),
    },
    {
      name: 'heading',
      type: 'markdown',
      title: 'Heading',
      validation: Rule => Rule.required(),
    },
    {
      name: 'paragraph',
      type: 'markdown',
      title: 'Paragraph',
      validation: Rule => Rule.required(),
    },
    {
      name: 'standout',
      type: 'markdown',
      title: 'Standout (optional)',
    },
    {
      name: 'cta',
      type: 'array',
      of: [
        { type: 'cta' }
      ],
      title: 'CTAs',
      validation: Rule => Rule.min(1).max(2).required(),
    },
    {
      name: 'video',
      type: 'file',
      title: 'Video',
    },
  ],
  preview: {
    select: {
      number: 'number',
      subtitle: 'description'
    },
    prepare({ number, subtitle }) {
      return {
        title: `[Stats] ${number} ${subtitle}`,
      }
    }
  }
}