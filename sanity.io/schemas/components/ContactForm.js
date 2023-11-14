import { removeMarkdown } from "../../utils/functions"

export default {
  name: "ContactForm",
  title: "Contact Form",
  type: "object",
  fields: [
    {
      name: 'heading',
      type: 'markdown',
      title: 'Heading (optional)',
    },
    {
      name: 'subjects',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ],
      title: 'Subjects',
      validation: Rule => Rule.min(1).required(),
    },
    {
      name: 'success_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'formSuccess',
      validation: Rule => Rule.required(),
      initialValue: 'Ваше сообщение было отправлено успешно'
    },
    {
      name: 'success_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'formSuccess',
      validation: Rule => Rule.required(),
      initialValue: 'Мы ответим на него как можно быстрее'
    },
    {
      name: 'error_Heading',
      type: 'markdown',
      title: 'Heading',
      fieldset: 'formError',
      validation: Rule => Rule.required(),
      initialValue: 'Отправка сообщения не удалась'
    },
    {
      name: 'error_Paragraph',
      type: 'markdown',
      title: 'Paragraph',
      fieldset: 'formError',
      validation: Rule => Rule.required(),
      initialValue: 'Проверьте подключение к сети и введенные вами данные.'
    },
    {
      name: 'error_Cta',
      type: 'string',
      title: 'CTA',
      fieldset: 'formError',
      validation: Rule => Rule.required(),
      initialValue: 'Попробуйте еще раз'
    },
  ],
  fieldsets: [
    {
      name: 'formSuccess',
      title: 'Success Message',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'formError',
      title: 'Error Message',
      options: { collapsible: true, collapsed: true }
    }
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: `[Form] ${removeMarkdown(heading)}`,
      }
    }
  }
}