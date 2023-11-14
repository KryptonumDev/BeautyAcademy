export default {
  name: 'cooperationPage',
  title: 'Cooperation',
  type: 'document',
  icon: () => '🤝',
  fields: [
    {
      name: 'hero_Heading',
      type: 'markdown',
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
      name: 'hero_People',
      type: 'array',
      of: [
        {
          type: 'image'
        }
      ],
      title: 'People avatars',
      fieldset: 'hero',
      validation: Rule => Rule.min(1).max(2).required(),
    },
    {
      name: 'form_Subjects',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ],
      title: 'Subjects',
      fieldset: 'form',
      validation: Rule => Rule.min(1).required(),
    },
    {
      name: 'formSuccess_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'formSuccess',
      validation: Rule => Rule.required(),
    },
    {
      name: 'formSuccess_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'formSuccess',
      validation: Rule => Rule.required(),
    },
    {
      name: 'formError_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'formError',
      validation: Rule => Rule.required(),
    },
    {
      name: 'formError_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'formError',
      validation: Rule => Rule.required(),
    },
    {
      name: 'formError_Cta',
      type: 'string',
      title: 'CTA',
      fieldset: 'formError',
      validation: Rule => Rule.required(),
    },
    {
      name: 'faq',
      type: 'Faq',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo'
    },
  ],
  fieldsets: [
    {
      name: 'hero',
      title: 'Hero',
      options: { collapsible: true }
    },
    {
      name: 'form',
      title: 'Form',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'formSuccess',
      title: 'Form Success Message',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'formError',
      title: 'Form Error Message',
      options: { collapsible: true, collapsed: true }
    }
  ],
  groups: [
    {
      title: 'SEO',
      name: 'seo',
    },
  ]
}