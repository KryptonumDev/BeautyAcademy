export default {
  name: 'privacyPolicyPage',
  title: 'Privacy Policy',
  type: 'document',
  icon: () => '🧑‍⚖️',
  fields: [
    {
      name: 'hero_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    },
    {
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'PrivacyPolicyContent'
        }
      ],
      title: 'Content',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    },
    {
      name: 'services_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'services',
      validation: Rule => Rule.required(),
    },
    {
      name: 'services_Ctas',
      type: 'array',
      of: [
        {
          type: 'cta'
        }
      ],
      title: 'CTAs',
      fieldset: 'services',
      validation: Rule => Rule.required(),
    },
    {
      name: 'services_List',
      type: 'array',
      of: [
        {
          type: 'list_titleDescriptionAndImage'
        }
      ],
      title: 'List',
      fieldset: 'services',
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
      options: { collapsible: true }
    },
    {
      name: 'services',
      title: 'Services',
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

export const PrivacyPolicyContent = {
  name: "PrivacyPolicyContent",
  title: "Content",
  type: "object",
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'list',
      type: 'array',
      of: [
        {
          type: 'list_titleAndDescription'
        }
      ],
      title: 'List',
    },
  ],
  preview: {
    select: {
      title: 'title',
      list: 'list'
    },
    prepare({ title, list }) {
      return {
        title,
        subtitle: `${list.length} items`
      }
    }
  }
}