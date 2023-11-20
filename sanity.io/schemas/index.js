// Single Types
import global, { global_Seo, footer_Company } from './singleTypes/global'
import indexPage from './singleTypes/indexPage'
import blogPage from './singleTypes/blogPage'
import cooperationPage from './singleTypes/cooperationPage'
import contactPage from './singleTypes/contactPage'
import academyPage from './singleTypes/academyPage'
import coursesPage from './singleTypes/coursesPage'
import notFoundPage from './singleTypes/notFoundPage'

export const singleTypes = [
  indexPage,
  blogPage,
  cooperationPage,
  contactPage,
  academyPage,
  coursesPage,
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
import { list_ImageAndLink, list_TitleAndImage, titleAndDescription, titleDescriptionAndImage } from './components/list'
import Faq from './components/Faq'
import ContactForm from './components/ContactForm'
import stats from './components/stats'
import HorizontalShowcase from './components/HorizontalShowcase'

export const components = [
  global_Seo,
  footer_Company,
  cta,
  seo,
  titleAndDescription,
  list_TitleAndImage,
  titleDescriptionAndImage,
  list_ImageAndLink,
  Faq,
  ContactForm,
  stats,
  HorizontalShowcase,
]

export const schemaTypes = [
  global,
  // Restruzturize
  ...singleTypes,
  ...collectionTypes,
  ...components
]