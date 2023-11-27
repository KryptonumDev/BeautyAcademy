import { removeMarkdown } from "../../utils/functions"

export default {
  name: 'aboutUsPage',
  title: 'About Us',
  type: 'document',
  icon: () => '🙋‍♀️',
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
      name: 'hero_List',
      type: 'array',
      of: [
        { type: 'string' }
      ],
      title: 'List',
      fieldset: 'hero',
      validation: Rule => Rule.min(1).min(3).required(),
    },
    {
      name: 'hero_Img',
      type: 'image',
      title: 'Image',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    },
    {
      name: 'textSection',
      type: 'TextSection',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'textSection2',
      type: 'TextSection',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'team_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'team',
      validation: Rule => Rule.required(),
    },
    {
      name: 'team_List',
      type: 'array',
      of: [
        {
          type: 'team_List'
        }
      ],
      title: 'List',
      fieldset: 'team',
      validation: Rule => Rule.required(),
    },
    {
      name: 'team_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'team',
      validation: Rule => Rule.required(),
    },
    {
      name: 'team_Cta',
      type: 'cta',
      title: 'CTA',
      fieldset: 'team',
      validation: Rule => Rule.required(),
    },
    {
      name: 'cooperation_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'cooperation',
      validation: Rule => Rule.required(),
    },
    {
      name: 'cooperation_Cta',
      type: 'cta',
      title: 'CTA',
      fieldset: 'cooperation',
      validation: Rule => Rule.required(),
    },
    {
      name: 'cooperation_Img',
      type: 'image',
      title: 'Image',
      fieldset: 'cooperation',
      validation: Rule => Rule.required(),
    },
    {
      name: 'cooperation_List',
      type: 'array',
      of: [
        {
          type: 'list_titleAndDescription'
        }
      ],
      title: 'List',
      fieldset: 'cooperation',
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
      name: 'team',
      title: 'Team',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'cooperation',
      title: 'Cooperation',
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

export const team_List = {
  name: "team_List",
  title: "Team List",
  type: "object",
  fields: [
    {
      name: 'img',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'paragraph',
      type: 'markdown',
      title: 'Paragraph',
    },
    {
      name: 'partnership_Title',
      type: 'string',
      title: 'Partnership Title',
    },
    {
      name: 'partnership_List',
      type: 'array',
      of: [
        {
          type: 'list_TitleAndImage'
        }
      ],
      title: 'Partnership List',
    },
  ],
  preview: {
    select: {
      name: 'name',
      paragraph: 'paragraph',
      media: 'img'
    },
    prepare({ name, paragraph, media }) {
      return {
        title: name,
        subtitle: removeMarkdown(paragraph),
        media
      }
    }
  }
}