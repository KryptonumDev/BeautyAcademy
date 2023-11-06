// Single Types
import global, { global_Seo, footer_Company } from './singleTypes/global'
import indexPage from './singleTypes/indexPage'
import notFoundPage from './singleTypes/notFoundPage'

export const singleTypes = [
  indexPage,
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

export const components = [
  global_Seo,
  footer_Company,
  cta,
  seo,
  titleAndDescription,
  titleDescriptionAndImage,
]

export const schemaTypes = [
  global,
  // Restruzturize
  ...singleTypes,
  ...collectionTypes,
  ...components
]