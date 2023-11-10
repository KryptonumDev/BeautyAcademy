// Single Types
import global, { global_Seo, footer_Company } from './singleTypes/global'
import indexPage from './singleTypes/indexPage'
import contactPage from './singleTypes/contactPage'
import blogPage from './singleTypes/blogPage'
import notFoundPage from './singleTypes/notFoundPage'

export const singleTypes = [
  indexPage,
  blogPage,
  contactPage,
  notFoundPage,
]

// Collection Types
import blogEntry from './collectionTypes/blogEntry'
import blogCategory from './collectionTypes/blogCategory'
import testimonials from './collectionTypes/testimonials'

export const collectionTypes = [
  testimonials,
  blogEntry,
  blogCategory,
]

// Componenets
import cta from './components/cta'
import seo from './components/seo'
import { titleAndDescription, titleDescriptionAndImage } from './components/list'
import Faq from './components/Faq'

export const components = [
  global_Seo,
  footer_Company,
  cta,
  seo,
  titleAndDescription,
  titleDescriptionAndImage,
  Faq,
]

export const schemaTypes = [
  global,
  // Restruzturize
  ...singleTypes,
  ...collectionTypes,
  ...components
]