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
      name: 'hero_VideoPhone',
      type: 'file',
      validation: Rule => Rule.required(),
      title: 'Video Phone',
      fieldset: 'hero',
    },
    {
      name: 'hero_VideoSquare',
      type: 'file',
      validation: Rule => Rule.required(),
      title: 'Video Square',
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
      validation: Rule => Rule.min(1).max(2),
    },
    {
      name: 'benefits_Img',
      type: 'image',
      title: 'Image',
      fieldset: 'benefits',
      validation: Rule => Rule.required(),
    },
    {
      name: 'advantages_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'advantages',
      validation: Rule => Rule.required(),
    },
    {
      name: 'advantages_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'advantages',
      validation: Rule => Rule.required(),
    },
    {
      name: 'advantages_Cta',
      type: 'array',
      of: [
        {
          type: 'cta'
        }
      ],
      title: 'CTAs',
      fieldset: 'advantages',
      validation: Rule => Rule.min(1).max(2),
    },
    {
      name: 'advantages_List',
      type: 'array',
      of: [
        {
          type: 'list_titleDescriptionAndImage'
        }
      ],
      title: 'List',
      fieldset: 'advantages',
      validation: Rule => Rule.min(2),
    },
    {
      name: 'features_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'features',
      validation: Rule => Rule.required(),
    },
    {
      name: 'features_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'features',
      validation: Rule => Rule.required(),
    },
    {
      name: 'features_Cta',
      type: 'array',
      of: [
        {
          type: 'cta'
        }
      ],
      title: 'CTAs',
      fieldset: 'features',
      validation: Rule => Rule.min(1).max(2),
    },
    {
      name: 'features_List',
      type: 'array',
      of: [
        {
          type: 'list_titleDescriptionAndImage'
        }
      ],
      title: 'List',
      fieldset: 'features',
      validation: Rule => Rule.min(1).max(3),
    },
    {
      name: 'reviews_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'reviews',
      validation: Rule => Rule.required(),
    },
    {
      name: 'reviews_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'reviews',
      validation: Rule => Rule.required(),
    },
    {
      name: 'reviews_Cta',
      type: 'array',
      of: [
        {
          type: 'cta'
        }
      ],
      title: 'CTA',
      fieldset: 'reviews',
      validation: Rule => Rule.min(1).max(2),
    },
    {
      name: 'reviews_List',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'testimonials'
          },
          options: {
            disableNew: true,
          }
        },
      ],
      title: 'List',
      fieldset: 'reviews',
      validation: Rule => Rule.required().unique(),
    },
    {
      name: 'partnership',
      type: 'TextSection',
      validation: Rule => Rule.required(),
      options: { collapsible: true, collapsed: true }
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
      options: { collapsible: true }
    },
    {
      name: 'benefits',
      title: 'Benefits',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'advantages',
      title: 'Advantages',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'features',
      title: 'Features',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'reviews',
      title: 'Reviews',
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