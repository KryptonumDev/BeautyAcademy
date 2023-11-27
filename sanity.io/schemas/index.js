// Single Types
import global, { global_Seo, footer_Company } from './singleTypes/global'
import indexPage from './singleTypes/indexPage'
import AboutUsPage, { team_List } from './singleTypes/AboutUsPage'
import blogPage from './singleTypes/blogPage'
import cooperationPage from './singleTypes/cooperationPage'
import contactPage from './singleTypes/contactPage'
import academyPage from './singleTypes/academyPage'
import coursesPage from './singleTypes/coursesPage'
import PrivacyPolicyPage from './singleTypes/PrivacyPolicyPage'
import TermsAndConditionsPage from './singleTypes/TermsAndConditionsPage'
import notFoundPage from './singleTypes/notFoundPage'
import PaymentSuccessfulPage from './singleTypes/PaymentSuccessfulPage'
import PaymentFailedPage from './singleTypes/PaymentFailedPage'

export const singleTypes = [
  indexPage,
  blogPage,
  cooperationPage,
  contactPage,
  academyPage,
  coursesPage,
  PrivacyPolicyPage,
  TermsAndConditionsPage,
  notFoundPage,
  PaymentSuccessfulPage,
  PaymentFailedPage,
]

// Collection Types
import blogEntry from './collectionTypes/blogEntry'
import blogCategory from './collectionTypes/blogCategory'
import testimonials from './collectionTypes/testimonials'
import author from './collectionTypes/author'

export const collectionTypes = [
  testimonials,
  blogEntry,
  blogCategory,
  author,
]

// Componenets
import cta from './components/cta'
import seo from './components/seo'
import { list_ImageAndLink, list_TitleAndImage, titleAndDescription, titleDescriptionAndImage } from './components/list'
import Faq from './components/Faq'
import ContactForm from './components/ContactForm'
import stats from './components/stats'
import HorizontalShowcase from './components/HorizontalShowcase'
import TextSection from './components/TextSection'
import PortableText from '../components/PortableText'
import ImageColumn from './components/ImageColumn'
import TextAndImageColumn from './components/TextAndImageColumn'
import QuickContact from './components/QuickContact'
import HighlightedList from './components/HighlightedList'
import { PrivacyPolicyContent } from './singleTypes/PrivacyPolicyPage'

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
  TextSection,
  PortableText,
  ImageColumn,
  TextAndImageColumn,
  QuickContact,
  HighlightedList,
  PrivacyPolicyContent,
  team_List,
]

export const schemaTypes = [
  global,
  // Restruzturize
  ...singleTypes,
  ...collectionTypes,
  ...components
]