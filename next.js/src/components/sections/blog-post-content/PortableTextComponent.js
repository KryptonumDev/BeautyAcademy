import styles from './styles.module.scss';
import Link from "next/link";
import Img from "@/components/atoms/Img";
import { PortableText, toPlainText } from "@portabletext/react";
import imageUrlBuilder from '@sanity/image-url'
import { getImageDimensions } from "@sanity/asset-utils";
import ImageColumn from "@/components/organisms/ImageColumn";
import TextAndImageColumn from '@/components/organisms/TextAndImageColumn';
import QuickContact from '@/components/organisms/QuickContact';
import { slugify } from '@/utils/functions';
import HighlightedList from '@/components/organisms/HighlightedList';
import ShareArticle from './ShareArticle';

export const ImageRenderer = ({ value: { asset: { _ref }, altText }, sizes }) => {
  const builder = imageUrlBuilder({
    projectId: "zm0qqcml",
    dataset: "production",
    apiVersion: '2023-11-21',
  });
  return (
    <Img
      src={builder.image(_ref).url()}
      width={getImageDimensions(_ref).width}
      height={getImageDimensions(_ref).height}
      alt={altText || ''}
      {...sizes && ({ sizes })}
    />
  )
}

const components = {
  types: {
    image: (data) => (
      <ImageRenderer
        {...data}
        sizes="(max-width: 1099px) 66vw, 100vw"
      />
    ),
    ImageColumn: ({ value: { list } }) => <ImageColumn list={list} />,
    TextAndImageColumn: ({ value: { img, text } }) => <TextAndImageColumn {...{img, text}} />,
    QuickContact: ({ value: { heading, paragraph, img } }) => <QuickContact {...{heading, paragraph, img}} />,
    HighlightedList: ({ value: { list } }) => <HighlightedList list={list} />,
  },
  block: {
    h2: ({ children, value }) => <h2 id={slugify(toPlainText(value))}>{children}</h2>,
    h3: ({ children, value }) => <h3 id={slugify(toPlainText(value))}>{children}</h3>,
    blockquote: ({ children }) => <blockquote><div><Quote /><span>{children}</span></div></blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="unorderedList">{children}</ul>,
    number: ({ children }) => <ol className="orderedList">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li><ListBullet /><span>{children}</span></li>,
  },
  marks: {
    link: ({ value: { href }, children }) => {
      const isExternal = href && (href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:'));
      const Element = isExternal ? 'a' : Link;
      return (
        <Element
          href={href}
          className='link'
          {...isExternal && { target: '_blank', rel: 'noopener' }}
        >{children}</Element>
      )
    }
  }
}

const PortableTextComponent = ({ data, title, slug }) => {
  return (
    <div className={styles.portableText}>
      <PortableText
        value={data}
        components={components}
      />
      <ShareArticle title={title} slug={slug} />
    </div>
  );
}

export default PortableTextComponent;

const ListBullet = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='31'
    height='31'
    fill='none'
    viewBox='0 0 31 31'
  >
    <path
      stroke='#2B483C'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M20.838 5.451c-1.85 0-3.11.79-3.92 1.61-.54.546-1.91.546-2.449 0-.81-.82-2.07-1.61-3.921-1.61-3.847 0-6.165 3.668-6.165 6.69 0 3.773 6.27 9.018 9.474 11.45a3.02 3.02 0 003.673 0c3.203-2.432 9.473-7.675 9.473-11.448 0-3.024-2.316-6.692-6.165-6.692z'
    ></path>
  </svg>
)

const Quote = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="41"
    fill="none"
    viewBox="0 0 50 41"
  >
    <path
      fill="url(#a)"
      d="M11.012.19c3.016 0 5.572 1.18 7.67 3.54 2.098 2.229 3.146 5.31 3.146 9.243 0 5.768-.917 10.422-2.753 13.962-1.704 3.54-3.605 6.359-5.703 8.456a22.932 22.932 0 01-8.26 5.31l-1.966-3.146c2.229-1.05 4.195-2.295 5.9-3.737 1.442-1.18 2.753-2.687 3.933-4.523 1.311-1.835 1.966-3.999 1.966-6.49 0-.524-.065-.917-.196-1.18a7.63 7.63 0 00-.393-.983l-.394-.786c-.262.262-.655.458-1.18.59-1.049.262-1.966.393-2.753.393-3.015 0-5.44-.852-7.276-2.557-1.705-1.835-2.557-4.26-2.557-7.276 0-3.015 1.05-5.572 3.147-7.67C5.44 1.24 7.997.19 11.013.19zm27.532 0c3.016 0 5.572 1.18 7.67 3.54 2.098 2.229 3.146 5.31 3.146 9.243 0 5.768-.917 10.422-2.753 13.962-1.704 3.54-3.605 6.359-5.703 8.456a22.932 22.932 0 01-8.26 5.31l-1.966-3.146c2.229-1.05 4.195-2.295 5.9-3.737 1.442-1.18 2.753-2.687 3.933-4.523 1.31-1.835 1.966-3.999 1.966-6.49 0-.524-.065-.917-.196-1.18a7.63 7.63 0 00-.393-.983l-.394-.786c-.262.262-.655.458-1.18.59-1.049.262-1.966.393-2.753.393-3.015 0-5.44-.852-7.276-2.557-1.705-1.835-2.557-4.26-2.557-7.276 0-3.015 1.049-5.572 3.147-7.67C32.972 1.24 35.529.19 38.545.19z"
    ></path>
    <defs>
      <linearGradient
        id="a"
        x1="0.196"
        x2="52.035"
        y1="37.339"
        y2="37.339"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F7C479"></stop>
        <stop offset="0.253" stopColor="#DCA855"></stop>
        <stop offset="0.582" stopColor="#C79442"></stop>
        <stop offset="0.764" stopColor="#BC7F1D"></stop>
        <stop offset="1" stopColor="#BA7403"></stop>
      </linearGradient>
    </defs>
  </svg>
)