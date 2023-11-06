export default {
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',
  icon: () => '🤝',
  fields: [
    {
      name: 'img',
      type: 'image',
      title: 'Image',
      description: 'The Image should have 80x80px dimensions (recommended is @2x, so 160x160px).',
      validation: Rule => Rule.required(),
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required(),
    },
    {
      name: 'content',
      type: 'markdown',
      title: 'Content',
      validation: Rule => Rule.required(),
    },
    {
      name: 'rating',
      type: "string",
      options: {
        list: [
          { title: '1 star rating', value: '1' },
          { title: '2 star rating', value: '2' },
          { title: '3 star rating', value: '3' },
          { title: '4 star rating', value: '4' },
          { title: '5 star rating', value: '5' },
        ],
        layout: "radio",
      },
      title: 'Rating (optional)'
    },
  ],
}