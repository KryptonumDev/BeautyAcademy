export default {
  name: 'indexPage',
  title: 'Homepage',
  type: 'document',
  icon: () => '⭐️',
  fields: [
    {
      name: 'hero_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'hero',
    },
    {
      name: 'hero_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'hero',
    },
    {
      name: 'hero_Cta',
      type: 'array',
      of: [
        {
          type: 'cta'
        }
      ],
      validation: Rule => Rule.min(1).max(2),
      title: 'CTAs',
      fieldset: 'hero',
    },
    {
      name: 'hero_Images',
      type: 'array',
      of: [
        {
          type: 'image'
        }
      ],
      validation: Rule => Rule.min(3).max(3),
      title: 'Images',
      fieldset: 'hero',
    },
    {
      name: 'hero_Videos',
      type: 'array',
      of: [
        {
          type: 'file'
        }
      ],
      validation: Rule => Rule.min(2).max(2),
      title: 'Videos',
      fieldset: 'hero',
    },
    {
      name: 'benefits_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'benefits',
      validation: Rule => Rule.required(),
    },
    {
      name: 'benefits_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'benefits',
      validation: Rule => Rule.required(),
    },
    {
      name: 'benefits_List',
      type: 'array',
      of: [
        { type: 'markdown' }
      ],
      title: 'List',
      fieldset: 'benefits',
      validation: Rule => Rule.required(),
    },
    {
      name: 'benefits_Paragraph2',
      type: 'markdown',
      title: 'Second Paragraph',
      fieldset: 'benefits',
    },
    {
      name: 'benefits_Cta',
      type: 'array',
      of: [
        {
          type: 'cta'
        }
      ],
      title: 'CTA',
      fieldset: 'benefits',
      validation: Rule => Rule.max(2),
    },
    {
      name: 'benefits_Img',
      type: 'image',
      title: 'Image',
      fieldset: 'benefits',
      validation: Rule => Rule.required(),
    },
    {
      name: 'benefits_Img',
      type: 'image',
      title: 'Image',
      fieldset: 'benefits',
      validation: Rule => Rule.required(),
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
      options: {
        collapsible: true
      }
    },
    {
      name: 'benefits',
      title: 'Benefits',
      options: { collapsible: true, collapsed: true }
    },
  ],
  groups: [
    {
      title: 'SEO',
      name: 'seo',
    },
  ]
}