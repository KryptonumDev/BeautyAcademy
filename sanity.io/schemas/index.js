// Single Types
import global, { global_Seo } from './singleTypes/global'
import indexPage from './singleTypes/indexPage'

export const singleTypes = [
  indexPage,
]

// Collection Types

export const collectionTypes = [

]

// Componenets
import cta from './components/cta'
import seo from './components/seo'
import { titleAndDescription, titleDescriptionAndImage } from './components/list'

export const components = [
  global_Seo,
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