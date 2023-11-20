export default {
  name: 'notFoundPage',
  title: 'Not Found',
  type: 'document',
  icon: () => '🚫',
  fields: [
    {
      name: 'hero_Heading',
      type: 'string',
      title: 'Heading',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    },
    {
      name: 'hero_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    },
    {
      name: 'hero_Cta',
      type: 'cta',
      title: 'CTA',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    },
  ],
  fieldsets: [
    {
      name: 'hero',
      title: 'Hero',
    },
  ],
  groups: [
    {
      title: 'SEO',
      name: 'seo',
    },
  ]
}