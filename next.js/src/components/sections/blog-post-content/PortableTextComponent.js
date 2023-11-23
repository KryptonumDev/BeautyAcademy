'use server'
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

export const ImageRenderer = ({ value: { asset: { _ref }, altText }}) => {
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
    />
  )
}

const components = {
  types: {
    image: ImageRenderer,
    ImageColumn: ({ value: { list } }) => <ImageColumn list={list} />,
    TextAndImageColumn: ({ value: { img, text } }) => <TextAndImageColumn {...{img, text}} />,
    QuickContact: ({ value: { heading, paragraph, img } }) => <QuickContact {...{heading, paragraph, img}} />,
  },
  block: {
    h2: ({ children, value }) => <h2 id={slugify(toPlainText(value))}>{children}</h2>,
    h3: ({ children, value }) => <h3 id={slugify(toPlainText(value))}>{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="unorderedList">{children}</ul>,
    number: ({ children }) => <ol className="orderedList">{children}</ol>,
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

const PortableTextComponent = ({ data }) => {
  return (
    <div className={styles.portableText}>
      <PortableText
        value={data}
        components={components}
      />
    </div>
  );
}

export default PortableTextComponent;